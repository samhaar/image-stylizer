import React from 'react';

const ImageDisplay = ({ src, size, width, addImg, imgRef, handleFile, swap, value, urlChange, urlSubmit }) => {

  return (
    <div className="ImageDisplay">
        {src 
          ? <img ref={imgRef} src={src} width={width}></img>
          : <div className='noImageText'><h1>Load an image!</h1></div>
        }
      <div className="stylizerButtons">
        <div>
          <input type="file" onChange={handleFile}></input>
        </div>
        <div>  
          <input 
            type="text" 
            width={width}
            value={value}
            placeholder="image URL"
            onChange={urlChange}
            onKeyDown={(e) => { 
              if (e.key === 'Enter') urlSubmit();
            }}
          ></input>
        </div>
        <div>
          <button onClick={swap}>swap</button>
          <button onClick={()=>addImg({ src, size })}>save</button>
          <button><a href={src} download={true}>download</a></button>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;