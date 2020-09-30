import React, { Component } from 'react';
import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';

class AuthContainer extends Component {
  constructor(){
    super();
    this.state = {
      inLogin: true,
    }

    this.switchToSignup = this.switchToSignup.bind(this);
    this.switchToLogin = this.switchToLogin.bind(this);
  }

  switchToSignup() {
    if (this.state.inLogin){
      this.setState({ inLogin: false });
    }
  }

  switchToLogin() {
    if (!this.state.inLogin){
      this.setState({ inLogin: true });
    }
  }

  render() {
    const inLogin = this.state.inLogin;
    return (
      <div>
        {inLogin
          ? <LoginContainer switchToSignup={this.switchToSignup}/>
          : <SignupContainer switchToLogin={this.switchToLogin}/> 
        }
      </div>
    );
  }

}

export default AuthContainer;