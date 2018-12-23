import { GET_WEEKLY_TAGS } from '../actions';
import { decryptList } from '../encryption_utils';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_WEEKLY_TAGS:
      const res = action.payload.data;
   	  for (let weekStr in res) {
        res[weekStr] = decryptList(res[weekStr]);
      }
      return res;
    default:
      return state;
  }
}