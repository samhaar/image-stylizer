/* eslint-disable */
import * as types from '../constants/actionTypes';

const handleLoadLibrary = (state, action) => {

  const imageList = action.payload.map((imgObj) => {
    return {
      ...imgObj,
      synced: true,
    };
  });

  return {
    ...state,
    imageList,
  };
}

const handleAddImg = (state, action) => {
  const { _id, src, size } = action.payload;
  const imageList = state.imageList.slice();
  imageList.push({
    _id,
    src,
    size,
  });

  return {
    ...state,
    imageList,
  };
}

const handleDeleteImg = (state, action) => {
  const idx = action.payload;
  const imageList = state.imageList.slice();
  imageList.splice(idx, 1);
  return {
    ...state,
    imageList,
  };
}

const initialState = {
  imageList: [],
}

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {  
    case types.LOAD_LIBRARY:
      return handleLoadLibrary(state, action);
    
    case types.ADD_IMG:
      return handleAddImg(state, action);
   
    case types.DELETE_IMG:
      return handleDeleteImg(state, action);
    
    default:
      return state;
  }
}

export default libraryReducer;
