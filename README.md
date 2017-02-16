# gallinule

Gallinule is a small [React](https://facebook.github.io/react/) app to browse iOS App Store reviews for popular Australian property apps.

### Background

This project is part of [52projects](https://donny.github.io/52projects/) and the new stuff that I learn through this project: [Redux](http://redux.js.org/) and [styled-components](https://styled-components.com).

This project builds on top of my React experience with [Dipper](https://github.com/donny/dipper). I learn to use Redux for state management and styled-components for styling.

### Project

Gallinule retrieves and displays iOS App Store reviews from Apple iTunes site. It has a very simple interface where a user can select an iOS Australian property app and Gallinule shows the user reviews for that particular app. The screenshot of Gallinule:

![Screenshot](https://raw.githubusercontent.com/donny/gallinule/master/screenshot.png)

### Implementation

Dipper is implemented using [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), and [styled-components](https://styled-components.com). It is deployed on [Netlify](https://www.netlify.com).

Instead of CSS, we use styled-components to provide styling for the React components. For example, this is how we style the web links:

```javascript
import styled from 'styled-components';

const A = styled.a`
  color: silver;

  &:hover {
    color: powderblue;
  }
`;

export default A;
```

And we can use the `A` component like this:

```javascript
import styled from 'styled-components';

class Footer extends Component {
  render() {
    return (
      <div>
        <A href="https://facebook.github.io/react/">React</A>
      </div>
    );
  }
}

export default Footer;
```

We use Redux for managing states in Gallinule with [`actions`](https://github.com/donny/gallinule/blob/master/src/actions/index.js) and [`reducers`](https://github.com/donny/gallinule/blob/master/src/reducers/index.js). Take a look at the main [`App.js`](https://github.com/donny/gallinule/blob/master/src/containers/App.js) (that is largely based on the Redux Async example) to see how they are used.

### Conclusion

...

References:

https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
https://gist.github.com/chantastic/fc9e3853464dffdb1e3c
