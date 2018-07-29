import _ from 'lodash';
import { FETCH_ALL, FETCH_ENTRIES_WITH_QUERY, FETCH_ENTRY, DELETE_ENTRY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL:
      return _.mapKeys(action.payload.data, '_id');
    case FETCH_ENTRIES_WITH_QUERY:
      return _.merge(state, _.mapKeys(action.payload.data, '_id'));
    case FETCH_ENTRY:
      return { ...state, [action.payload.data._id]: action.payload.data };
    case DELETE_ENTRY:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}