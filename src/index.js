import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import RootReducer from "./state/reducers/RootReducer";
import YamlConfigurationParser from "./config/reader/YamlConfigurationParser";
import axios from "axios";
import ButtonClickMuliplexer from "./ButtonClickMultiplexer";
import TickCalculator from "./TickCalculator";

// Load the game configuration. If a query parameter is specified, try to load the file from there.
let queryParameters = new URLSearchParams(window.location.search);

let initialState = undefined;

if (queryParameters.has("config")) {
    let configLocation = queryParameters.get("config");
    console.info(`config query parameter defined (${configLocation}), attempting to retrieve.`);
    axios.get(`${queryParameters.get("config")}`).then(response => {
        console.info("Config query retrieved, dispatching configuration.");
        store.dispatch({
            type: "POPULATE_CONFIG",
            config: new YamlConfigurationParser().parse(response.data)
        })
    }, error => {
        console.error(error);
    }).catch(error => {
        console.error(error);
        store.dispatch({
            type: "POPULATE_CONFIG_ERROR",
            error
        });
    });
} else {
    initialState = {
        error: "Location of config file is missing. Add a query parameter like\n" +
            "?config=http://somewebsite.com/path/to/file.yaml"
    };
}

const store = applyMiddleware(ButtonClickMuliplexer, TickCalculator)(createStore)
(RootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
