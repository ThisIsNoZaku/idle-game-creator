import {Action} from "redux";

import BuyAction from "../actions/BuyAction";
import GainResourceAction from "../actions/GainResourceAction";
import PopulateConfigAction from "../actions/PopulateConfigAction";
import TickAction from "../actions/TickAction";

import GameState from "../engine/GameState";
import GeneratorState from "../engine/GeneratorState";
import ResourceState from "../engine/ResourceState";

export default function(state: any, action: Action<any>) {
    if (state === undefined) {
        return {...new GameState()};
    }
    if (action.type === "POPULATE_CONFIG") {
      const populateAction = (action as PopulateConfigAction);
        return {
            generators: Object.keys(populateAction.config.generators).reduce((reduced: any, generatorName: string) => {
                reduced[generatorName] = new GeneratorState(generatorName, 0);
                return reduced;
            }, {}),
            resources: Object.keys(populateAction.config.resources).reduce((reduced: any, resourceName: string) => {
                reduced[resourceName] = new ResourceState(resourceName, 0);
                return reduced;
            }, {}),
        };
    }
    if (action.type === GainResourceAction.ACTION_TYPE) {
      const gainResourceAction = (action as GainResourceAction);
        if (!state.resources[gainResourceAction.resource]) {
            console.warn(`${gainResourceAction.resource} isn't a valid resource.`);
            return state;
        } else {
            const effect: {[resource: string]: {quantity: number}} = {};
            effect[gainResourceAction.resource] = {
                quantity: state.resources[gainResourceAction.resource].quantity + gainResourceAction.quantity,
            };
            return {
                ...state, ...{
                    resources: effect,
                },
            };
        }
    }
    if (action.type === "BUY") {
      const buyAction = (action as BuyAction);
        if (!state.generators[buyAction.entity]) {
            console.warn(`${buyAction.entity} isn't a valid generator.`);
        } else {
            if (buyAction.success) {
                state.generators[buyAction.entity].quantity = (state.generators[buyAction.entity].quantity || 0)
                    + buyAction.quantity;
                Object.keys(buyAction.cost || {}).forEach((resourceName: string) => {
                    state.resources[resourceName].quantity -= buyAction.cost[resourceName];
                });
            }
        }
        return {...state};
    }
    if (action.type === "TICK") {
      const tick = (action as TickAction);
        const updatedResources = Object.keys(state.resources).reduce((updated: any, resourceName: string ) => {
            updated[resourceName].quantity += tick.generatedResources[resourceName];
            return updated;
        }, state.resources);
        return {...state, ...{
            resources : updatedResources,
        }};
    }
    return state;
}
