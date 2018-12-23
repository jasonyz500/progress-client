import { GET_PROFILE } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PROFILE:
    	localStorage.setItem('is_encryption_enabled', action.payload.data.is_encryption_enabled);
      return action.payload.data;
    default:
      return state;
  }
}