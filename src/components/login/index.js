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
      email_main: '',
      password_main: ''
    };
  }

  componentWillMount(){
    if (authService.isLoggedIn()) {
      this.props.history.replace('/');
    }
  }

  async handleLogin() {
    const email = this.state.email_main;
    const password = this.state.password_main;
    const res = await authService.login(email, password);
    if(res) {
      this.props.history.replace(this.props.location.pathname);
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
              id="email_main"
              type="text"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <FormControl
              id="password_main"
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