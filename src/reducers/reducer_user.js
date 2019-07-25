import { GET_PROFILE, ADD_SLACK_IDS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PROFILE:
      localStorage.setItem('is_encryption_enabled', action.payload.data.is_encryption_enabled);
      return action.payload.data;
    case ADD_SLACK_IDS:
      return { ...state, slack_userid: action.payload.data.slack_userid };
    default:
      return state;
  }
}