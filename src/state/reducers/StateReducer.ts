import {Action} from "redux";
import ResourceState from "../engine/ResourceState";
import GameState from "../engine/GameState";
import GeneratorState from "../engine/GeneratorState";

export default function (state: any, action: Action<any>) {
    if (state == undefined) {
        return {...new GameState()}
    }
    if (action.type === "POPULATE_CONFIG") {
        return {
            resources: Object.keys(action.config.resources).reduce((reduced: any, resourceName: string) => {
                reduced[resourceName] = new ResourceState(resourceName, 0);
                return reduced;
            }, {}),
            generators: Object.keys(action.config.generators).reduce((reduced: any, generatorName: string) => {
                reduced[generatorName] = new GeneratorState(generatorName, 0);
                return reduced;
            }, {})
        }
    }
    if (action.type === "GAIN_RESOURCE") {
        if (!state.resources[action.resource]) {
            console.warn(`${action.resource} isn't a valid resource.`);
        } else {
            const effect = {};
            effect[action.resource] = {
                quantity: state.resources[action.resource].quantity + action.quantity
            };
            return {
                ...state, ...{
                    resources: effect
                }
            };
        }
        return state;
    }
    if(action.type === "BUY"){
        if (!state.generators[action.entity]) {
            console.warn(`${action.entity} isn't a valid generator.`);
        } else {
            if(action.success) {
                if(Number.isNaN(action.quantity)){
                    throw new TypeError(`action.quantity was NaN`);
                }
                state.generators[action.entity].quantity = (state.generators[action.entity].quantity || 0) + action.quantity;
                if(Number.isNaN(state.generators[action.entity].quantity)){
                    throw new Error(`Added ${state.generators[action.entity].quantity } and ${action.quantity}, got NaN.`)
                }
                Object.keys(state.resources).forEach(resourceName=>{
                    state.resources[resourceName].quantity -= action.cost[resourceName];
                });
            }
        }
        return {...state};
    }
    if (action.type === "TICK"){
        let updatedResources = Object.keys(state.resources).reduce((updated:any, resourceName:string)=>{
            updated[resourceName].quantity += action.generatedResources[resourceName];
            return updated;
        }, state.resources);
        return {...state, ...{
            resources : updatedResources
        }};
    }
    return state;
}