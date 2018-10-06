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
    let costForNext: {[resourceName: string]: number}|undefined;
    if (type === "generator") {
        costForNext = Object.keys(state.config.generators[ownProps.identifier].baseCost)
        .reduce((reduced: {[resourceName: string]: number}, resourceName: string) => {
            reduced[resourceName] = Math.ceil(
                Math.pow(1.15, state.state.generators[ownProps.identifier].quantity)
                * state.config.generators[ownProps.identifier].baseCost[resourceName]);
            return reduced;
        }, {});
    }
    const canAffordToBuy = Object.keys(costForNext || {}).reduce((canAfford: boolean, resourceName: string) => {
        if (!state.state.resources[resourceName]) {
            throw new Error(`No resource ${resourceName} found.`);
        }
        return canAfford && costForNext![resourceName] <= state.state.resources[resourceName].quantity;
    }, true);
    return {
        identifier: ownProps.identifier,
        name: type === "button" ? state.config.buttons[ownProps.identifier].name :
            state.config.generators[ownProps.identifier].name,
        type: type,
        enabled: ownProps.type === "generator" ? canAffordToBuy : true,
        cost: ownProps.type === "generator" ? state.state.generators[ownProps.identifier].quantity : undefined,
        tooltip: ownProps.tooltip || type === "button" ? state.config.buttons[ownProps.identifier].description :
            state.config.generators[ownProps.identifier].description
    };
}, (dispatch: Dispatch, ownProps: any) => {
    return {
        click: () => {
            const config = ownProps.type === "button" ?
                ownProps.config.buttons[ownProps.identifier] :
                ownProps.config.generators[ownProps.identifier] ?
                    ownProps.config.generators[ownProps.identifier] : undefined;
            if (!config) {
                throw new Error("Type was neither 'button' nor 'generator'.");
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
