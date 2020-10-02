import React from 'react';

const LoginDisplay = (props) => {
  const { 
    loginFailure,
    usernameRef,
    username,
    handleUsername,
    password,
    handlePassword,
    enableLoginButton,
    logIn,
    switchToSignup,
  } = props;

  return (
    <div id="login">
      {loginFailure ? <h3 key='failed'>LOGIN FAILED, sawwy</h3> : null}
      <label htmlFor="username">Username</label>
      <input 
        type='text' 
        id='username'
        ref={usernameRef}
        value={username}
        onChange={handleUsername}
        onKeyDown={(e) => { 
          if (e.key === 'Enter') logIn();
        }}
      ></input>
      <label htmlFor="password">Password</label>
      <input 
        type='password' 
        id='password' 
        value={password} 
        onChange={handlePassword}
        onKeyDown={(e) => { 
          if (e.key === 'Enter') logIn();
        }}
      ></input>
      <button 
        disabled={!enableLoginButton}
        onClick={logIn}
      >Log In</button>
      <button
        onClick={switchToSignup}
      >SIGN UP!</button>
    </div>
  );
}

export default LoginDisplay;