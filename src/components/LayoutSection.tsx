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
import LayoutConfiguration from "../config/model/layout/LayoutConfiguration";
import SectionConfiguration from "../config/model/layout/SectionConfiguration";

export class LayoutSection extends Component<LayoutSectionProps, LayoutSectionState> {
    render() {
        console.assert(this.props.config, "Config is missing");
        console.assert(this.props.identifier, "Identifier not set");
        let layoutConfig:SectionConfiguration = this.props.config.layout[this.props.identifier];
        console.log(this.props);
        if(!layoutConfig){
            throw new Error(`Failed to get layout config for ${this.props.identifier}`);
        }
        return (<Card>
            <CardHeader title={layoutConfig.header} style={{
                textAlign: "center"
            }}/>
            <CardContent>
                <Grid
                    container
                    direction={layoutConfig.direction === "horizontal" ? "row" : "column"}
                    alignItems="stretch"
                    justify="space-evenly"
                >
                    {
                        (layoutConfig.contains || []).map((containedItem:string) => {
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
    config?: GameConfiguration;
}

class LayoutSectionState {
}

const connected = connect((state: AppState, ownProps: LayoutSectionProps) => {
    let mergedProps = {
        ...state, ...ownProps
    };
    console.log(mergedProps);
    return mergedProps;
})(LayoutSection);

export default connected;