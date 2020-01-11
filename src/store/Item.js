import { observable, action } from 'mobx'

export class Item {
        
    @observable name
    @observable price
    @observable quantity

    constructor(name) {
        this.name = name
        this.price = 0
        this.quantity = 1
    }
}