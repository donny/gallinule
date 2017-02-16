import React, { PropTypes } from 'react'
import Review from '../components/Review'
import styled from 'styled-components';

const ReviewsWrapper = styled.ul`
  list-style: none;
`

const Reviews = ({reviews}) => (
  <ReviewsWrapper>
    {reviews.map((review, i) =>
      <li key={i}><Review review={review} /></li>
    )}
  </ReviewsWrapper>
)

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
}

export default Reviews
