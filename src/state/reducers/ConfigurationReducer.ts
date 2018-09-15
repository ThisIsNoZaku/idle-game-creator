import {Action} from "redux";
import GameConfiguration from "../../config/model/GameConfiguration";
import {ButtonComponent, ButtonComponentProps} from "../../components/Button";
import * as React from "react";
import LayoutConfiguration from "../../config/model/layout/LayoutConfiguration";
import {LayoutSection, LayoutSectionProps} from "../../components/LayoutSection";

export default function (state: any, action: Action) {
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