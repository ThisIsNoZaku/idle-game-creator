import {Component, Fragment} from "react";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid/Grid";
import CardContent from "@material-ui/core/CardContent/CardContent";

export class LayoutSection extends Component<LayoutSectionProps, LayoutSectionState> {
    render() {
        return (<Card>
            <CardHeader title={this.props.header} style={{
                textAlign:"center"
            }}/>
            <CardContent>
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
            </CardContent>
        </Card>)
    }
}

export class LayoutSectionProps {
    header?: string;
    direction?: "horizontal" | "vertical" = "vertical";
}

class LayoutSectionState {
}