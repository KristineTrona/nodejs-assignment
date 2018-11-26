import * as request from 'superagent'
import {baseUrl} from '../constants'

export const UPDATE_LOCATION = 'UPDATE_LOCATION'


const updateLocation = message => ({
  type: UPDATE_LOCATION,
  payload: message
})


export const findBus = () => (dispatch) => {
  request
    .get(`${baseUrl}/`)
    .then(result => dispatch(updateLocation(result.body)))
    .catch(err => console.error(err))
}
