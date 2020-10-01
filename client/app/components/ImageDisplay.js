import React from 'react';

const ImageDisplay = ({ src }) => (
  <div style={{display: 'inline-block'}}>
    <img src={src}></img>
    <div>
      <button>save</button>
      <button>download</button>
      <button>load</button>
    </div>
  </div>
);

export default ImageDisplay;