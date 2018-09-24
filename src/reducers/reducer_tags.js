import _ from 'lodash';
import { GET_TAGS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_TAGS:
      return _.map(action.payload.data, (tag) => tag.tag);
    default:
      return state;
  }
}