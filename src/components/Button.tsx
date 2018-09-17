import {Component} from "react";
import * as React from "react";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button"
import GameConfiguration from "../config/model/GameConfiguration";
import AppState from "../state/AppState";

export class ButtonComponent extends Component<ButtonComponentProps, ButtonState> {

    render() {
        console.log(this.props.config);
        return (<Button variant="outlined"
                        fullWidth
        >
            {this.props.config.buttons[this.props.identifier].name}
        </Button>)
    }

}

export class ButtonComponentProps {
    identifier:string;
    config?:GameConfiguration;
}

class ButtonState {
}

const connected = connect((state:AppState, ownProps:any)=>{
    return {...state, ...ownProps};
})(ButtonComponent);

export default connected;