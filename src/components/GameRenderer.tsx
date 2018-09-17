import {Component} from "react";
import * as React from "react";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid/Grid";
import LayoutSection from "./LayoutSection";
import GameConfiguration from "../config/model/GameConfiguration";
import AppState from "../state/AppState";

export class GameRenderer extends Component<GameRendererProps, GameRendererState> {
    render() {
        if (this.props.error) {
            return (<div>
                <div>
                    There was some error:
                </div>
                <div>
                    {this.props.error}
                </div>
            </div>)
        } else if(this.props.config) {
            return (<Grid
                container
                alignItems="stretch"
                justify="space-evenly"
            >
                <Grid item>
                    {Object.keys(this.props.config.layout).map(key => {
                        return (<LayoutSection identifier={key} config={this.props.config}/>)
                    })}
                </Grid>
                <Grid item></Grid>
            </Grid>)
        }
    }
}

class GameRendererProps {
    error?: string;
    config?:GameConfiguration;
}

class GameRendererState {
}

const connected = connect((state:AppState, ownProps:any) => {
    console.info("GameRenderer mapStateToProps called");
    return {...state, ...ownProps};
})(GameRenderer);

export default connected;