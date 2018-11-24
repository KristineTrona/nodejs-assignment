const fs = require ( "fs")
const {Server} = require ('http')
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

  const io = socket(server)

  io.on('connection', () => {

    console.log(`Socket connected`)
  
    socket.on('disconnect', () => {
      console.log(`Socket disconnected`)
    })
  })

  app.get('/', (req,res) => {
    dbo.collection('testbus1').find({}, (err, docs) => {
      if(err) return next(err);
      docs.each(function(err, doc) {
        if(doc) {
          console.log(doc)
          res.send({doc});
          }
        else {
          res.status(404).send({message: 'Vehicle data does not exist'})
        }
      })
    })
  });

});


// const database = require('./db')

// const Koa = require('koa')
// const  {useKoaServer} = require ("routing-controllers")



// const server = new Server()

// const server = new Server(app.callback())

// useKoaServer(app, {
//   cors: true,
//   controllers: []
// })



//TO GET THE DATA IN THE DATABASE

// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;
//   const dbo = db.db("vehicles");

//   nats.subscribe('vehicle.test-bus-1', (message) => 
  
//   dbo.collection("testbus1").insertOne(message, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//   }))
// });


