import _ from 'lodash';
import { FETCH_ENTRIES_DAILY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ENTRIES_DAILY:
      console.log(action.payload.data);
      return state;
    default:
      return state;
  }
}