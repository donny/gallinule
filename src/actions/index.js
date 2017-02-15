export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const selectReddit = (reddit) => ({
  type: SELECT_REDDIT,
  reddit
})

export const invalidateReddit = (reddit) => ({
  type: INVALIDATE_REDDIT,
  reddit
})

export const requestPosts = (reddit) => ({
  type: REQUEST_POSTS,
  reddit
})

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.feed.entry
    .filter((entry, index) => index !== 0)
    .map(child => child),
  receivedAt: Date.now()
})

// A thunk action creator.
const fetchPosts = (reddit) => (dispatch) => {
  dispatch(requestPosts(reddit))
  return fetch(`https://itunes.apple.com/au/rss/customerreviews/id=${reddit}/sortBy=mostRecent/json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
}

const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

// A thunk action creator.
export const fetchPostsIfNeeded = (reddit) => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit))
  }
}
