import { combineReducers } from 'redux';
import EntriesReducer from './reducer_entries';
import WeeksReducer from './reducer_weeks';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  entries: EntriesReducer,
  weeks: WeeksReducer,
  form: formReducer
});

export default rootReducer;
