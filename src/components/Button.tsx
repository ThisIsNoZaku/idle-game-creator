import Button from "@material-ui/core/Button";
import {Component} from "react";
import * as React from "react";
import {connect} from "react-redux";
import GameConfiguration from "../config/model/GameConfiguration";
import AppState from "../state/AppState";
import {Dispatch} from "redux";
import {ButtonConfiguration} from "../config/model/ButtonConfiguration";

export class ButtonComponent extends Component<ButtonComponentProps, ButtonState> {

    public render() {
        if (this.props.type === "button") {
            return (<Button variant="outlined"
                            fullWidth
                            onClick={this.props.click}
            >
                {this.props.name}
            </Button>);
        } else if (this.props.type === "generator") {
            return (<Button variant="outlined"
                            fullWidth
                            onClick={this.props.click}
                            disabled={!this.props.enabled}
            >
                {this.props.quantity} {this.props.name}
            </Button>);
        }
    }

}

export class ButtonComponentProps {

    constructor(identifier: string, name: string, type: "button" | "generator", enabled:boolean = true, cost?: number, quantity?: number, click?: () => void) {
        this.identifier = identifier;
        this.name = name;
        this.cost = cost;
        this.quantity = quantity;
        this.enabled = enabled;
        this.type = type;
        this.click = click;
    }

    public identifier: string;
    public name: string;
    public enabled:boolean;
    public quantity?: number;
    public type: "button" | "generator";
    public click?: () => void;
    public cost?: number;
}

class ButtonState {
}

const connected = connect((state: AppState, ownProps: any) => {
    if (!ownProps.identifier) {
        throw new Error(`Must receive 'identifier' property from ownProps.`);
    }
    const type = ownProps.type;
    let costForNext:{[resourceName:string]:number}|undefined = undefined;
    if(type === "generator") {
        costForNext = Object.keys(state.config.generators[ownProps.identifier].baseCost).reduce((reduced:{[resourceName:string]:number}, resourceName:string)=>{
            reduced[resourceName] = Math.ceil(
                Math.pow(1.15, state.state.generators[ownProps.identifier].quantity)
                * state.config.generators[ownProps.identifier].baseCost[resourceName]);
            return reduced;
        }, {});
    }
    const canAffordToBuy = Object.keys(costForNext || {}).reduce((canAfford:boolean, resourceName:string)=>{
        if(!state.state.resources[resourceName]){
            throw new Error(`No resource ${resourceName} found.`);
        }
        return canAfford && costForNext![resourceName] <= state.state.resources[resourceName].quantity;
    }, true);
    return new ButtonComponentProps(ownProps.identifier,
        type === "button" ? state.config.buttons[ownProps.identifier].name :
            state.config.generators[ownProps.identifier].name,
        type,
        ownProps.type === "generator" ? canAffordToBuy : true,
        null,
        ownProps.type === "generator" ? state.state.generators[ownProps.identifier].quantity : undefined,
    );
}, (dispatch: Dispatch, ownProps: any) => {
    return {
        click: () => {
            let config = ownProps.type === "button" ?
                ownProps.config.buttons[ownProps.identifier] :
                ownProps.config.generators[ownProps.identifier] ?
                    ownProps.config.generators[ownProps.identifier] : undefined;
            if (!config) {
                throw new Error("Type was neither 'button' nor 'generator'.");
            }
            dispatch({
                type: "BUTTON_CLICK",
                button: {
                    identifier: ownProps.identifier,
                    effects: (config as ButtonConfiguration).onClick,
                    type: ownProps.type
                }
            })
        }
    }
})(ButtonComponent);

export default connected;
