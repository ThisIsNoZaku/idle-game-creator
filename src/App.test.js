import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from "redux";
let store = createStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provier store={store}><App /></Provier>, div);
  ReactDOM.unmountComponentAtNode(div);
});
