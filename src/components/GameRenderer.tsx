import Grid from "@material-ui/core/Grid/Grid";
import {Component} from "react";
import * as React from "react";
import {connect} from "react-redux";
import GameConfiguration from "../config/model/GameConfiguration";
import AppState from "../state/AppState";
import LayoutSection from "./LayoutSection";

export class GameRenderer extends Component<GameRendererProps, GameRendererState> {
    public render() {
        if (this.props.error) {
            return (<div>
                <div>
                    There was some error:
                </div>
                <div>
                    {this.props.error}
                </div>
            </div>);
        } else if (this.props.config) {
            return (<Grid
                container
                alignItems="stretch"
                justify="space-evenly"
            >
                    {Object.keys(this.props.config.layout).map((key) => {
                        return (<Grid item xs>
                            <LayoutSection identifier={key} config={this.props.config}/>
                        </Grid>);
                    })}

            </Grid>);
        }
    }
}

class GameRendererProps {
    public error?: string;
    public config?: GameConfiguration;
}

class GameRendererState {
}

const connected = connect((state: AppState, ownProps: any) => {
    console.info("GameRenderer mapStateToProps called");
    return {...state, ...ownProps};
})(GameRenderer);

export default connected;
