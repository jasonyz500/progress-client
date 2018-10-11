import _ from 'lodash';
import { FETCH_UPDATES_WEEKLY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_UPDATES_WEEKLY:
      /*
      format should be:
      {
        'week_str': [{
          id: x,
          week_str: xxxx-xx-xx,
          body: x,
          tags: [{ id: x, tag: x }, {...}]
        }, {..}]
      }
      */
      // result should be sorted from server, but sort again in case it's not
      const rows = _.sortBy(action.payload.data, ['date_string', 'updateid', 'tag']);
      // copied from reducer_entries_daily. need to refactor the code sometime
      const updates = {};
      for (let row of rows) {
        if (!_.has(updates, row.updateid)) {
          const update = {
            id: row.updateid,
            date_string: row.date_string,
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
      const res = {};
      for (let update of _.values(updates)) {
        if (!_.has(res, update.date_string)) {
          res[update.date_string] = [];
        }
        res[update.date_string].push(update);
      }
      return _.assign(_.cloneDeep(state), res);
    default:
      return state;
  }
}