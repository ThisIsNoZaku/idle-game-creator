import Grid from "@material-ui/core/Grid/Grid";
import * as React from "react";

export default class HomeView extends React.Component {
    public render() {
        return (<Grid
            container>
            <Grid item>
                Idle Game Creator is an engine for creating your own Idle/Clicker games. Inspired by the <a
                href="http://orteil.dashnet.org/igm/">Idle Game Maker</a>
            </Grid>
        </Grid>);
    }
}
