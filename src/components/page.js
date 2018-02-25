import React, { Component } from 'react'
import {observer} from "mobx-react";

@observer
export class Page extends Component {
  componentDidMount() {
    if(this.props.store.state === 'pending') {
      this.props.store.fetchColors();
    }
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
