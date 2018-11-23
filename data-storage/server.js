const fs = require ( "fs")
const {Server} = require ('http')
const express = require('express')
const  IO = require('socket.io')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

// const Koa = require('koa')
// const  {useKoaServer} = require ("routing-controllers")

const NATS = require("nats")
const nats = NATS.connect({url: "nats://localhost:4222", json: true})

const port = process.env.PORT || 4000
// const app = new Koa()
const app = express()
const server = new Server()

// app.get('/vehicles', (req, res) => {  
//   House.findAll().then(houses => {
//     res.json({ houses: houses }) 
//   })
//   .catch(err => {
//     res.status(500).json({
//       message: 'Something went wrong',
//       error: err
//     })
//   })
// })

// const server = new Server(app.callback())

// useKoaServer(app, {
//   cors: true,
//   controllers: []
// })

// const io = IO(server)

//   io.on('connect', () => {

//     console.log(`User just connected`)
  
//     socket.on('disconnect', () => {
//       console.log(`User just disconnected`)
//     })
//   })

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  const dbo = db.db("vehicles");

  nats.subscribe('vehicle.test-bus-1', (message) => 
  
  dbo.collection("testbus1").insertOne(message, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  }))
});

server.listen(port, () => console.log(`Listening on port ${port}`))