const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const request = require('superagent')

const socket = require('socket.io')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

const NATS = require("nats")
const nats = NATS.connect({url: "nats://localhost:4222", json: true})

const port = process.env.PORT || 4000
const baseUrl = 'http://localhost:4000'

const app = express()
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let server = app.listen(port, () => console.log(`Listening on port ${port}`))

nats.subscribe('vehicle.test-bus-1', (message) => 
  request
  .post(`${baseUrl}/`)
  .type('json')
  .send(message)
  .catch(console.error)
)

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if(err) return console.error(err);

  let dbo = db.db("vehicles");

  const io = socket(server)

  io.on('connection', () => {

    console.log(`Socket connected`)
  
    socket.on('disconnect', () => {
      console.log(`Socket disconnected`)
    })
  })

  // socket.emit('output', res)

 router.get(`/`, (req, res) => {
    return dbo.collection('testbus1').find().sort({time: -1}).limit(1).toArray( (err, docs) => {
      if(err) return next(err);

      if(docs){
        res.send(docs)
        console.log(docs.length)
      } else {
        res.send({message: 'Vehicle data does not exist'})
      }
    })
  });

  router.post(`/`, (req, res) => {
    return dbo.collection("testbus1").insertOne(req.body, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    })
  });

});

app.use(`/`, router)



