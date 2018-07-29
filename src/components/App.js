import React, { Component } from 'react';
import { Container } from 'gestalt';
import Main from './main';
import Login from './login/';
import AuthService from './auth-service';

const authService = new AuthService();

class App extends Component {
  render() {
    let mainTag;
    if (authService.isLoggedIn()) {
      mainTag = <Main />;
    } else {
      mainTag = <Login />;
    }
    return (
      <div>
        <link rel="stylesheet" href="https://unpkg.com/gestalt@0.76.1/dist/gestalt.css" />
        <Container>
          {mainTag}
        </Container>
      </div>
    );
  }
}

export default App;
