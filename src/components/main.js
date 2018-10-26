import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/';
import Weekly from './weekly/';
import Monthly from './monthly/';
import Yearly from './yearly/';
import EditWeeklyUpdates from './edit/edit_weekly_updates';
import EditDailyEntry from './edit/edit_daily_entry';

const Main = () => ( // todo: add validation for edit/weekly/:weekStr param
  <main>
    <Switch>
      <Route exact path='/' component={Weekly}/>
      <Route path='/weekly/:weekStr?' component={Weekly}/>
      <Route path='/monthly' component={Monthly}/>
      <Route path='/yearly' component={Yearly}/>
      <Route path='/login' component={Login}/>
      <Route path='/edit/weekly/:weekStr' component={EditWeeklyUpdates}/>
      <Route path='/edit/daily/:dateStr' component={EditDailyEntry}/>
    </Switch>
  </main>
)

export default Main;