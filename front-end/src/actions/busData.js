import * as request from 'superagent'

const baseUrl = 'http://localhost:4000'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'


const updateLocation = game => ({
  type: UPDATE_LOCATION,
  payload: game
})


export const findBus = () => (dispatch) => {
  request
    .get(`${baseUrl}/`)
    .then(result => dispatch(updateLocation(result.body)))
    .catch(err => console.error(err))
}
