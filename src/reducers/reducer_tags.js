import _ from 'lodash';
import { GET_TAGS } from '../actions';
import { decrypt } from '../encryption_utils';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_TAGS:
      return _.map(action.payload.data, (tag) => decrypt(tag.tag));
    default:
      return state;
  }
}