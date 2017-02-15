import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectApp, fetchReviewsIfNeeded, invalidateApp } from '../actions'
import Header from '../components/Header'
import A from '../components/A'
import Picker from '../components/Picker'
import Reviews from '../components/Reviews'
import styled from 'styled-components';

const AppleApps = [ {name: 'Realestate', id:'404667893'},
                    {name: 'Domain', id:'319908646'} ]

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  min-height: 100%;
  padding: 0 16px;
`

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
      <AppWrapper>
        <Header>
          <Picker value={selectedApp}
                  onChange={this.handleChange}
                  options={AppleApps} />
          <p>
            {lastUpdated &&
              <span>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}
                {' - '}
              </span>
            }
            {!isFetching &&
              <A href="#"
                 onClick={this.handleRefreshClick}>
                Refresh
              </A>
            }
          </p>
        </Header>

        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Reviews reviews={reviews} />
            </div>
        }
      </AppWrapper>
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
