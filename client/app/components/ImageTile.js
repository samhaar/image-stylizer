import React from 'react';

const ImageTile = ({ src, size, id, idx, setContent, setStyle, deleteImg }) => (
  <div style={{display: 'inline-block'}}>
    <img src={src}></img>
    <div>
      <button onClick={() => setContent({ src, size })}>content</button>
      <button onClick={() => setStyle({ src, size })}>style</button>
      <button>download</button>
      <button onClick={() => deleteImg(id, idx)}>delete</button>
    </div>
  </div>
);

export default ImageTile;
// 