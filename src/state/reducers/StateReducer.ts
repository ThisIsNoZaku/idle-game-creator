import {Action} from "redux";
import AppState from "../AppState";
import ResourceState from "../ResourceState";

export default function (state:any, action:Action<any>){
    if (state == undefined) {
        return {
            resources:{}
        }
    }
    if(action.type === "POPULATE_CONFIG"){
        return {
            resources : Object.keys(action.config.resources).reduce((reduced:any, resourceName:string)=>{
                reduced[resourceName] = new ResourceState(resourceName, 0);
                return reduced;
            }, {})
        }
    }
    return state;
}