import {Action} from "redux";
import GameConfiguration from "../../config/model/GameConfiguration";

export default function(state: any, action: Action<any>) {
    console.info("ConfigurationReducer called");
    if (state === undefined) {
        return {};
    }

    if (action.type === "POPULATE_CONFIG") {
        return (action.config as GameConfiguration);
    } else {
        console.info(`ConfigurationReducer ignoring action of type ${action.type}`);
    }
    return state;
}
