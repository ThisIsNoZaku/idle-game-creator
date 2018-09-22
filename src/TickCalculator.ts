import {Action, Store} from "redux";
import AppState from "./state/AppState";

export default (store: Store) => {
    return (next: (action: Action<any>) => any) => {
        return (action: Action<any>) => {
            if(action.type === "TICK"){
                const state:AppState = store.getState();
                let generators = state.config.generators;
                let generatedResources = Object.keys(generators).reduce((generated:{[name:string]:number},
                                                                         generatorName:string)=>{
                    let generator = generators[generatorName];
                    if(!generator.onTick){
                        throw new Error(JSON.stringify(generator));
                    }
                    return generator.onTick.reduce((generated:any, effect:string)=>{
                        const tokens = effect.split(" ");
                        let effectName = tokens[0];
                        switch (effectName) {
                            case "yield":
                                const resourceQuantity = Number.parseFloat(tokens[1]);
                                const resourceName = tokens[2];
                                generated[resourceName] = (generated[resourceName] || 0) + (resourceQuantity * state.state.generators[generatorName].quantity);
                        }
                        return generated
                    }, generated);;
                }, {});
                action.generatedResources = generatedResources;
            }
            return next(action);
        }
    }
}
