import React from 'react';
import {observer} from "mobx-react";
import {Entries} from './entries';

export const Search = observer(({store}) => {
  return (
    <div>
      <input onChange={e=>store.updateSearchInputVal(e.target.value)}/>
      <Entries store={store} />
    </div>
  );
});