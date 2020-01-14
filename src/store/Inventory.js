import { observable, action, computed } from 'mobx'
import { Item } from './Item'

export class Inventory {
    
    @observable items = [] //array of items from class Item
    @observable searchedItem = ''
    @observable isSearch = false
    
    @action searchItem = (name) => {
        if (name == ''){
            return
        }
        let lowerName = name.toLowerCase()
        this.items.forEach( item => item.name = item.name.toLowerCase())
        this.searchedItem = this.items.find( item => item.name.includes(lowerName))
        if (!this.searchedItem){
            console.log('searchedItem', this.searchedItem)
            this.searchedItem = { name: 'notFound' }
        }
        this.isSearch = true
    }
    
    @action addItem = (name) => {
        if (name == ''){
            return
        }
        let lowerName = name.toLowerCase()
        this.items.forEach( item => item.name = item.name.toLowerCase())
        const item = this.items.find( item => item.name == lowerName )
        if(item){
            item.quantity++
        } else {
            this.items.push(new Item(name))
        }
    }

    @action updateSearch = () => {
        this.isSearch = !this.isSearch
    }

    description(item){
        switch(true){
            case item.quantity == 1:
                let normalizedName = item.name
                normalizedName = normalizedName.split('')
                normalizedName[0] = normalizedName[0].toUpperCase()
                return `There's 1 ${normalizedName.join('')} available at the price of: ${item.price}$`
            case item.quantity > 1:
                return `There are ${item.quantity} ${item.name}s available at ${item.price}$ per item`
        }
    }

    @action buyItem = (name) => {
        const item = this.items.find( item => item.name == name)
        item.quantity > 1 
            ? item.quantity-- 
            : this.items.splice(this.items.indexOf(item),1)
    }

    @action changePrice = (name,price) => {
        const item = this.items.find( item => item.name == name)
        item.price = price
    }

    @computed get numItems (){
        return this.items.length
    }
}

export const inventory = new Inventory()