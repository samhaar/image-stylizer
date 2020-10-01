/* eslint-disable */
import * as types from '../constants/actionTypes';

export const loadLibrary = () => (dispatch) => {
  fetch('/api/images')
    .then((res) => res.json())
    .then((images) => {
      dispatch({
        type: types.LOAD_LIBRARY,
        payload: images,
      });
    })
    .catch((err) => console.error(err));
};

export const addImg = (imgObj) => (dispatch) =>  {

  fetch('/api/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: imgObj.src,
      size: imgObj.size,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if(data.id){
        return dispatch({
          type: types.ADD_IMG,
          payload: data,
        });
      }
    })
    .catch((err) => console.error(err));
};

export const deleteImg = (id, idx) => (dispatch) => {
  fetch('/api/images', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.sucess){
        return dispatch({
          type: types.DELETE_IMG,
          payload: idx,
        })
      }
    })
    .catch(err => console.err(err));
};