import React from 'react';
import { render } from 'react-dom';
import LoginContainer from './components/LoginContainer';

// uncomment so that webpack can bundle styles
// import styles from './scss/application.scss';

render(
  <LoginContainer />,
  document.getElementById('root')
);
