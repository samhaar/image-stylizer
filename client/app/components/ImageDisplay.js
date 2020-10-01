import React from 'react';

const ImageDisplay = ({ src, size, addImg, imgRef }) => (
  <div style={{display: 'inline-block'}}>
    <img ref={imgRef} src={src} ></img>
    <div>
      <button>load</button>
      <button onClick={()=>addImg({ src, size })}>save</button>
      <button><a href={src} download={true}>download</a></button>
    </div>
  </div>
);

export default ImageDisplay;