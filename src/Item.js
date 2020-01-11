import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("inventory")
@observer
class Item extends Component {

    buyItem = () => {
        this.props.inventory.buyItem(this.props.item.name)
    }

    changePrice = () => {
        const newPrice = prompt('Please enter a new price')
        if (/\d+/.test(newPrice)){
            this.props.inventory.changePrice(this.props.item.name, newPrice)
        }
        else {
            alert('you must enter a valid number')
            return
        }
    }

    render() {
        return (
            <div>
                <li  className='item' onDoubleClick={this.changePrice}>
                    {this.props.inventory.description(this.props.item)}
                    <button className='butBtn' onClick={this.buyItem}>Buy</button>
                </li>
            </div>
        )
    }
}

export default Item
