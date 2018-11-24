const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();

const socket = require('socket.io')

const mongodb = require("mongodb");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

const NATS = require("nats")
const nats = NATS.connect({url: "nats://localhost:4222", json: true})

const port = process.env.PORT || 4000

const app = express()
app.use(bodyParser.json());

let server = app.listen(port, () => console.log(`Listening on port ${port}`))



MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if(err) return console.error(err);

  let dbo = db.db("vehicles");

  nats.subscribe('vehicle.test-bus-1', (message) => 
    dbo.collection("testbus1").insertOne(message, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
  }))

  const io = socket(server)

  io.on('connection', () => {

    console.log(`Socket connected`)
  
    socket.on('disconnect', () => {
      console.log(`Socket disconnected`)
    })
  })

  // socket.emit('output', res)

 router.get('/', (req, res) => {
    return dbo.collection('testbus1').find().limit(100).toArray( (err, docs) => {
      if(err) return next(err);

      if(docs){
        res.send(docs)
      } else {
        res.send({message: 'Vehicle data does not exist'})
      }
    })
  });

});

app.use('/', router)



