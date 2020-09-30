import React, { Component } from 'react';
import LoginDisplay from './LoginDisplay';

const getInitialState = () => {
  return {
    username: '',
    password: '',
    enableLoginButton: false,
    loginFailure: false,
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
    
    this.switchToSignup = props.switchToSignup;
    this.usernameRef = React.createRef();

    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.logIn = this.logIn.bind(this);
    this.focusUsername = this.focusUsername.bind(this);
  }

  focusUsername() {
    this.usernameRef.current.focus();
  }

  handlePassword(e) {
    const password = e.target.value;
    if (password.length > 16) return;

    const newState = {};
    newState.enableLoginButton = password && this.state.username;
    if (this.state.loginFailure) newState.loginFailure = false;
    newState.password = password;
    this.setState(newState);
  }

  handleUsername(e) {
    const username = e.target.value;
    if (username.includes(' ')
      || username.length > 16
    ) return;

    const newState = {};
    newState.enableLoginButton = username && this.state.password;
    if (this.state.loginFailure) newState.loginFailure = false;
    newState.username = username;
    this.setState(newState);
  }

  logIn() {
    const { username, password } = this.state;
    if (!username || !password) return;
    
    this.setState(getInitialState());
    this.focusUsername();
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.redirected) window.location.href = res.url;
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.loginFailure) {
          this.setState({ loginFailure: true });
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.focusUsername();
  }

  render() {
    return (
      <LoginDisplay
        loginFailure={this.state.loginFailure}
        usernameRef={this.usernameRef}
        username={this.state.username}
        handleUsername={this.handleUsername}
        password={this.state.password}
        handlePassword={this.handlePassword}
        enableLoginButton={this.state.enableLoginButton}
        logIn={this.logIn}
        switchToSignup={this.switchToSignup}
      />
    );
  }
}

export default Login;