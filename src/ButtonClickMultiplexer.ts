import {Action, Store} from "redux";
import AppState from "./state/AppState";
import ButtonClickAction from "./state/actions/ButtonClickAction";
import GainResourceAction from "./state/actions/GainResourceAction";

export default (store: Store) => {
    return (next: (action: Action<any>) => any) => {
        return (action: Action<any>) => {
            if (action.type === ButtonClickAction.ACTION_TYPE && action.effects && action.effects.length) {
                const buttonClickAction: ButtonClickAction = (action as ButtonClickAction);
                (buttonClickAction.button.effects || []).forEach((effect: string) => {
                    const tokens = effect.split(" ");
                    let action;
                    switch (tokens[0]) {
                        case "yield" :
                            action = {...new GainResourceAction(Number.parseInt(tokens[1]), tokens[2])}
                            break;
                        case "buy":
                            const generatorName = tokens[1];
                            const state: AppState = store.getState();
                            console.assert(state.config.generators[generatorName] !== undefined, `Missing generator config for ${generatorName}`);
                            console.assert(state.config.generators[generatorName].baseCost, `Generator config for ${generatorName} is missing a baseCost config.`);
                            let calculatedCosts: { [name: string]: number } = Object.keys(state.config.generators[generatorName]
                                .baseCost).reduce((modified, resourceName: string) => {
                                modified[resourceName] = Math.ceil(
                                    Math.pow(1.15, state.state.generators[generatorName].quantity)
                                    * state.config.generators[generatorName].baseCost[resourceName]);
                                return modified;
                            }, {});
                            let canAfford = Object.keys(state.state.resources).reduce((canAfford: boolean, resourceName: string) => {
                                return canAfford && state.state.resources[resourceName].quantity >= calculatedCosts[resourceName];
                            }, true);
                            action = {
                                type: "BUY",
                                quantity: 1,
                                entity: generatorName,
                                cost: calculatedCosts,
                                success: canAfford
                            }
                    }
                    if (action) {
                        next(action);
                    }
                });
            } else {
                return next(action);
            }
        }
    }
}
