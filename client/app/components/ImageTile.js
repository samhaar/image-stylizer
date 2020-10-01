import React from 'react';

const ImageTile = ({ src, size, id, idx, setContent, setStyle, deleteImg, width }) => (
  <div style={{display: 'inline-block'}}>
    <img src={src} width={width}></img>
    <div>
      <button onClick={() => setContent({ src, size })}>set as content</button>
      <button onClick={() => setStyle({ src, size })}>set as style</button>
      <button><a href={src} download={true}>download</a></button>
      <button onClick={() => deleteImg(id, idx)}>delete</button>
    </div>
  </div>
);

export default ImageTile;