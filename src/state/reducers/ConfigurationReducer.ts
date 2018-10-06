import GameConfiguration from "../../config/model/GameConfiguration";

import * as _ from "lodash";
import {Action} from "redux";
import PopulateConfigAction from "../actions/PopulateConfigAction";

export default function(state: any, action: Action<any>) {
    if (state === undefined) {
        return null;
    }

    if (action.type === "POPULATE_CONFIG") {
        const populateAction = (action as PopulateConfigAction);
        if (_.isEmpty(populateAction.config)) {
            throw new Error("POPULATE_CONFIG called but config was empty.");
        }
        return (populateAction.config as GameConfiguration);
    }
    
    return state;
}
