import React from 'react';
import {observer} from "mobx-react";

export const Entries = observer(({store}) => {
  return (
    <ul>
      {store.entriesList.map(
        (e, i) => <li key={i}>{e.name} <button onClick={evt => store.setbgColor(e.hex)}>Accept</button></li>
      )}
    </ul>
  );
});