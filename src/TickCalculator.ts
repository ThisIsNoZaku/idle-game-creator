import TickAction from "./state/actions/TickAction";
import AppState from "./state/AppState";

import {Action, Store} from "redux";

export default (store: Store) => {
    return (next: (action: Action<any>) => any) => {
        return (action: Action<any>) => {
            if (action.type === "TICK") {
                const tickAction = (action as TickAction);
                const state: AppState = store.getState();
                const generators = state.config.generators;
                const generatedResources = Object.keys(generators).reduce((generated: {[name: string]: number},
                                                                         generatorName: string) => {
                    const generator = generators[generatorName];
                    if (!generator.onTick) {
                        throw new Error(JSON.stringify(generator));
                    }
                    return generator.onTick.reduce((generatorResources: any, effect: string) => {
                        const tokens = effect.split(" ");
                        const effectName = tokens[0];
                        switch (effectName) {
                            case "yield":
                                const resourceQuantity = Number.parseFloat(tokens[1]);
                                const resourceName = tokens[2];
                                generatorResources[resourceName] = (generatorResources[resourceName] || 0) +
                                    (resourceQuantity * state.state.generators[generatorName].quantity);
                        }
                        return generated;
                    }, generated);
                }, {});
                tickAction.generatedResources = generatedResources;
            }
            return next(action);
        };
    };
};
