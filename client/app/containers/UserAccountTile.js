import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/userActions';

const mapStateToProps = ({
  user: { username },
}) => ({
  username,
});

const mapDispatchToProps = (dispatch) => ({
  logOut,
});

const UserAccountTile = ({ username }) => (
  <div id="UserTile">
    <p>Welcome <strong>{username}</strong></p>
    <button onClick={logOut}>Log Out</button>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountTile);