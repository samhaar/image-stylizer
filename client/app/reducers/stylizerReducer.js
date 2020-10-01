/* eslint-disable */
import * as types from '../constants/actionTypes';

const initialState = {
  content: {
    src: '',
    size: 0,
  },
  style: {
    src: '',
    size: 0,
  },
  stylizer: {
    src: '',
    size: 0,
  },
  stylizerEnabled: false,
  contentUrlInputValue: '',
  styleUrlInputValue: '',
}

const stylizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    
    case types.SET_STYLE:
      return {
        ...state,
        style: action.payload,
      };
    
    case types.SET_STYLE_URL:
      return {
        ...state,
        styleUrlInputValue: action.payload,
      }

    case types.SET_CONTENT_URL:
      return {
        ...state,
        contentUrlInputValue: action.payload,
      }

    case types.ENABLE_STYLIZER:
      return {
        ...state,
        stylizerEnabled: true,
      };

    case types.DISABLE_STYLIZER:
      return {
        ...state,
        stylizerEnabled: false,
      };

    case types.STYLE_SWAP:
      return {
        ...state,
        content: state.style,
        style: state.content,
      };
    
    default:
      return state;
  }
}

export default stylizerReducer;
