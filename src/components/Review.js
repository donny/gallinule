import React, { PropTypes } from 'react'

const Review = ({review}) => (
  <div>
    {review.author.name.label} : {review.title.label} : {review.content.label}
  </div>
)

Review.propTypes = {
  review: PropTypes.object.isRequired
}

export default Review
