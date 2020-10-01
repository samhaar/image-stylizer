import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/stylizerActions';
import { addImg } from '../actions/libraryActions';
import ImageDisplay from '../components/ImageDisplay';

actions.addImg = addImg;

const mapStateToProps = ({
  stylizer: { 
    content,
    style,
    stylizer,
    stylizerEnabled,
    contentUrlInputValue,
    styleUrlInputValue,
   },
}) => ({
  content,
  style,
  stylizer,
  stylizerEnabled,
  contentUrlInputValue,
  styleUrlInputValue,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const Stylizer = (props) => {
  return (
    <div>
      <ImageDisplay src={props.content.src} />
      <ImageDisplay src={props.style.src} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Stylizer);