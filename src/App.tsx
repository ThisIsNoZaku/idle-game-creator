import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import GameRenderer from "./components/GameRenderer";
import HomeView from "./components/HomeView";

export class App extends Component<AppProps> {
    public render() {
        if (this.props.config) {
            return(<div className="App">
                <GameRenderer/>
            </div>);
        } else {
            return(<div className="App">
                <HomeView/>
            </div>);
        }
    }
}

class AppProps {
    public config?: any;
    public error?: string;
}

const connected = connect((state:AppState, ownProps:any) => {
    return {
        config: ownProps.config ||state.config,
        error: state.error,
    };
})(App);

export default connected;
