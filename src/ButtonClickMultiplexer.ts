import {Action, Store} from "redux";

export default (store: Store) => {
    return (next: (action: Action<any>) => any) => {
        return (action: Action<any>) => {
            if (action.type === "BUTTON_CLICK") {
                console.info("Multiplexing");
                action.button.effects.forEach((effect:string)=>{
                    const tokens = effect.split(" ");
                    let action;
                    switch (tokens[0]) {
                        case "yield" :
                            action = {
                                type: "GAIN_RESOURCE",
                                quantity: Number.parseInt(tokens[1]),
                                resource: tokens[2]
                            }
                    }
                    if(action) {
                        next(action);
                    }
                });
            } else {
                return next(action);
            }
        }
    }
}