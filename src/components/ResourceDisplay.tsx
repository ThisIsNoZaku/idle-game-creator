import {Component} from "react";
import * as React from "react";
import {connect} from "react-redux";
import GameConfiguration from "../config/model/GameConfiguration";
import Paper from "@material-ui/core/Paper/Paper";
import ResourceState from "../state/ResourceState";

export class ResourceDisplay extends Component<ResourceDisplayProps, ResourceDisplayState> {
    render() {
        console.assert(this.props.config, "Missing configuration object");
        console.assert(this.props.config.resources, "Resource section missing on configuration");
        return (<Paper>
            {this.props.config.resources[this.props.identifier].name} {this.props.quantity}
        </Paper>)
    }
}

class ResourceDisplayProps {
    identifier: string;
    config?: GameConfiguration;
    quantity: number;
}

class ResourceDisplayState {
}

const connected = connect((state: any, ownProps: any) => {
    let resource:ResourceState = state.state.resources[ownProps.identifier];
    return {
        ...state, ...ownProps, ...{
            quantity: resource !== undefined ? resource.quantity : "N/A"
        }
    };
})(ResourceDisplay);

export default connected;