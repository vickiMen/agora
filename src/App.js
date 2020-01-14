import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer, inject } from 'mobx-react'
import Market from './Market';
import NavBar from './NavBar';
import Main from './Main';
import { Router, Route, Link, Switch } from "react-router-dom";
import About from './About';
import Help from './Help';
import Contact from './Contact';
import history from '/Users/vickimenashe/Documents/Elevation/week8/agora/src/history.js';
import createBrowserHistory from 'history/createBrowserHistory';


@inject("inventory")
@observer
class App extends Component {
  
  history = createBrowserHistory();
  render() {
    return (
      <Router history={history}>
          <NavBar />
          
          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path='/browse'>
            <Market/>
          </Route>
          
          <Route exact path='/about'>
            <About/>
          </Route>
          
          <Route exact path='/help'>
            <Help/>
          </Route>
          
          <Route exact path='/contact'>
            <Contact/>
          </Route>
      </Router>
    )
  }
}

export default App