import React, { Component } from 'react';
import { Container } from 'gestalt';
import { Navigation } from './navigation/auth';
import UnauthNavigation from './navigation/unauth';
import Main from './main';
import EncryptionWrapper from './encryption-wrapper';
import Unauth from './unauth/';
import AuthService from './auth-service';

const authService = new AuthService();

class App extends Component {
  render() {
    const isLoggedIn = authService.isLoggedIn();
    const needsEncryptionInput = localStorage.getItem('is_encryption_enabled') === 'true' && !localStorage.getItem('encryption_key');
    const navTag = isLoggedIn ? <Navigation /> : <UnauthNavigation />
    const mainTag = isLoggedIn ? (needsEncryptionInput ? <EncryptionWrapper /> : <Main />) : <Unauth />
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
        { navTag }
        <Container>
          { mainTag }
        </Container>
      </div>
    );
  }
}

export default App;
