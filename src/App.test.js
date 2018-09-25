import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from "redux";
import {Provider} from "react-redux";
import GameConfiguration from "./config/model/GameConfiguration";
import MetaConfiguration from "./config/model/MetaConfiguration";
import ButtonConfiguration from "./config/model/ButtonConfiguration";
import SectionConfiguration from "./config/model/layout/SectionConfiguration";
import ResourceConfiguration from "./config/model/ResourceConfiguration";
import GeneratorConfiguration from "./config/model/GeneratorConfiguration";

let store = createStore(()=>{return {
  config: new GameConfiguration(new MetaConfiguration(),
    new ButtonConfiguration(),
    [],
    new ResourceConfiguration(),
    new GeneratorConfiguration()
)
}});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={createStore(()=>{return {}})}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('renderers a game if given a configuration', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App/></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
})
