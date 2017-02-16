import React, { PropTypes } from 'react'
import styled from 'styled-components';
import A from '../components/A'

const ReviewWrapper = styled.div`
  padding: 6px;
`

const Review = ({review}) => (
  <ReviewWrapper>
    <p>
    <strong><span>{review.title.label} &middot; {review['im:rating'].label} stars</span></strong><br/>
    <A href="{review.author.uri.label}">{review.author.name.label}</A> &middot; <em>version:</em> {review['im:version'].label}<br/>
    {review.content.label}
    </p>
  </ReviewWrapper>
)

Review.propTypes = {
  review: PropTypes.object.isRequired
}

export default Review
