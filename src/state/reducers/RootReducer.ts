import {combineReducers, Reducer} from "redux";
import ConfigurationReducer from "./ConfigurationReducer";

export default combineReducers({
    components: ConfigurationReducer
});