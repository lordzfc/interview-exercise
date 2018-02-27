import React from 'react';
import {observer} from "mobx-react";
import {Entries} from './entries';
import './search.css'

export const Search = observer(({store}) => {
  return (
    <div className="search">
      <h2 className="header"> Color Picker </h2>
      <input onChange={e=>store.updateSearchInputVal(e.target.value)} placeholder="Type color name"/>
      <Entries store={store} />
    </div>
  );
});