import {Action, Store} from "redux";
import AppState from "../AppState";

export default (store: Store) =>
    (next: (action: Action<any>) => any) =>
        (action: Action<any>) => {
            if (action.type === "TICK") {
                console.log("TICK");
            } else {
                return next(action);
            }
        }
