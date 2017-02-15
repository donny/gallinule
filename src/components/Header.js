import React, { Component } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  text-align: center;
  background-color: #222;
  height: 140px;
  padding: 20px;
  color: white;
`

class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <h1>Australian Property App Reviews</h1>
        {this.props.children}
      </HeaderWrapper>
    );
  }
}

export default Header;
