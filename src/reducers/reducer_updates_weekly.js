// import _ from 'lodash';
import { FETCH_UPDATES_WEEKLY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_UPDATES_WEEKLY:
      console.log(action.payload.data);
      return state;
    default:
      return state;
  }
}