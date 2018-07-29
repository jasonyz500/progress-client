import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, FormControl, FormGroup, Navbar, Nav, NavItem } from 'react-bootstrap';
import AuthService from '../auth-service';
// import './navigation.css';

const authService = new AuthService();

export class UnauthNavigation extends Component {
  handleLogin() {
    alert('login');
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
            <FormControl type="text" placeholder="Email" />
            <FormControl type="password" placeholder="Password" />
            <Button type="submit">Log In</Button>
          </FormGroup>
        </Navbar.Form>
      </Navbar>
    );
  }
}