import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import DailyEntriesReducer from './reducer_entries_daily';
import WeeklyUpdatesReducer from './reducer_updates_weekly';
import TagsReducer from './reducer_tags';
import WeeklyTagsReducer from './reducer_weekly_tags';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
  form: formReducer,
  daily_entries: DailyEntriesReducer,
  weekly_updates: WeeklyUpdatesReducer,
  tags: TagsReducer,
  weekly_tags: WeeklyTagsReducer,
  user: UserReducer
});

export default rootReducer;
