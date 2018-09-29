import GameConfiguration from "../../config/model/GameConfiguration";

import * as _ from "lodash";
import {Action} from "redux";

export default function(state: any, action: Action<any>) {
    console.info("ConfigurationReducer called");
    if (state === undefined) {
        return null;
    }

    if (action.type === "POPULATE_CONFIG") {
        console.assert(!_.isEmpty(action.config), "POPULATE_CONFIG called but config was empty.");
        return (action.config as GameConfiguration);
    } else {
        console.info(`ConfigurationReducer ignoring action of type ${action.type}`);
    }
    return state;
}
