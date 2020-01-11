import React, { Component } from 'react'
import Item from './Item'
import { observer, inject } from 'mobx-react'

@inject("inventory")
@observer
class Market extends Component {
    
    constructor(){
        super()
        this.state = {
            currVal: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            currVal: e.target.value
        })
    }

    sendInput = (e) => {
        if( e.key === 'Enter'){
            this.props.inventory.addItem(this.state.currVal)
            this.state.currVal = ''
        }
    }

    render() {
        const inventory = this.props.inventory
        return (
            <div className='container'>
                <input className='searchInput' placeholder='Insert a new item...' value={this.state.currVal} onChange={this.handleChange} onKeyPress={this.sendInput}/>
                {inventory.items.map( item => <Item item={item} inventory={inventory}/>)}
            </div>

        )
    }
}

export default Market
