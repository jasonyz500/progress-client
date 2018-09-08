import _ from 'lodash';
import { FETCH_ENTRIES_DAILY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ENTRIES_DAILY:
      // result should be sorted from server, but sort again in case it's not
      const rows = _.sortBy(action.payload.data, ['date_string', 'updateid', 'tag']);
      // first build a map of updates by going through rows and adding tags
      const updates = {};
      for (let row of rows) {
        if (!_.has(updates, row.updateid)) {
          const update = {
            id: row.updateid,
            body: row.body,
            tags: [{
              id: row.tagid,
              tag: row.tag
            }]
          };
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
    default:
      return state;
  }
}