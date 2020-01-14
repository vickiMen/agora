import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from "react-router-dom";
import Market from './Market';
import history from './history';


@inject("inventory")
@observer
class Main extends Component {

    constructor() {
        super()
        this.state = {
            currVal: '',
            referrer: null
        }
    }

    handleChange = (e) => {
        this.setState({
            currVal: e.target.value
        })
    }

    sendInput = () => {
        history.push('/')
        this.props.inventory.searchItem(this.state.currVal)
        this.setState({
            currVal: '',
            referrer: '/browse'
        })
    }

    render() {
        if (this.state.referrer) { 
            return (
                <Router>
                    <Redirect to={this.state.referrer} />
                    <Route exact path={this.state.referrer} render={() => <Market/> }/>
                </Router>
            ) 
        }
        else {
            return (
                    <body id='main-page'>
                        <div className='front-container'>
                            
                            <span id='main-title'>Buy, Sell & Explore</span>
                            
                            <span id='sub-title'>
                                What are you searching for?<br />
                                Start your search below, and don't forget, it's free to place a listing for sale with us!
                            </span>
                            
                            <div className='srcArea'>
                                <input className='search' 
                                       placeholder="I'm Looking for..." 
                                       value={this.state.currVal} 
                                       onChange={this.handleChange}
                                />
                                
                                <button 
                                    className='srcBtn' 
                                    onClick={this.sendInput}>
                                        Search
                                </button>

                            </div>
                        </div>
                    </body>
            )
        }
    }
}

export default Main