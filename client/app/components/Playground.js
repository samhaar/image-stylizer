import * as mi from '@magenta/image';
import React, { Component } from 'react';

const MyImage = ({ src, width, height, imageRef, onLoad }) => {
  return (
    <div>
      <img ref={imageRef} src={src} width={width} height={height} onLoad={onLoad}></img>
      {/* <a href={src} download="goat">CLICK TO DOWNLOAD</a> */}
    </div>
  );
};

const MyCanvas = ({ canvasRef, width, height }) => {
  return (
    <canvas ref={canvasRef} width={width} height={height}></canvas>
  );
}

// const getDataFromImgTag = (img) => {
//   const canvas = document.createElement('canvas');
//   canvas.width = img.width;
//   canvas.height = img.height;

//   const context = canvas.getContext('2d');
//   context.drawImage(img, 0, 0);
//   let dataUrl = canvas.toDataURL('image/png');
//   // dataUrl = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
//   console.log('from canvas', dataUrl);
//   return dataUrl;
// };


class Playground extends Component {
  constructor(){
    super();
    this.state = {
      // url: 'https://placegoat.com/330/380',
      url1: 'https://ichef.bbci.co.uk/news/320/cpsprodpb/C271/production/_98677794_gettyimages-486869012.jpg',
      url2: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/The_Scream.jpg/470px-The_Scream.jpg',
      src1: '',
      src2: '',
      width: '300',
      height: '800',
      context: null,
      topIsContent: true,
    };
    
    this.model = new mi.ArbitraryStyleTransferNetwork();

    this.contentImageRef = React.createRef();
    this.styleImageRef = React.createRef();
    this.canvasRef = React.createRef();
    
    this.handleFile = this.handleFile.bind(this);
    this.stylize = this.stylize.bind(this);
    this.swap = this.swap.bind(this);
    this.setCanvasHeight = this.setCanvasHeight.bind(this);
  }

  clearCanvas() {
    const ctx = this.state.context;
    const canvas = this.canvasRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  stylize() {
    const content = this.contentImageRef.current;
    const style = this.styleImageRef.current;
    const ctx = this.state.context;

    this.clearCanvas();
    this.model.stylize(content, style)
      .then((imageData) => {
        ctx.putImageData(imageData, 0, 0);
      })
  }

  componentDidMount() {

    this.model.initialize()
      .then(() => {
        // stylizeBtn.disabled = false;
        console.log('model initialized');
      });

    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    this.setState({ context });
  
    this.fetchImage('src1', this.state.url1);
    this.fetchImage('src2', this.state.url2);
  }

  fetchImage(sourceToSaveTo, url) {
    fetch(url)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const fr = new FileReader();
        fr.addEventListener('load', () => {
          const newState = {};
          newState[sourceToSaveTo] = fr.result;
          this.setState(newState);
          // console.log(sourceToSaveTo, fr.result);
        })
        // console.log('blob', blob);
        fr.readAsDataURL(blob);
      })
      .catch((err) => {
        console.log(err);
    })
  }

  swap(){
    let height = this.state.height;
    if (this.styleImageRef.current){
      height = this.styleImageRef.current.height;
    }
    this.setState({ 
      topIsContent: !this.state.topIsContent,
      height,
    });
  }

  handleFile(e) {
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.addEventListener('load', () => {
      this.setState({ src1: fr.result });
    })
    if (file) fr.readAsDataURL(file);
  }

  setCanvasHeight() {
    if (this.contentImageRef.current){
      const height = this.contentImageRef.current.height;
      this.setState({ height });
    }
  }

  render() {
    const tic = this.state.topIsContent;
    return (
      <div>
        {/* <MyImage src={this.state.url} imageRef={this.imageRef}/> */}
        <input type="file" onChange={this.handleFile}></input>
        <MyImage 
          src={this.state.src1} 
          width={this.state.width} 
          imageRef={tic ? this.contentImageRef : this.styleImageRef}
          onLoad={this.setCanvasHeight}
        />
        {tic && <p>CONTENT</p>}
        <MyImage 
          src={this.state.src2} 
          width={this.state.width} 
          imageRef={tic ? this.styleImageRef : this.contentImageRef}
          onLoad={this.setCanvasHeight}
        />
        {!tic && <p>CONTENT</p>}
        <button onClick={this.stylize}>STYLIZE</button>
        <button onClick={this.swap}>SWAP</button>
        <div>
          <MyCanvas canvasRef={this.canvasRef} width={this.state.width} height={this.state.height}/>
        </div>
      </div>
    );
  }

}

export default Playground;
