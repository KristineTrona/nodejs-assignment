import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers/index'
import ReduxThunk from 'redux-thunk'
// import SocketIO from './socketio'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// const socket = new SocketIO()

const enhancer = compose(
  applyMiddleware(ReduxThunk),
  devTools
)

const store = createStore(reducer, enhancer)


export default store
