import {Action} from "redux";
import GameConfiguration from "../../config/model/GameConfiguration";
import {ButtonComponent, ButtonComponentProps} from "../../components/Button";
import * as React from "react";

export default function (state: any, action: Action) {
    console.info("ConfigurationReducer called");
    if (state === undefined) {
        return {};
    }

    if (action.type === "POPULATE_CONFIG") {
        console.info("Populating components from config.");
        let config = (action.config as GameConfiguration);
        let buttons = Object.keys(config.buttons).reduce((configuredButtons: { [key: string]: React.ComponentElement<any, any> }, buttonKey) => {
            console.info(`Instantiating button ${buttonKey}.`);
            let buttonConfig = config.buttons[buttonKey];
            configuredButtons[buttonKey] = React.createElement(ButtonComponent, (() => {
                let props = new ButtonComponentProps();
                props.buttonKey = buttonKey;
                props.text = buttonConfig.text;
                return props;
            })());
            return configuredButtons;
        }, {});
        return {
            ...state, ...{
                buttons
            }
        }
    } else {
        console.info(`ConfigurationReducer ignoring action of type ${action.type}`);
    }
    return state;
}