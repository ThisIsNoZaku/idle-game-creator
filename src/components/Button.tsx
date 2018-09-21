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
        if(this.props.type === "button") {
            console.assert(this.props.config.buttons[this.props.identifier], `Mussing configuration for ${this.props.identifier}.`);
            return (<Button variant="outlined"
                            fullWidth
                            onClick={this.props.click}
            >
                {this.props.config.buttons[this.props.identifier].name}
            </Button>);
        } else if (this.props.type === "generator"){
            console.assert(this.props.config.generators[this.props.identifier], `Mussing configuration for ${this.props.identifier}.`);
            return (<Button variant="outlined"
                            fullWidth
                            onClick={this.props.click}
            >
                {this.props.quantity} {this.props.config.generators[this.props.identifier].name}
            </Button>);
        }
    }

}

export class ButtonComponentProps {
    public identifier: string;
    public config?: GameConfiguration;
    public quantity?:number;
    public type:string;
    public click?:()=>void
}

class ButtonState {
}

const connected = connect((state: AppState, ownProps: any) => {
    return {...state, ...ownProps, ...{
        quantity: ownProps.type === "generator" && state.state.generators[ownProps.identifier].quantity
        }};
}, (dispatch:Dispatch, ownProps:any)=>{
    return {
        click: ()=>{
            let config = ownProps.type === "button" ?
            ownProps.config.buttons[ownProps.identifier] :
            ownProps.config.generators[ownProps.identifier] ?
                ownProps.config.generators[ownProps.identifier] : undefined;
            if(!config) {
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
