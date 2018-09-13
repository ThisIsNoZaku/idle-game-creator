import {Component} from "react";
import * as React from "react";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button"

export class ButtonComponent extends Component<ButtonProps, ButtonState> {

    constructor(props: ButtonProps, context: any) {
        super(props, context);
        this.state = {
            text: props.defaultText
        }
    }

    render() {
        return (<Button variant="outlined"
                        onClick={this.props.onClick}>
            {this.props.text}
        </Button>)
    }

}

class ButtonProps {
    key:string;
    text:string;
    onClick?:()=>{}
}

class ButtonState {
}

const connected = connect()(Button);

export default connected;