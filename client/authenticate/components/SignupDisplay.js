import React from 'react';

const SignupDisplay = (props) => {
  const { 
    duplicateEntry,
    usernameRef,
    username,
    handleUsername,
    passwordOne,
    passwordTwo,
    passwordsMatch,
    handlePasswordOne,
    handlePasswordTwo,
    enableSignup,
    signup,
    switchToLogin,
  } = props;

  return (
    <div>
       {duplicateEntry ? <h3 key='failed'>User Name already taken! sawwy</h3> : null}
      <label htmlFor="username">Username</label>
      <input 
        type='text' 
        id='username'
        ref={usernameRef}
        value={username}
        onChange={handleUsername}
        onKeyDown={(e) => { 
          if (e.key === 'Enter' && enableSignup) signup();
        }}
      ></input>
      <label htmlFor="passwordOne">Password</label>
      <input 
        type='password' 
        id='passwordOne' 
        value={passwordOne} 
        onChange={handlePasswordOne}
        onKeyDown={(e) => { 
          if (e.key === 'Enter' && enableSignup) signup();
        }}
      ></input>
      <label htmlFor="passwordTwo">Re-enter Password</label>
      <input 
        type='password' 
        id='passwordTwo' 
        value={passwordTwo} 
        onChange={handlePasswordTwo}
        onKeyDown={(e) => { 
          if (e.key === 'Enter' && enableSignup) signup();
        }}
      ></input>
      {passwordsMatch
        ? <span>√</span>
        : <span>Passwords must match</span>
      }
      <button 
        disabled={!enableSignup}
        onClick={signup}
      >Sign Up!</button>
      <button
        onClick={switchToLogin}
      >Back to Login</button>
    </div>
  );
};


export default SignupDisplay;