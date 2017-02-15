import React, { PropTypes } from 'react'

const Reviews = ({reviews}) => (
  <ul>
    {reviews.map((review, i) =>
      <li key={i}>{review.author.name.label} : {review.title.label} : {review.content.label}</li>
    )}
  </ul>
)

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
}

export default Reviews
