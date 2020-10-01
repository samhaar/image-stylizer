/* eslint-disable */
import * as types from '../constants/actionTypes';

const initialState = {
  username: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      }

    default:
      return state;
  }
}

export default userReducer;
