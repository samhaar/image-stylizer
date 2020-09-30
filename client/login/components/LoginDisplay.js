import React, { Component } from 'react';

const LoginDisplay = (props) => {
  const { 
    loginFailure,
    usernameRef,
    username,
    handleUsername,
    password,
    handlePw,
    enableButton,
    logIn,
    switchToSignup,
  } = props;

  return (
    <div>
      {loginFailure ? <h3 key='failed'>LOGIN FAILED, sawwy</h3> : null}
      <label htmlFor="username">Username</label>
      <input 
        type='text' 
        id='username'
        ref={usernameRef}
        value={username}
        onChange={handleUsername}
      ></input>
      <label htmlFor="password">Password</label>
      <input 
        type='password' 
        id='password' 
        value={password} 
        onChange={handlePw}
        onKeyDown={(e) => { 
          if (e.key === 'Enter') logIn();
        }}
      ></input>
      <button 
        disabled={!enableButton}
        onClick={logIn}
      >Log In</button>
      <button
        onClick={switchToSignup}
      >SIGN UP!</button>
    </div>
  );
}

export default LoginDisplay;