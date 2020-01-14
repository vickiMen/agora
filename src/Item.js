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
        let item = this.props.item
        return (
            <div>
                <div className='item' onDoubleClick={this.changePrice}>
                    <div className='imgContainer'>
                        <button className='buyBtn' onClick={this.buyItem}>Buy</button>
                        <img src={item.img}></img>
                    </div>
                    {this.props.inventory.description(this.props.item)}
                    <br></br>
                    Seller: {item.seller}
                    <br></br>
                </div>
            </div>
        )
    }
}

export default Item
