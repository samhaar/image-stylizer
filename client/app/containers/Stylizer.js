import React, { Component } from 'react';
import * as mi from '@magenta/image';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as stylizerActions from '../actions/stylizerActions';
import { addImg } from '../actions/libraryActions';
import ImageDisplay from '../components/ImageDisplay';
import StylizerCanvas from '../components/StylizerCanvas';
// import { render } from 'sass';

const mapStateToProps = ({ stylizer }) => ({ ...stylizer });

const actions = {
  ...stylizerActions,
  addImg,
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

class Stylizer extends Component {
  constructor(props){
    super(props);
    this.props = props;

    this.model = new mi.ArbitraryStyleTransferNetwork();
    this.stylize = this.stylize.bind(this);
  }

  componentDidMount(){
    this.model.initialize()
    .then(() => {
      this.props.enableStylizer();
    });

  const canvas = this.props.canvasRef.current;
  const context = canvas.getContext('2d');
  this.props.setContext(context);
  }

  clearCanvas() {
    const ctx = this.props.context;
    const canvas = this.props.canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  stylize() {
    const content = this.props.contentImageRef.current;
    const style = this.props.styleImageRef.current;
    const canvas = this.props.canvasRef.current;
    const ctx = this.props.context;

    this.clearCanvas();
    this.model.stylize(content, style)
      .then((imageData) => {
        ctx.putImageData(imageData, 0, 0);
        const src = canvas.toDataURL('image/png');
        const size = atob(src.substr(22)).length;
        this.props.setStylizerSrc({ src, size });
      })
  }

  componentDidUpdate(){
    const { height, contentImageRef, setHeight } = this.props;
    if (!contentImageRef.current) return;

    const contentHeight = contentImageRef.current.height
    if (height !== contentHeight){
      setHeight(contentHeight);
    }
  }


  render(){
    const {
      content,
      style,
      stylizer,
      width,
      height,
      contentImageRef,
      styleImageRef,
      canvasRef,
      addImg,
      loadFileToContent,
      loadFileToStyle,
      styleSwap,
      contentUrlInputValue,
      styleUrlInputValue,
      setContentUrl,
      setStyleUrl,
      loadUrlToContent,
      loadUrlToStyle,
      stylizerEnabled,
    } = this.props;

    return (
      <div className="StylizerWrapper">
        {/* CONTENT DISPLAY */}
        <ImageDisplay 
          imgRef={contentImageRef} 
          src={content.src}
          size={content.size}
          width={width} 
          height={height}
          addImg={addImg}
          handleFile={loadFileToContent}
          swap={styleSwap}
          value={contentUrlInputValue}
          urlChange={(e) => setContentUrl(e.target.value)}
          urlSubmit={loadUrlToContent}
        />
        {/* STYLE DISPLAY */}
        <ImageDisplay 
          imgRef={styleImageRef} 
          src={style.src}
          size={style.size}
          width={width} 
          height={height}
          addImg={addImg}
          handleFile={loadFileToStyle}
          swap={styleSwap}
          value={styleUrlInputValue}
          urlChange={(e) => setStyleUrl(e.target.value)}
          urlSubmit={loadUrlToStyle}
        />
        {/* STYLIZER CANVAS */}
        <StylizerCanvas 
          stylize={this.stylize}
          canvasRef={canvasRef} 
          src={stylizer.src}
          size={stylizer.size}
          width={width} 
          height={height} 
          addImg={addImg}
          stylizerEnabled={stylizerEnabled}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stylizer);