import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Button, FormControl, FormGroup, Navbar } from 'react-bootstrap';
import AuthService from '../auth-service';
// import './navigation.css';

const authService = new AuthService();

class UnauthNavigation extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  async handleLogin() {
    const { email, password } = this.state;
    const res = await authService.login(email, password);
    if(res) {
      this.props.history.replace('/');
    } else {
      this.props.history.replace('/login');
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Progress</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form pullRight>
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
            <Button type="submit" onClick={this.handleLogin}>Log In</Button>
          </FormGroup>
        </Navbar.Form>
      </Navbar>
    );
  }
}

export default withRouter(UnauthNavigation);