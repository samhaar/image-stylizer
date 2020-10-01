/* eslint-disable */
import * as types from '../constants/actionTypes';

export const getUsername = () => (dispatch) => {
  fetch('/user')
    .then((res) => res.json())
    .then((res) => {
      if (res.redirected) window.location.href = res.url;
      return res;
    })
    .then(({ username }) => {
      dispatch({
        type: types.SET_USERNAME,
        payload: username,
      });
    })
    .catch(console.error);
};

export const logOut = () => {
  fetch('/user/logout', {
    method: 'POST'
  })
  .then((res) => {
    if (res.redirected) window.location.href = res.url;
  })
  .catch(console.error);
}