/* eslint-disable */
import * as types from '../constants/actionTypes';

export const getUsername = () => (dispatch) => {
  fetch('/user')
    .then((res) => res.json())
    .then(({ username }) => {
      dispatch({
        type: types.SET_USERNAME,
        payload: username,
      });
    })
    .catch(console.error);
};  