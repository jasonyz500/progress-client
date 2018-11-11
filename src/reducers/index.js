import { combineReducers } from 'redux';
import DailyEntriesReducer from './reducer_entries_daily';
import WeeklyUpdatesReducer from './reducer_updates_weekly';
import TagsReducer from './reducer_tags';
import WeeklyTagsReducer from './reduer_weekly_tags';

const rootReducer = combineReducers({
  daily_entries: DailyEntriesReducer,
  weekly_updates: WeeklyUpdatesReducer,
  tags: TagsReducer,
  weekly_tags: WeeklyTagsReducer
});

export default rootReducer;
