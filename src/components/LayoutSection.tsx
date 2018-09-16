import {Component, Fragment} from "react";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid/Grid";
import CardContent from "@material-ui/core/CardContent/CardContent";
import AppState from "../state/AppState";
import {connect} from "react-redux";
import GameConfiguration from "../config/model/GameConfiguration";
import {ButtonComponent} from "./Button";

export class LayoutSection extends Component<LayoutSectionProps, LayoutSectionState> {
    render() {
        return (<Card>
            <CardHeader title={this.props.config.layout[this.props.identifier].header} style={{
                textAlign: "center"
            }}/>
            <CardContent>
                <Grid
                    container
                    direction={this.props.config.layout[this.props.identifier].direction === "horizontal" ? "row" : "column"}
                    alignItems="stretch"
                    justify="space-evenly"
                >
                    {
                        (this.props.config.layout[this.props.identifier].contains || []).map(containedItem => {
                            if (Object.keys(this.props.config.layout).includes(containedItem)) {
                                return (<Grid item>
                                    <LayoutSection identifier={containedItem} config={this.props.config}/>
                                </Grid>);
                            } else if (Object.keys(this.props.config.buttons)) {
                                return (
                                    <Grid item>
                                        <ButtonComponent identifier={containedItem} config={this.props.config}/>
                                    </Grid>
                                )
                            }
                        })
                    }
                </Grid>
            </CardContent>
        </Card>)
    }
}

export class LayoutSectionProps {
    identifier: string;
    config: GameConfiguration;
}

class LayoutSectionState {
}

const connected = connect((state: AppState, ownProps: LayoutSectionProps) => {
    return {
        ...state, ...ownProps
    };
})(LayoutSection);

export default connected;