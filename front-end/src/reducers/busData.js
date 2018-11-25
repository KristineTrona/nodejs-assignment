import {UPDATE_LOCATION} from '../actions/busData'

const reducer = (state = null, action = {}) => {
  switch(action.type){
    case UPDATE_LOCATION:
    return {
      ...state,
      payload: action.payload
    }
    default:
      return state
  }
}

export default reducer