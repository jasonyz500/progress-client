import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import AuthService from '../auth-service';

const authService = new AuthService();

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillMount(){
    if (authService.isLoggedIn()) {
      this.props.history.replace('/');
    }
  }

  async handleLogin() {
    const { email, password } = this.state;
    const res = await authService.login(email, password);
    if(res) {
      this.props.history.replace('/');
    } else {
      this.setState({ error: 'Invalid Credentials. Please try again.' });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <div>
        <h2>Please log in to continue.</h2>
        <form>
          <FormGroup>
            <FormControl
              id="email"
              type="text"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <FormControl
              id="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange} 
            />
            <Button onClick={this.handleLogin}>Log In</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);