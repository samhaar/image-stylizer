import React from 'react';
import { render } from 'react-dom';
import AuthContainer from './components/AuthContainer';

// uncomment so that webpack can bundle styles
import styles from './scss/application.scss';

render(
  <AuthContainer />,
  document.getElementById('root')
);
