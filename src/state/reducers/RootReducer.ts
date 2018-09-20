import {combineReducers, Reducer} from "redux";
import ConfigurationReducer from "./ConfigurationReducer";
import StateReducer from "./StateReducer";

export default combineReducers({
    config: ConfigurationReducer,
    state: StateReducer
});
