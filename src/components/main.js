import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/';
import Weekly from './weekly/';
import Monthly from './monthly/';
import Yearly from './yearly/';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Weekly}/>
      <Route path='/weekly/:weekStr?' component={Weekly}/>
      <Route path='/monthly' component={Monthly}/>
      <Route path='/yearly' component={Yearly}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </main>
)

export default Main;