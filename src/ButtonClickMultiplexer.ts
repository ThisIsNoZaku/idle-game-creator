import * as _ from "lodash";
import {Action, Store} from "redux";

import ButtonClickAction from "./state/actions/ButtonClickAction";
import GainResourceAction from "./state/actions/engine/GainResourceAction";
import AppState from "./state/AppState";
import UpgradeState from "./state/engine/UpgradeState";

/**
 * A redux middleware which translates clicking on a button into a number of discrete game actions.
 */
export default (store: Store) => {
    return (next: (action: Action<any>) => any) => {
        return (action: Action<any>) => {
            if (action.type ===
                ButtonClickAction.ACTION_TYPE && (action as ButtonClickAction).button.effects
                && (action as ButtonClickAction).button.effects!.length) {
                const buttonClickAction: ButtonClickAction = (action as ButtonClickAction);
                const allUpgrades = store.getState().state.upgrades;
                const upgrades = Object.keys(allUpgrades)
                    .map((key: string) => allUpgrades[key])
                    .filter((upgrade: UpgradeState) => {
                        return upgrade.enabled;
                });
                (buttonClickAction.button.effects || []).forEach((effect: string) => {
                    const tokens = effect.split(" ");
                    const state: AppState = store.getState();
                    switch (tokens[0]) {
                        case "yield" :
                            action = new GainResourceAction(tokens[2], Number.parseInt(tokens[1], 10));
                            action = applyUpgradesToYield((action as GainResourceAction), upgrades);
                            break;
                        case "buy":
                            const generatorName = tokens[1];
                            console.assert(state.config.generators[generatorName] !== undefined,
                                `Missing generator config for ${generatorName}`);
                            console.assert(state.config.generators[generatorName].cost,
                                `Generator config for ${generatorName} is missing a baseCost config.`);
                            const generatorCalculatedCosts: { [name: string]: number } =
                                Object.keys(state.config.generators[generatorName].cost)
                                    .reduce((modified: {[resourceName: string]: number}, resourceName: string) => {
                                        modified[resourceName] = Math.ceil(
                                            Math.pow(1.15, state.state.generators[generatorName].quantity)
                                            * state.config.generators[generatorName].cost.resources[resourceName]);
                                    return modified;
                                    }, {});
                            const canAffordGenerator = Object.keys(state.state.resources)
                                // tslint:disable:no-shadowed-variable
                                .reduce((canAfford: boolean, resourceName: string) => {
                                    return canAfford && state.state.resources[resourceName].quantity
                                        >= generatorCalculatedCosts[resourceName];
                                }, true);
                            action = ({
                                cost: generatorCalculatedCosts,
                                entity: generatorName,
                                quantity: 1,
                                success: canAffordGenerator,
                                type: "BUY",
                            } as Action<string>);
                            break;
                        case "upgrade":
                            const upgradeName = tokens[1];
                            console.assert(state.config.upgrades[upgradeName] !== undefined,
                                `Missing generator config for ${upgradeName}`);
                            console.assert(state.config.upgrades[upgradeName].costs,
                                `Generator config for ${upgradeName} is missing a baseCost config.`);
                            const calculatedCosts: { [name: string]: number } =
                                state.config.upgrades[upgradeName].costs.resources;
                            const canAffordUpgrade = Object.keys(state.state.resources)
                                // tslint:disable:no-shadowed-variable
                                .reduce((canAfford: boolean, resourceName: string) => {
                                    return canAfford && state.state.resources[resourceName].quantity
                                        >= calculatedCosts[resourceName];
                                }, true);
                            action = ({
                                cost: calculatedCosts,
                                entity: upgradeName,
                                quantity: 1,
                                success: canAffordUpgrade,
                                type: "UPGRADE",
                            } as Action<string>);
                            break;
                    }
                    if (action) {
                        next({...action});
                    }
                });
            } else {
                return next({...action});
            }
        };
    };
};

function applyUpgradesToYield(initialYield: GainResourceAction, upgrades: UpgradeState[]) {
    let effects: any = _.flatMap(upgrades, (u: UpgradeState) => u.config.effects);
    effects = _.flatMap(effects, (x: {effects: string[]}) => x.effects);
    effects = effects.map((es: string) => es.split(" ")).sort( (a: string[], b: string[]) => {
            if (a[0] === b[0]) {
                return 0;
            }
            if (a[0] === "multiply") {
                if (b[0] === "add") {
                    return 1;
                }
            } else if (a[0] === "add") {
                if (b[0] === "multiply") {
                    return -1;
                }
            }
            return 0;
        });
    return effects.reduce((action: GainResourceAction, nextEffectTokens: string[]) => {
        const effectAction = nextEffectTokens[0];
        const effectMagnitude = nextEffectTokens[1];
        const effectResource = nextEffectTokens[2];
        if (effectResource === action.resource) {
            let newQuantity: number = action.quantity;
            switch (effectAction) {
                case "add":
                    newQuantity = newQuantity + Number.parseFloat(effectMagnitude);
                    break;
                case "multiply":
                    newQuantity = newQuantity * Number.parseFloat(effectMagnitude);
                    break;
            }
            newQuantity = _.floor(newQuantity, 1);
            action = new GainResourceAction(effectResource, newQuantity);
        }
        return action;
    }, initialYield);
}
