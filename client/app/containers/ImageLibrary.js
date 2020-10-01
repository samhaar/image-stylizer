import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteImg } from '../actions/libraryActions';
import { setContent, setStyle } from '../actions/stylizerActions';
import ImageTile from '../components/ImageTile';

const mapStateToProps = ({
  library: { imageList },
}) => ({
  imageList,
});

const mapDispatchToProps = (dispatch) => ({
  deleteImg: (id, idx) => dispatch(deleteImg(id, idx)),
  setContent: (imgObj) => dispatch(setContent(imgObj)),
  setStyle: (imgObj) => dispatch(setStyle(imgObj)),
});

const ImageLibrary = ({ imageList, deleteImg, setContent, setStyle }) => {
  const imageTiles = imageList.map(({ src, size, _id }, idx) => {
    return (
      <ImageTile
        key={'libraryImage' + idx}
        src={src} 
        size={size}
        id={_id}
        idx={idx}
        deleteImg={deleteImg}
        setContent={setContent}
        setStyle={setStyle}
      />
    );
  })
  
  return (
    <div>
      {imageTiles}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageLibrary);