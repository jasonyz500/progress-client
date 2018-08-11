import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Heading } from 'gestalt';
import Login from '../login/';

class Unauth extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={UnauthSplash}/>
        <Route path='/' component={Login}/>
      </Switch>
    );
  }
}

export default Unauth;

class UnauthSplash extends Component {
  render() {
    return (
      <Heading>Some cool unauth splash page here.</Heading>
    );
  }
}