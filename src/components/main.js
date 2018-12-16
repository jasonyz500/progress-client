import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/';
import Weekly from './weekly/';
import Monthly from './monthly/';
import Yearly from './yearly/';
import EditWeeklyUpdates from './edit/edit_weekly_updates';
import EditDailyEntry from './edit/edit_daily_entry';
import Profile from './profile';
import PasswordReset from './unauth/password_reset';

const Main = () => ( // todo: add validation for edit/weekly/:weekStr param
  <main>
    <Switch>
      <Route exact path='/' component={Weekly}/>
      <Route path='/weekly/:weekStr?' component={Weekly}/>
      <Route path='/monthly/:monthStr?' component={Monthly}/>
      <Route path='/yearly/:yearStr?' component={Yearly}/>
      <Route path='/login' component={Login}/>
      <Route path='/edit/weekly/:weekStr' component={EditWeeklyUpdates}/>
      <Route path='/edit/daily/:dateStr' component={EditDailyEntry}/>
      <Route path='/profile' component={Profile}/>
      <Route path='/password_reset' component={PasswordReset}/>
    </Switch>
  </main>
)

export default Main;