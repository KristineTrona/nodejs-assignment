// import io from 'socket.io-client'
// import {baseUrl} from './constants'

// export default class SocketIO {
//   socket = null

//   connect(dispatch) {
//     console.log('Connecting websocket')
//     this.socket = io.connect(baseUrl);
//     this.socket.on('action', payload => dispatch(payload))
//   }

//   disconnect() {
//     console.log('Disconnecting websocket')
//     this.socket.disconnect()
//   }
// }