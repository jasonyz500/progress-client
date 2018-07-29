import _ from 'lodash';
import { FETCH_ENTRIES_WITH_QUERY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ENTRIES_WITH_QUERY:
      let res = Object.assign({}, state);
      _.each(action.payload.data, function(entry) {
        const weekStr = entry.week_string;
        if (!res[weekStr]) {
          res[weekStr] = {
            weekly: [],
            daily: []
          };
        }
        if (entry.is_weekly) {
          res[weekStr].weekly.push(entry._id);
        } else {
          res[weekStr].daily.push(entry._id);
        }
      });
      return res;
    default:
      return state;
  }
}