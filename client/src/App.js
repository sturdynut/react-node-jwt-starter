import React, { Component } from 'react';
import Login from './Login';
import Home from './Home';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isAuth: false,
      token: null
    }
  }
  onAuthSuccess = (token) => {
    this.setState({
      isAuth: true,
      token: token
    });
  }
  render() {
    const { isAuth, token } = this.state;
    return isAuth ? <Home token={token} /> : <Login onAuthSuccess={this.onAuthSuccess} />;
  }
}

export default App;
