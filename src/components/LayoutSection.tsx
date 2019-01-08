import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid/Grid";
import {Component, Fragment} from "react";
import * as React from "react";
import {connect} from "react-redux";
import GameConfiguration from "../config/model/GameConfiguration";
import SectionConfiguration from "../config/model/layout/SectionConfiguration";
import AppState from "../state/AppState";
import GameState from "../state/engine/GameState";
import ButtonComponent from "./Button";
import ResourceDisplay from "./ResourceDisplay";
 export class LayoutSection extends Component<LayoutSectionProps> {
    public render() {
        const layoutConfig: SectionConfiguration = this.props.config!.layout[this.props.identifier];
        if (!layoutConfig) {
            throw new Error(`Failed to get layout config for ${this.props.identifier}`);
        }
        return (<Card>
            <CardHeader title={layoutConfig.header} style={{
                textAlign: "center",
            }}/>
            <CardContent>
                <Grid
                    container
                    direction={layoutConfig.direction === "horizontal" ? "row" : "column"}
                    alignItems="stretch"
                    justify="space-evenly"
                >
                    {
                        (layoutConfig.contains || []).map((containedItem: string) => {
                            if (Object.keys(this.props.config!.layout).includes(containedItem)) {
                                return (<Grid item>
                                    <LayoutSection identifier={containedItem} config={this.props.config}
                                        state={this.props.state}/>
                                </Grid>);
                            } else if (Object.keys(this.props.config!.buttons).includes(containedItem)) {
                                return (
                                    <Grid item>
                                        <ButtonComponent type={"button"} identifier={containedItem}
                                        config={this.props.config}/>
                                    </Grid>
                                );
                            } else if (Object.keys(this.props.config!.resources).includes(containedItem)) {
                                return (
                                    <Grid item>
                                        <ResourceDisplay identifier={containedItem} config={this.props.config} />
                                    </Grid>
                                );
                            } else if (Object.keys(this.props.config!.generators).includes(containedItem)) {
                                return (
                                    <Grid item>
                                        <ButtonComponent type="generator" identifier={containedItem}
                                        config={this.props.config}
                                        onClick={`buy 1 ${containedItem}`}/>
                                    </Grid>
                                );
                            } else if (Object.keys(this.props.config!.upgrades).includes(containedItem) &&
                                !this.props.state!.upgrades[containedItem].enabled) {
                                return (
                                    <Grid item>
                                        <ButtonComponent type={"upgrade"} identifier={containedItem}
                                        config={this.props.config}/>
                                    </Grid>
                                );
                            } else if (Object.keys(this.props.config!.achievements).includes(containedItem)) {
                                return (
                                    <Grid item>
                                        <ButtonComponent type={"achievement"} identifier={containedItem}
                                        config={this.props.config}/>
                                    </Grid>
                                );
                            }
                        })
                    }
                </Grid>
            </CardContent>
        </Card>);
    }
}
 export interface LayoutSectionProps {
    identifier: string;
    config?: GameConfiguration;
    state?: GameState;
}
 const connected = connect((state: AppState, ownProps: LayoutSectionProps) => {
    const mergedProps = {
        ...state, ...ownProps,
    };
    return mergedProps;
})(LayoutSection);

export default connected;
