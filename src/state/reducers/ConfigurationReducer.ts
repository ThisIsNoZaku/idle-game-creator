import GameConfiguration from "../../config/model/GameConfiguration";

import * as _ from "lodash";
import {Action} from "redux";
import PopulateConfigAction from "../actions/PopulateConfigAction";

export default function(state: any, action: Action<any>) {
    console.info("ConfigurationReducer called");
    if (state === undefined) {
        return null;
    }

    if (action.type === "POPULATE_CONFIG") {
        const populateAction = (action as PopulateConfigAction);
        console.assert(!_.isEmpty(populateAction.config), "POPULATE_CONFIG called but config was empty.");
        return (populateAction.config as GameConfiguration);
    } else {
        console.info(`ConfigurationReducer ignoring action of type ${action.type}`);
    }
    return state;
}
