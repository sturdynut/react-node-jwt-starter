import React from 'react';
import './Login.css';
import auth from './auth';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }
  handleUserNameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }
  handleSubmit = () => {
    auth(this.state.username, this.state.password)
      .then(res => {
        console.log('login', res);
        this.props.onAuthSuccess(res.token);
      })
      .then(err => {
        console.log('login:err', err);
      })
  }
  render() {
    return (
      <div className='login-container'>
        <h1>Login</h1>
        <label>Username</label>
        <input type='text' onChange={this.handleUserNameChange} value={this.state.username} />
        <label>Password</label>
        <input type='password' onChange={this.handlePasswordChange} value={this.state.password} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Login