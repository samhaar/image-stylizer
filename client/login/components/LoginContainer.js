import React, { Component } from 'react';
import LoginDisplay from './LoginDisplay';

class Login extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.usernameRef = React.createRef();

    this.handlePw = this.handlePw.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.logIn = this.logIn.bind(this);
    this.focusUsername = this.focusUsername.bind(this);
    this.switchToSignup = this.switchToSignup.bind(this);
    this.switchToLogin = this.switchToLogin.bind(this);
  }

  getInitialState() {
    return {
      username: '',
      password: '',
      enableButton: false,
      loginFailure: false,
      inSignup: false,
    }
  }

  focusUsername() {
    this.usernameRef.current.focus();
  }

  handlePw(e) {
    const password = e.target.value;
    if (password.length > 16) return;

    const newState = {};
    newState.enableButton = password && this.state.username;
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
    newState.enableButton = username && this.state.password;
    if (this.state.loginFailure) newState.loginFailure = false;
    newState.username = username;
    this.setState(newState);
  }

  logIn() {
    const { username, password } = this.state;
    this.setState(this.getInitialState());
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

  switchToSignup() {
    this.setState({ inSignup: true });
  }

  switchToLogin() {
    this.setState({ inSignup: false });
  }

  componentDidMount() {
    this.focusUsername();
  }

  render() {
    return (
      <div>
        <LoginDisplay
          loginFailure={this.state.loginFailure}
          usernameRef={this.usernameRef}
          username={this.state.username}
          handleUsername={this.handleUsername}
          password={this.state.password}
          handlePw={this.handlePw}
          enableButton={this.state.enableButton}
          logIn={this.logIn}
          switchToSignup={this.switchToSignup}
        />
        {this.state.inSignup ? <h1>SIGN UP HERE DAWG</h1> : null}
      </div>
    );
  }
}

export default Login;