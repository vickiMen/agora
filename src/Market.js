import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import  Item  from './Item'
import axios from 'axios';

@inject("inventory")
@observer
class Market extends Component {
    
    constructor(){
        super()
        this.state = {
            currVal: ''
        }
    }

    componentDidMount() {
        if (this.props.inventory.isSearch){
            // if (!this.props.inventory.searchedItem) {
            //     this.props.inventory.updateSearch()
            //     return (<div>Sorry, no results found</div>)
            // }
            console.log('undefined',this.props.inventory.searchedItem)
            axios.get(`http://localhost:3002/items/${this.props.inventory.searchedItem.name}`)
            .then(response => {
                this.props.inventory.updateSearch()
                this.props.inventory.items = [...response.data]
            })
            .catch(error => {
                this.props.inventory.updateSearch()
                console.log(error)
            })
        } else {
            axios.get('http://localhost:3002/items')
            .then(response => {
              this.props.inventory.items = [...response.data]
            })
            .catch(error => {
              console.log(error);
            })
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
            this.setState({
                currVal: ''
            })
        }
    }

    render() {
        const inventory = this.props.inventory
            return (
                <div className='container'>
                    <input 
                        className='searchInput' 
                        placeholder='Insert a new item...' 
                        value={this.state.currVal} 
                        onChange={this.handleChange} 
                        onKeyPress={this.sendInput}
                    />
                    
                    <div className='itemsContainer'>
                        { inventory.items[0]
                            // {/* ? inventory.searchedItem */}
                                // {/* ? <Item item ={inventory.searchedItem} inventory={inventory}/> */}
                            ? inventory.items.map( item => 
                                    <Item item={item} inventory={inventory}/>)
                            : <div>Sorry, no results found</div>
                        }
                    </div>
                    
                </div>
            )
        }
    }

export default Market
