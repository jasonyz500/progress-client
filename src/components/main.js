import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/';
import Weekly from './weekly/';
import Monthly from './monthly/';
import Yearly from './yearly/';
import EditWeeklyUpdates from './edit/edit_weekly_updates';
import EditDailyEntry from './edit/edit_daily_entry';
import SlackIntegrationRedirect from './profile/slack_integration_redirect';
import Profile from './profile';
import PasswordReset from './login/password_reset';
import PasswordResetDone from './login/password_reset_done';
import PasswordResetToken from './login/password_reset_token';

const Main = () => ( // todo: add validation for edit/weekly/:weekStr param
  <div>
    <Switch>
      <Route exact path='/' component={Weekly}/>
      <Route path='/weekly/:weekStr?' component={Weekly}/>
      <Route path='/monthly/:monthStr?' component={Monthly}/>
      <Route path='/yearly/:yearStr?' component={Yearly}/>
      <Route path='/login' component={Login}/>
      <Route path='/edit/weekly/:weekStr' component={EditWeeklyUpdates}/>
      <Route path='/edit/daily/:dateStr' component={EditDailyEntry}/>
      <Route path='/profile/slack_redirect' component={SlackIntegrationRedirect}/>
      <Route path='/profile' component={Profile}/>
      <Route path='/password_reset/done' component={PasswordResetDone}/>
      <Route path='/password_reset/token/:token' component={PasswordResetToken}/>
      <Route path='/password_reset' component={PasswordReset}/>
    </Switch>
  </div>
)

export default Main;