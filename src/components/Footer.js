import React, { Component } from 'react';
import styled from 'styled-components';
import A from '../components/A'

const FooterWrapper = styled.div`
  text-align: center;
  height: 40px;
  padding: 20px;
  color: slategray;
`

class Footer extends Component {
  render() {
    return (
      <FooterWrapper>
        <p>
          made with <A href="https://facebook.github.io/react/">react</A>, { }
          <A href="http://redux.js.org/">redux</A>, and { }
          <A href="https://styled-components.com">styled-components</A>
        </p>
      </FooterWrapper>
    );
  }
}

export default Footer;
