import {Action} from "redux";
import AppState from "../AppState";
import ResourceState from "../ResourceState";

export default function (state: any, action: Action<any>) {
    if (state == undefined) {
        return {
            resources: {}
        }
    }
    if (action.type === "POPULATE_CONFIG") {
        return {
            resources: Object.keys(action.config.resources).reduce((reduced: any, resourceName: string) => {
                reduced[resourceName] = new ResourceState(resourceName, 0);
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