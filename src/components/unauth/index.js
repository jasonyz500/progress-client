import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Heading, Text } from 'gestalt';
import Login from '../login/';
import Signup from './signup';
import PasswordReset from '../login/password_reset';
import PasswordResetDone from '../login/password_reset_done';
import PasswordResetToken from '../login/password_reset_token';

class Unauth extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={UnauthSplash}/>
        <Route exact path='/signup' component={Signup}/>
        <Route path='/password_reset/done' component={PasswordResetDone}/>
        <Route path='/password_reset/token/:token' component={PasswordResetToken}/>
        <Route path='/password_reset' component={PasswordReset}/>
        <Route path='/' component={Login}/>
      </Switch>
    );
  }
}

export default Unauth;

class UnauthSplash extends Component {
  render() {
    return (
      <div>
        <Heading size="sm">Progress app is still in development.</Heading>
        <Text>If you've received early access, please proceed to our signup page <Link to="/signup">here.</Link></Text>
      </div>
    );
  }
}