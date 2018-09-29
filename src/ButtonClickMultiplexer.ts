import {Action, Store} from "redux";
import ButtonClickAction from "./state/actions/ButtonClickAction";
import GainResourceAction from "./state/actions/GainResourceAction";
import AppState from "./state/AppState";

export default (store: Store) => {
    return (next: (action: Action<any>) => any) => {
        return (action: Action<any>) => {
            if (action.type ===
                ButtonClickAction.ACTION_TYPE && (action as ButtonClickAction).button.effects
                && (action as ButtonClickAction).button.effects!.length) {
                const buttonClickAction: ButtonClickAction = (action as ButtonClickAction);
                (buttonClickAction.button.effects || []).forEach((effect: string) => {
                    const tokens = effect.split(" ");
                    console.log(effect);
                    switch (tokens[0]) {
                        case "yield" :
                            action = {...new GainResourceAction(tokens[2], Number.parseInt(tokens[10], 10))};
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
