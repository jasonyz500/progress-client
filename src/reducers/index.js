import { combineReducers } from 'redux';
import DailyEntriesReducer from './reducer_entries_daily';
import WeeklyEntriesReducer from './reducer_entries_weekly';

const rootReducer = combineReducers({
  daily_entries: DailyEntriesReducer,
  weekly_entries: WeeklyEntriesReducer
});

export default rootReducer;
