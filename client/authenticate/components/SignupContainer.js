import React, { Component } from 'react';
import SignupDisplay from './SignupDisplay';

const getInitialState = () => {
  return {
    username: '',
    passwordOne: '',
    passwordTwo: '',
    passwordsMatch: false,
    enableSignup: false,
    duplicateEntry: false,
  };
};

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();

    this.switchToLogin = props.switchToLogin;
    this.usernameRef = React.createRef();

    this.focusUsername = this.focusUsername.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePasswordOne = this.handlePasswordOne.bind(this);
    this.handlePasswordTwo = this.handlePasswordTwo.bind(this);
    this.signup = this.signup.bind(this);
  }

  focusUsername() {
    this.usernameRef.current.focus();
  }

  handleUsername(e) {
    const username = e.target.value;
    if (username.includes(' ')
      || username.length > 16
    ) return;

    const newState = {};
    newState.enableSignup = this.state.passwordsMatch && username;
    if (this.state.duplicateEntry) newState.duplicateEntry = false;
    newState.username = username;
    this.setState(newState);
  }

  handlePasswordOne(e) {
    const passwordOne = e.target.value;
    if (passwordOne.length > 16) return;

    const newState = {};
    if (passwordOne && this.state.passwordTwo){
      newState.passwordsMatch = passwordOne === this.state.passwordTwo;
    } else {
      newState.passwordsMatch = false;
    }
    newState.enableSignup = newState.passwordsMatch && this.state.username;
    if (this.state.duplicateEntry) newState.duplicateEntry = false;
    newState.passwordOne = passwordOne;
    this.setState(newState);
  }

  handlePasswordTwo(e) {
    const passwordTwo = e.target.value;
    if (passwordTwo.length > 16) return;

    const newState = {};
    if (passwordTwo && this.state.passwordOne){
      newState.passwordsMatch = passwordTwo === this.state.passwordOne;
    } else {
      newState.passwordsMatch = false;
    }

    newState.passwordsMatch = passwordTwo === this.state.passwordOne;
    newState.enableSignup = newState.passwordsMatch && this.state.username;
    if (this.state.duplicateEntry) newState.duplicateEntry = false;
    newState.passwordTwo = passwordTwo;
    this.setState(newState);
  }

  signup() {
    const { username, passwordOne: password } = this.state;
    if (!username || !password) return;
    
    this.setState(getInitialState());
    this.focusUsername();
    fetch('/user/signup', {
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
        if (data.duplicateEntry) {
          this.setState({ duplicateEntry: true });
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.focusUsername();
  }

  render() {
    return (
      <SignupDisplay 
        duplicateEntry={this.state.duplicateEntry}
        usernameRef={this.usernameRef}
        username={this.state.username}
        handleUsername={this.handleUsername}
        passwordOne={this.state.passwordOne}
        passwordTwo={this.state.passwordTwo}
        handlePasswordOne={this.handlePasswordOne}
        handlePasswordTwo={this.handlePasswordTwo}
        passwordsMatch={this.state.passwordsMatch}
        enableSignup={this.state.enableSignup}
        signup={this.signup}
        switchToLogin={this.switchToLogin}
      />
    );
  }

}

export default SignupContainer;
