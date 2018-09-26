import {Action} from "redux";
import ResourceState from "../engine/ResourceState";
import GameState from "../engine/GameState";
import GeneratorState from "../engine/GeneratorState";
import GainResourceAction from "../actions/GainResourceAction";
import BuyAction from "../actions/BuyAction";
import TickAction from "../actions/TickAction";
import PopulateConfigAction from "../actions/PopulateConfigAction";

export default function (state: any, action: Action<any>) {
    if (state == undefined) {
        return {...new GameState()}
    }
    if (action.type === "POPULATE_CONFIG") {
      const populateAction = (action as PopulateConfigAction);
        return {
            resources: Object.keys(populateAction.config.resources).reduce((reduced: any, resourceName: string) => {
                reduced[resourceName] = new ResourceState(resourceName, 0);
                return reduced;
            }, {}),
            generators: Object.keys(populateAction.config.generators).reduce((reduced: any, generatorName: string) => {
                reduced[generatorName] = new GeneratorState(generatorName, 0);
                return reduced;
            }, {})
        }
    }
    if (action.type === GainResourceAction.ACTION_TYPE) {
      const gainResourceAction = (action as GainResourceAction);
        if (!state.resources[gainResourceAction.resource]) {
            console.warn(`${gainResourceAction.resource} isn't a valid resource.`);
        } else {
            const effect:{[resource:string]:{quantity:number}} = {};
            effect[gainResourceAction.resource] = {
                quantity: state.resources[gainResourceAction.resource].quantity + gainResourceAction.quantity
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
      const buyAction = (action as BuyAction);
        if (!state.generators[buyAction.entity]) {
            console.warn(`${buyAction.entity} isn't a valid generator.`);
        } else {
            if(buyAction.success) {
                if(Number.isNaN(buyAction.quantity)){
                    throw new TypeError(`action.quantity was NaN`);
                }
                state.generators[buyAction.entity].quantity = (state.generators[buyAction.entity].quantity || 0) + buyAction.quantity;
                Object.keys(buyAction.cost || {}).forEach(resourceName=>{
                    state.resources[resourceName].quantity -= buyAction.cost[resourceName];
                });
            }
        }
        return {...state};
    }
    if (action.type === "TICK"){
      const tick = (action as TickAction);
        let updatedResources = Object.keys(state.resources).reduce((updated:any, resourceName:string)=>{
            updated[resourceName].quantity += tick.generatedResources[resourceName];
            return updated;
        }, state.resources);
        return {...state, ...{
            resources : updatedResources
        }};
    }
    return state;
}
