export const SELECT_APP = 'SELECT_APP'
export const INVALIDATE_APP = 'INVALIDATE_APP'
export const REQUEST_REVIEWS = 'REQUEST_REVIEWS'
export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'

export const selectApp = (app) => ({
  type: SELECT_APP,
  app
})

export const invalidateApp = (app) => ({
  type: INVALIDATE_APP,
  app
})

export const requestReviews = (app) => ({
  type: REQUEST_REVIEWS,
  app
})

export const receiveReviews = (app, json) => ({
  type: RECEIVE_REVIEWS,
  app,
  reviews: json.feed.entry
    .filter((entry, index) => index !== 0) // The first entry is not a review.
    .map(child => child),
  receivedAt: Date.now()
})

// A thunk action creator.
const fetchReviews = (app) => (dispatch) => {
  dispatch(requestReviews(app))
  return fetch(`https://itunes.apple.com/au/rss/customerreviews/id=${app}/sortBy=mostRecent/json`)
    .then(response => response.json())
    .then(json => dispatch(receiveReviews(app, json)))
}

const shouldFetchReviews = (state, app) => {
  const reviews = state.reviewsByApp[app]
  if (!reviews) {
    return true
  }
  if (reviews.isFetching) {
    return false
  }
  return reviews.didInvalidate
}

// A thunk action creator.
export const fetchReviewsIfNeeded = (app) => (dispatch, getState) => {
  if (shouldFetchReviews(getState(), app)) {
    return dispatch(fetchReviews(app))
  }
}
