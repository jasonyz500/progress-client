import _ from 'lodash';
import { FETCH_ENTRIES_DAILY, CREATE_ENTRY_DAILY, UPDATE_ENTRY_DAILY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ENTRIES_DAILY:
      /*
      format should be:
      {
        'date': {
          id: x,
          date: xxxx-xx-xx, (redundant but useful)
          mood_score: x,
          mood_reason: x,
          updates: [
            {
              id: x,
              body: x,
              tags: [{ id: x, tag: x }, {...}]
            }, {...}
          ]  
        }
      }
      */
      // result should be sorted from server, but sort again in case it's not
      const rows = _.sortBy(action.payload.data, ['date_string', 'updateid', 'tag']);
      // first build a map of updates by going through rows and adding tags
      const updates = {};
      for (let row of rows) {
        if (!_.has(updates, row.updateid)) {
          const update = {
            id: row.updateid,
            body: row.body,
            tags: []
          };
          if (row.tagid && row.tag) {
            update.tags.push({ id: row.tagid, tag: row.tag });
          }
          updates[row.updateid] = update;
        } else {
          updates[row.updateid].tags.push({ id: row.tagid, tag: row.tag });
        }
      }
      // next go through rows to get entries and add updates which we just mapped
      // using updateid
      const res = {};
      for (let row of rows) {
        if (!_.has(res, row.date_string)) {
          res[row.date_string] = {
            id: row.entryid,
            date_string: row.date_string, // redundant but useful
            mood_score: row.mood_score,
            mood_reason: row.mood_reason,
            updates: {}
          };
        }
        res[row.date_string].updates[row.updateid] = updates[row.updateid];
      }
      // finally transform updates map to array
      for (let key in res) {
        res[key].updates = _.values(res[key].updates);
      }
      // need to create a deep clone because _.assign mutates state
      // mutating state prevents components from auto-rerendering
      return _.assign(_.cloneDeep(state), res);
    case CREATE_ENTRY_DAILY:
    case UPDATE_ENTRY_DAILY:
      // edit state to include new entry
      return state;
    default:
      return state;
  }
}