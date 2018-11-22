const fs = require ( "fs")
const {Server} = require ('http')
const  IO = require('socket.io')
const Koa = require('koa')
const  {useKoaServer} = require ("routing-controllers")

const NATS = require("nats")
const nats = NATS.connect({url: "nats://demo.nats.io:4222", json: true})

const port = process.env.PORT || 4000
const app = new Koa()
const server = new Server(app.callback())

useKoaServer(app, {
  cors: true,
  controllers: []
})

const io = IO(server)

  io.on('connect', () => {

    console.log(`User just connected`)
  
    socket.on('disconnect', () => {
      console.log(`User just disconnected`)
    })
  })

nats.subscribe('vehicle.test-bus-1', console.log(obj))

server.listen(port, () => console.log(`Listening on port ${port}`))