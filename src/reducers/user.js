import { UPDATE_USER } from '../actions/actionTypes'

const initialState = {
  user: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case UPDATE_USER:
    return { ...state, ...payload }

  default:
    return state
  }
}
