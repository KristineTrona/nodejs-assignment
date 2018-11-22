// import * as Koa from 'koa'
const  {createKoaServer} = require ("routing-controllers")
const {Server} = require ('http')
const  IO = require('socket.io')
// const koa = requires('koa')

// const server = new Server(app.callback())
const port = process.env.PORT || 4000

const app = createKoaServer({
  cors: true,
  controllers: [
   ]
  })

  const io = IO(app)

  io.on('connect', socket => {
    // const name = socket.request.user.firstName
    console.log(`User just connected`)
  
    socket.on('disconnect', () => {
      console.log(`User just disconnected`)
    })
  })

  app.listen(port, () => console.log(`Listening on port ${port}`))
  // .catch(err => console.error(err))

  module.exports = {io}