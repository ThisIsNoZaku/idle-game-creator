import Paper from "@material-ui/core/Paper/Paper";
import {Component} from "react";
import * as React from "react";
import {connect} from "react-redux";
import GameConfiguration from "../config/model/GameConfiguration";

import ResourceState from "../state/engine/ResourceState";

export class ResourceDisplay extends Component<ResourceDisplayProps> {
    public render() {
        console.assert(this.props.config, "Missing configuration object");
        console.assert(this.props.config!.resources, "Resource section missing on configuration");
        return (<Paper
            data-tip={this.props.config.resources[this.props.identifier].description || ""}>
            {this.props.config && this.props.config.resources[this.props.identifier].name} {this.props.quantity}
        </Paper>);
    }
}

interface ResourceDisplayProps {
    identifier: string;
    config?: GameConfiguration;
    quantity?: number;
}

const connected = connect((state: any, ownProps: any) => {
    const resource: ResourceState = state.state.resources[ownProps.identifier];
    return {
        ...state, ...ownProps, ...{
            quantity: resource !== undefined ? resource.quantity : "N/A",
        },
    };
})(ResourceDisplay);

export default connected;
