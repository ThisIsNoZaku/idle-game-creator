import ConfigurationReducer from "./ConfigurationReducer";
import StateReducer from "./StateReducer";

import {combineReducers, Reducer} from "redux";

export default combineReducers({
    config: ConfigurationReducer,
    error: () => "",
    state: StateReducer,
});
