import React from 'react';

const StylizerCanvas = ({ canvasRef, width, height, stylize, src, size, addImg }) => (
  <div style={{display: 'inline-block'}}>
    <canvas ref={canvasRef} width={width} height={height}></canvas>
    <div>
      <button onClick={stylize}>STYLIZE</button>
      <button onClick={() => {
        if (src && size) addImg({ src, size });
      }}>save</button>
      <button><a href={src} download={true}>download</a></button>
    </div>
  </div>
);

export default StylizerCanvas;