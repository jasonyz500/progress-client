// import _ from 'lodash';
import { FETCH_WEEK } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_WEEK:
      console.log(action.payload.data);
      return state;
    default:
      return state;
  }
}