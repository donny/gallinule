import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectApp, fetchReviewsIfNeeded, invalidateApp } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    selectedApp: PropTypes.string.isRequired,
    reviews: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedApp } = this.props
    dispatch(fetchReviewsIfNeeded(selectedApp))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedApp !== this.props.selectedApp) {
      const { dispatch, selectedApp } = nextProps
      dispatch(fetchReviewsIfNeeded(selectedApp))
    }
  }

  handleChange = (nextApp) => {
    const { dispatch } = this.props
    dispatch(selectApp(nextApp))
  }

  handleRefreshClick = (e) => {
    e.preventDefault()

    const { dispatch, selectedApp } = this.props
    dispatch(invalidateApp(selectedApp))
    dispatch(fetchReviewsIfNeeded(selectedApp))
  }

  render() {
    const { selectedApp, reviews, isFetching, lastUpdated } = this.props
    const isEmpty = reviews.length === 0
    return (
      <div>
        <Picker value={selectedApp}
                onChange={this.handleChange}
                options={[ '404667893', '319908646' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts reviews={reviews} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { selectedApp, reviewsByApp } = state
  const {
    isFetching,
    lastUpdated,
    items: reviews
  } = reviewsByApp[selectedApp] || {
    isFetching: true,
    items: []
  }

  return {
    selectedApp,
    reviews,
    isFetching,
    lastUpdated
  }
}

// We omit `mapDispatchToProps` in `connect`.
// The default implementation just injects `dispatch` into our component’s props.
export default connect(mapStateToProps)(App)
