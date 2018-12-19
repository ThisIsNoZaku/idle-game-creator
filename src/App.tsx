import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";

import GameRenderer from "./components/GameRenderer";
import HomeView from "./components/HomeView";
import AppState from "./state/AppState";

import "./App.css";

export class App extends Component<AppProps> {
    
    componentDidMount () {
        document.addEventListener("click", () => {
            ReactTooltip.hide();
        })
    }
    public render() {
        if (this.props.config) {
            return(<div className="App">
                <GameRenderer/>
                <ReactTooltip multiline={true} />
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

const connected = connect((state: AppState, ownProps: any) => {
    return {
        config: state.config,
        error: state.error,
    };
})(App);

export default connected;
