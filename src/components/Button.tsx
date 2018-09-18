import Button from "@material-ui/core/Button";
import {Component} from "react";
import * as React from "react";
import {connect} from "react-redux";
import GameConfiguration from "../config/model/GameConfiguration";
import AppState from "../state/AppState";
import {Dispatch} from "redux";

export class ButtonComponent extends Component<ButtonComponentProps, ButtonState> {

    public render() {
        console.log(this.props.config);
        return (<Button variant="outlined"
                        fullWidth
                        onClick={this.props.click}
        >
            {this.props.config.buttons[this.props.identifier].name}
        </Button>);
    }

}

export class ButtonComponentProps {
    public identifier: string;
    public config?: GameConfiguration;
    public click:()=>void
}

class ButtonState {
}

const connected = connect((state: AppState, ownProps: any) => {
    return {...state, ...ownProps};
}, (dispatch:Dispatch, ownProps:any)=>{
    return {
        click: ()=>{
            console.log("Clicked");
            dispatch({
                type: "BUTTON_CLICK",
                button: {
                    identifier: ownProps.identifier
                }
            })
        }
    }
})(ButtonComponent);

export default connected;
