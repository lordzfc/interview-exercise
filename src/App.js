import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {observer} from "mobx-react";
import {MainStore} from './store';
import {Search} from './components/search';

const store = new MainStore();

@observer
class App extends Component {
  componentDidMount() {
    if(store.state === 'pending') {
      store.fetchColors();
    }
  }
  render() {
    return (
      <div className="app" style={{background: store.bgColorCssVal}}>
        <Search store={store} />
      </div>
    );
  }
}

export default App;
