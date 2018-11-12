import _ from 'lodash';
import { GET_WEEKLY_TAGS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_WEEKLY_TAGS:
      console.log(action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}