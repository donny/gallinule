import { combineReducers } from 'redux'
import {
  SELECT_APP, INVALIDATE_APP,
  REQUEST_REVIEWS, RECEIVE_REVIEWS
} from '../actions'

const selectedApp = (state = '404667893', action) => {
  switch (action.type) {
    case SELECT_APP:
      return action.app
    default:
      return state
  }
}

const reviews = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_APP:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_REVIEWS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_REVIEWS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.reviews,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const reviewsByApp = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_APP:
    case RECEIVE_REVIEWS:
    case REQUEST_REVIEWS:
      return {
        ...state,
        [action.app]: reviews(state[action.app], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  reviewsByApp,
  selectedApp
})

export default rootReducer
