import {Action, Store} from "redux";
import ButtonClickAction from "./state/actions/ButtonClickAction";
import GainResourceAction from "./state/actions/engine/GainResourceAction";
import AppState from "./state/AppState";
import UpgradeState from "./state/engine/UpgradeState";
import * as _ from "lodash";

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
                const upgrades = store.getState().state.upgrades.filter((upgrade: UpgradeState) => {
                    return upgrade.enabled;
                });
                (buttonClickAction.button.effects || []).forEach((effect: string) => {
                    const tokens = effect.split(" ");
                    console.log(effect);
                    switch (tokens[0]) {
                        case "yield" :
                            action = {...new GainResourceAction(tokens[2], Number.parseInt(tokens[1], 10))};
                            action = applyUpgradesToYield((action as GainResourceAction), upgrades);
                            break;
                        case "buy":
                            const generatorName = tokens[1];
                            const state: AppState = store.getState();
                            console.assert(state.config.generators[generatorName] !== undefined,
                                `Missing generator config for ${generatorName}`);
                            console.assert(state.config.generators[generatorName].baseCost,
                                `Generator config for ${generatorName} is missing a baseCost config.`);
                            const calculatedCosts: { [name: string]: number } =
                                Object.keys(state.config.generators[generatorName].baseCost)
                                    .reduce((modified: {[resourceName: string]: number}, resourceName: string) => {
                                        modified[resourceName] = Math.ceil(
                                            Math.pow(1.15, state.state.generators[generatorName].quantity)
                                            * state.config.generators[generatorName].baseCost[resourceName]);
                                    return modified;
                                    }, {});
                            const canAfford = Object.keys(state.state.resources)
                                // tslint:disable:no-shadowed-variable
                                .reduce((canAfford: boolean, resourceName: string) => {
                                    return canAfford && state.state.resources[resourceName].quantity
                                        >= calculatedCosts[resourceName];
                                }, true);
                            action = ({
                                cost: calculatedCosts,
                                entity: generatorName,
                                quantity: 1,
                                success: canAfford,
                                type: "BUY",
                            } as Action<string>);
                    }
                    if (action) {
                        next(action);
                    }
                });
            } else {
                return next(action);
            }
        };
    };
};

function applyUpgradesToYield(initialYield:GainResourceAction, upgrades:UpgradeState[]){
    const effects = _.flatMap(_.flatMap(_.flatMap(upgrades, u => u.config.effects), e => e.effects));
    return effects.reduce((action:GainResourceAction, nextEffect: string) => {
        console.log(nextEffect);
        const effectTokens = nextEffect.split(" ");
        let effectAction = effectTokens[0];
        let effectMagnitude = effectTokens[1];
        let effectResource = effectTokens[2];
        if (effectResource === action.resource) {
            let newQuantity = action.quantity;
            switch(effectAction) {
                case "add":
                    newQuantity = newQuantity + Number.parseFloat(effectMagnitude);
            }
            action = new GainResourceAction(effectResource, newQuantity);
        }
        return action;
    }, initialYield);
}