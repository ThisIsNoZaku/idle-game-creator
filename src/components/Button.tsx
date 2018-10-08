import Button from "@material-ui/core/Button";
import {Component} from "react";
import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import ButtonConfiguration from "../config/model/ButtonConfiguration";
import ButtonClickAction from "../state/actions/ButtonClickAction";
import AppState from "../state/AppState";

export class ButtonComponent extends Component<ButtonComponentProps> {

    public render() {
            return (<Button variant="outlined"
                            fullWidth
                            onClick={this.props.click}
                            data-tip={this.props.tooltip || ""}
                            disabled={!this.props.enabled}
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
    const config = ownProps.config || state.config;
    
    let elementConfig;
    let costForNext: {[resourceName: string]: number}|undefined;
    if (type === "generator") {
        elementConfig = config.generators[ownProps.identifier];
        costForNext = Object.keys(state.config.generators[ownProps.identifier].baseCost)
        .reduce((reduced: {[resourceName: string]: number}, resourceName: string) => {
            reduced[resourceName] = Math.ceil(
                Math.pow(1.15, state.state.generators[ownProps.identifier].quantity)
                * state.config.generators[ownProps.identifier].baseCost[resourceName]);
            return reduced;
        }, {});
    } else if (type === "upgrade") {
        elementConfig = config.upgrades[ownProps.identifier];
        costForNext = state.config.upgrades[ownProps.identifier].baseCost;
    } else if (type === "button") {
        elementConfig = config.buttons[ownProps.identifier];
    }
    const canAffordToBuy = Object.keys(costForNext || {}).reduce((canAfford: boolean, resourceName: string) => {
        if (!state.state.resources[resourceName]) {
            throw new Error(`No resource ${resourceName} found.`);
        }
        return canAfford && costForNext![resourceName] <= state.state.resources[resourceName].quantity;
    }, true);
    
    return {
        identifier: ownProps.identifier,
        name: elementConfig.name,
        type: type,
        enabled: ownProps.type === "button" ? true : canAffordToBuy,
        quantity: ownProps.type === "generator" ? state.state.generators[ownProps.identifier].quantity : undefined,
        tooltip: ownProps.tooltip || elementConfig.description,
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
