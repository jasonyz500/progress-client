import { combineReducers } from 'redux';
import DailyEntriesReducer from './reducer_entries_daily';
import WeeklyEntriesReducer from './reducer_entries_weekly';
import TagsReducer from './reducer_tags';

const rootReducer = combineReducers({
  daily_entries: DailyEntriesReducer,
  weekly_entries: WeeklyEntriesReducer,
  tags: TagsReducer
});

export default rootReducer;
