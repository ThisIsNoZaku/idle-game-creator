import {Component, Fragment} from "react";
import * as React from "react";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";

export class LayoutSection extends Component<LayoutSectionProps, LayoutSectionState> {
    render() {
        return (<Paper>
            <Grid
                container
                direction={this.props.direction === "horizontal" ? "row" : "column"}
                alignItems="stretch"
                justify="space-evenly"
            >
                {React.Children.map(this.props.children, child => {
                    return (<Grid xs item alignItems="stretch" alignContent="center">
                        {child}
                        </Grid>)
                })}
            </Grid>
        </Paper>)
    }
}

class LayoutSectionProps {
    direction?: "horizontal" | "vertical" = "vertical";
}

class LayoutSectionState {
}

const connected = connect()(LayoutSection);

export default connected;