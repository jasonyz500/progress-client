import React, { Component } from 'react';
import { Container } from 'gestalt';
import { Navigation, UnauthNavigation } from './navigation';
import Main from './main';
import AuthService from './auth-service';

const authService = new AuthService();

class App extends Component {
  render() {
    const navTag = authService.isLoggedIn() ? <Navigation /> : <UnauthNavigation />
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
        { navTag }
        <Container>
          <Main />
        </Container>
      </div>
    );
  }
}

export default App;
