// Server setup
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require(`path`)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'node_modules')))


const port = 3002
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})

// Mongoose setup
const mongoose = require('mongoose')
const DB_URL = `mongodb://localhost/agoraDB`

const connectionOptions = {
        // poolSize: 20,
        socketTimeoutMS: 0,
        connectTimeoutMS: 0,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
}

mongoose.connect(DB_URL, connectionOptions, (err) => {
    if (err) {
        console.log(err.message)
    }
})


const Item = require('./itemSchema')

//dbSetup for the first time and them comment out
const dbSetup = async function() {
    const dbPromises = []
    const data =  [
        { name: 'Bicycle', price: 1000, quantity: 1, seller: 'Walter White', category: 'Bicycles', img: 'https://f001backblaze.b-cdn.net/file/marketplacekit/shopping/images/2018/08/07/6903bccd7acb91a301422d7f45485fe9.jpg?w=300&h=255' },
        { name: 'Winter is coming coat', price: 10, quantity: 1, seller: 'John Snow', category: 'clothing', img: 'https://f001backblaze.b-cdn.net/file/marketplacekit/shopping/images/2018/08/07/ec6347cf7bf8a149017a1988ff482c0e.jpg?w=300&h=255'  },
        { name: 'Baby tomatoes plants', price: 20, quantity: 2, seller: 'Eyal Shani', category: 'Home & Garden', img: 'https://f001backblaze.b-cdn.net/file/marketplacekit/shopping/images/2018/08/07/e4504e6e378cfadea4a24d29ad24cfa6.jpg?w=300&h=255' }
    ]

    const dbData = data.map( d => new Item({
        name: d.name,
        price: d.price,
        quantity: d.quantity,
        seller: d.seller,
        category: d.category,
        img: d.img,
    }))
    
    dbData.forEach( d => {
        dbPromises.push(
            d.save( function( err, data){
                if(err){
                    console.log()
                }
                else {
                    console.log(data)
                }
            }))
        })
    
        await Promise.all(dbPromises)
    }

// dbSetup()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.get('/items', async function (req, res) {
    const data = await Item.find({})
    res.send(data)
})

app.get('/items/:name', async function (req, res) {
    const data = await Item.find({
        name: new RegExp(req.params.name, 'i')
    })
    res.send(data)
})

app.post('/item', async function (req, res) {
    const newItem = new Item(req.body)
    await newItem.save()
    res.send(newItem)
})

app.delete('/item/:id', async function (req, res) {
    await Item.findOneAndDelete({ _id: req.params.id })
    res.send('item was deleted successfully')
})

