const express = require('express')
const {Server} = require('http')
const bodyParser = require('body-parser')
const router = express.Router()
const request = require('superagent')
const IO = require('socket.io')

const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"

// For testing purposes I tried to set the database based on an environmental variable, but when testing I was not able to change this value
if(!process.env.MONGODB_URI){
  process.env.MONGODB_URI = "vehicles"
}

const NATS = require("nats")
const nats = NATS.connect({url: "nats://localhost:4222", json: true})

const port = process.env.PORT || 4000
const baseUrl = 'http://localhost:4000'

const app = express()
app.use(bodyParser.json())

const server = new Server(app)
server.listen(port, () => console.log(`Listening on port ${port}`))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});


const io = IO(server)

// Websocket connection established:

io.on('connection', (socket) => {

  console.log(`Socket connected`)

  //Server listens for changes on NATS and sends a POST request, which inserts data into the database:

  nats.subscribe('vehicle.test-bus-1', (message) => 
    request
    .post(`${baseUrl}/`)
    .type('json')
    .send(message)
    .catch(console.error))
  
  // Database connection established:

  MongoClient.connect(url , { useNewUrlParser: true }, function(err, db) {
    if(err) return console.error(err)

    let database = db.db(process.env.MONGODB_URI )

    router.get(`/`, (req, res) => {
      return database.collection('testbus1').find().sort({time: -1}).limit(1).toArray( (err, doc) => {
        if(err) return next(err)
        if(doc){
          res.send(doc)
        } else {
          res.send({message: 'Vehicle data does not exist'})
        }
      })
    })
  
    router.post(`/`, (req, res) => {
      return database.collection("testbus1").insertOne(req.body, function(err, res) {
        if (err) throw err
        console.log("1 document inserted");
      })
    })

    // Every 1.5 sec sends an upate with the bus data to the client 
    setInterval(() => socket.emit('output', database.collection('testbus1').find().sort({time: -1}).limit(1).toArray()), 1500)
  })
})

app.use(`/`, router)