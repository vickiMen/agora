const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    seller: String,
    cateogry: String,
    img: String
})

const Item = mongoose.model("item", itemSchema)
module.exports = Item