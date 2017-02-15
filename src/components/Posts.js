import React, { PropTypes } from 'react'

const Posts = ({reviews}) => (
  <ul>
    {reviews.map((review, i) =>
      <li key={i}>{review.author.name.label} : {review.title.label} : {review.content.label}</li>
    )}
  </ul>
)

Posts.propTypes = {
  reviews: PropTypes.array.isRequired
}

export default Posts
