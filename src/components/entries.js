import React from 'react';
import {observer} from "mobx-react";

export const Entries = observer(({store}) => {
  return (
    <ul>
      {store.entriesList.map(
        e => <li>{e.name} <button onClick={store.setbgColor.bind(this, e.hex)}>Accept</button></li>
      )}
    </ul>
  );
});