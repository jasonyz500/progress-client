import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AuthService from '../auth-service';
// import './navigation.css';

const authService = new AuthService();

class Navigation extends Component {
  handleLogout() {
    authService.logout();
    window.location.reload();
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>nozomy</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav bsStyle="pills">
          <NavItem href='/weekly'>Weekly</NavItem>
          <NavItem href='/monthly'>Monthly</NavItem>
          <NavItem href='/yearly'>Yearly</NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown title={authService.getProfile().name || ''} id="user-dropdown">
            <MenuItem>Profile</MenuItem>
            <MenuItem divider />
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
export default Navigation