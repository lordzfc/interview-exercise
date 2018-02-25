import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {MainStore} from './store';
import {Page} from './components/page';

const store = new MainStore();

class App extends Component {
  componentDidMount() {
    if(store.state === 'pending') {
      store.fetchColors();
    }
  }
  render() {
    return (
      <div className="App" style={{background: store.bgColorCssVal}}>
      </div>
    );
  }
}

export default App;
