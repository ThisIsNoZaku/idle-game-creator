import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import GameRenderer from "./components/GameRenderer";

export class App extends Component<AppProps> {
    render() {
        if(this.props.error) {
            return (
                <div className="App">
                    {this.props.error &&
                    <span style={{color: "red"}}>{this.props.error}</span>
                    }
                </div>
            );
        } else {
            return(<div className="App">
                <GameRenderer/>
            </div>);
        }
    }
}

class AppProps{
    config?:any;
    error?:string;
}

const connected = connect(state=>{
    return {
        config: state.config !== undefined,
        error: state.error
    };
})(App);

export default connected;