import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer, inject } from 'mobx-react'
import Market from './Market';

@inject("inventory")
@observer
class App extends Component {

  render() {
    return (
      <div>
        <Market inventory={this.props.inventory}/>
      </div>
    )
  }
}

export default App
