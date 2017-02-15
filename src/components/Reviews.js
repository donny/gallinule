import React, { PropTypes } from 'react'
import Review from '../components/Review'

const Reviews = ({reviews}) => (
  <ul>
    {reviews.map((review, i) =>
      <li key={i}><Review review={review} /></li>
    )}
  </ul>
)

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
}

export default Reviews
