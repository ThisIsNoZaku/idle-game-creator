import Button from "@material-ui/core/Button";
import {Component} from "react";
import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import ButtonConfiguration from "../config/model/ButtonConfiguration";
import GameConfiguration from "../config/model/GameConfiguration";
import GeneratorConfiguration from "../config/model/GeneratorConfiguration";
import UpgradeConfiguration from "../config/model/UpgradeConfiguration";
import ButtonClickAction from "../state/actions/ButtonClickAction";
import AppState from "../state/AppState";

function generateResourceString(entityResources: any,
    gameConfig: GameConfiguration) {
    return "- Costs -<br/>" +
    Object.keys(entityResources)
        .map((nextResourceName: string) => {
            const displayName = gameConfig.resources[nextResourceName].name;
            return `${displayName} : ${entityResources[nextResourceName]}`;
        }, "").join("\n");
}

function generateTooltipForEntity(base: string, toBind: {[key: string]: any},
    entityConfig: GeneratorConfiguration | UpgradeConfiguration,
    gameConfig: GameConfiguration) {
    return Object.keys(toBind).reduce((s: string, nextKey: string) => {
        if (nextKey === "resources" && toBind.resources) {
            if (entityConfig.costTooltip) {
                const resourceString =
                    generateResourceString(toBind.resources,
                        gameConfig);
                return s + "<br/>" + resourceString;
            } else {
                return s;
            }
        }
        return s.replace(new RegExp(`\{${nextKey}\}`), toBind[nextKey].toString());
    }, base);
}

export class ButtonComponent extends Component<ButtonComponentProps> {

    public render() {
        const buttonClass = this.props.enabled ? "" : "appear-disabled";
            return (<Button variant="outlined"
                            fullWidth
                            onClick={this.props.enabled ? this.props.click :
                                () => undefined}
                            data-tip={this.props.tooltip || ""}
                            className={buttonClass}
            >
                {this.props.quantity} {this.props.name}
            </Button>);
    }

}

export interface ButtonComponentProps {
    identifier: string;
    name: string;
    enabled: boolean;
    quantity?: number;
    type: "button" | "generator";
    click?: () => void;
    cost?: number;
    tooltip?: string;
}

const connected = connect((state: AppState, ownProps: any) => {
    if (!ownProps.identifier) {
        throw new Error(`Must receive 'identifier' property from ownProps.`);
    }
    const type = ownProps.type;
    const config: GameConfiguration = ownProps.config || state.config;

    let tooltip = ownProps.tooltip;

    let elementConfig: any;
    let costForNext: {[resourceName: string]: number}|undefined;
    if (type === "generator") {
        elementConfig = config.generators[ownProps.identifier];
        costForNext = Object.keys(state.config.generators[ownProps.identifier].cost.resources)
        .reduce((reduced: {[resourceName: string]: number}, resourceName: string) => {
            reduced[resourceName] = Math.ceil(
                Math.pow(1.15, state.state.generators[ownProps.identifier].quantity)
                * state.config.generators[ownProps.identifier].cost.resources[resourceName]);
            return reduced;
        }, {});
        if (!tooltip) {
            tooltip = generateTooltipForEntity(elementConfig.description, {
                resources: costForNext,
            }, elementConfig, state.config);
        }
    } else if (type === "upgrade") {
        elementConfig = config.upgrades[ownProps.identifier];
        costForNext = state.config.upgrades[ownProps.identifier].costs.resources;
        if (!tooltip) {
            tooltip = generateTooltipForEntity(elementConfig.description,
            costForNext
            , elementConfig, state.config);
        }
    } else if (type === "button") {
        elementConfig = config.buttons[ownProps.identifier];
        if (!tooltip) {
            tooltip = generateTooltipForEntity(elementConfig.description, {},
                elementConfig, state.config);
        }
    }

    const canAffordToBuy = Object.keys(costForNext || {}).reduce((canAfford: boolean, resourceName: string) => {
        if (!state.state.resources[resourceName]) {
            throw new Error(`No resource ${resourceName} found.`);
        }
        return canAfford && costForNext![resourceName] <= state.state.resources[resourceName].quantity;
    }, true);

    return {
        enabled: ownProps.type === "button" ? true : canAffordToBuy,
        identifier: ownProps.identifier,
        name: elementConfig!.name,
        quantity: ownProps.type === "generator" ? state.state.generators[ownProps.identifier].quantity : undefined,
        tooltip,
        type,
    };
}, (dispatch: Dispatch, ownProps: any) => {
    return {
        click: () => {
            let config;
            switch (ownProps.type) {
                case "button":
                    config = ownProps.config.buttons[ownProps.identifier];
                    break;
                case "generator":
                    config = ownProps.config.generators[ownProps.identifier];
                    break;
                case "upgrade":
                    config = ownProps.config.upgrades[ownProps.identifier];
            }
            if (!config) {
                throw new Error("Type was none of 'button', 'generator' or 'upgrade'.");
            }
            dispatch({...new ButtonClickAction({
                effects: (config as ButtonConfiguration).onClick,
                identifier: ownProps.identifier,
                type: ownProps.type,
            })});
        },
    };
})(ButtonComponent);

export default connected;
