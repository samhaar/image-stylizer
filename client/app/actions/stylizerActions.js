/* eslint-disable */
import * as types from '../constants/actionTypes';

export const setContent = (imgObj) => {
  const { src, size } = imgObj;
  return {
    type: types.SET_CONTENT,
    payload: { src, size },
  };
}

export const setStyle = (imgObj) => {
  const { src, size } = imgObj;
  return {
    type: types.SET_STYLE,
    payload: { src, size },
  };
}

export const setStylizerSrc = (imgObj) => {
  const { src, size } = imgObj;
  return {
    type: types.SET_STYLIZER_SRC,
    payload: { src, size },
  };
}

export const setHeight = (height) => ({
  type: types.SET_HEIGHT,
  payload: height,
});

export const setStyleUrl = (url) => ({
  type: types.SET_STYLE_URL,
  payload: url,
})

export const setContentUrl = (url) => ({
  type: types.SET_CONTENT_URL,
  payload: url,
})

export const styleSwap = () => ({
  type: types.STYLE_SWAP,
});

export const enableStylizer = () => ({
  type: types.ENABLE_STYLIZER,
});

export const disableStylizer = () => ({
  type: types.DISABLE_STYLIZER,
});

export const loadFileToContent = (e) => (dispatch) => {
  const file = e.target.files[0];
  const { size } = file;
  const fr = new FileReader();
  fr.addEventListener('load', () => {
    dispatch(setContent({
      src: fr.result,
      size,
    }));
  })
  if (file) fr.readAsDataURL(file);
}

export const loadFileToStyle = (e) => (dispatch) => {
  const file = e.target.files[0];
  const { size } = file;
  const fr = new FileReader();
  fr.addEventListener('load', () => {
    dispatch(setStyle({
      src: fr.result,
      size,
    }));
  })
  if (file) fr.readAsDataURL(file);
}

export const loadUrlToContent = () => (dispatch, getState) => {
  const url = getState().stylizer.contentUrlInputValue;
  dispatch({
    type: types.SET_CONTENT_URL,
    payload: '',
  })
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const { size } = blob;
      const fr = new FileReader();
      fr.addEventListener('load', () => {
        dispatch(setContent({
          src: fr.result,
          size,
        }));
      });
      fr.readAsDataURL(blob);
    })
  .catch(console.error);
};

export const loadUrlToStyle = () => (dispatch, getState) => {
  const url = getState().stylizer.styleUrlInputValue;
  dispatch({
    type: types.SET_STYLE_URL,
    payload: '',
  })
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const { size } = blob;
      const fr = new FileReader();
      fr.addEventListener('load', () => {
        dispatch(setStyle({
          src: fr.result,
          size,
        }));
      });
      fr.readAsDataURL(blob);
    })
  .catch(console.error);
};

export const setContext = (context) => ({
  type: types.SET_CONTEXT,
  payload: context,
});

