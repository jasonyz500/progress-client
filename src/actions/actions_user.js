import axios from 'axios';
// import { SubmissionError } from 'redux-form';
import { ROOT_URL, getConfig } from './utils';

export const GET_PROFILE = 'get_profile';
export const EDIT_PASSWORD = 'edit_password';
export const ADD_SLACK_IDS = 'add_slack_ids';

export function getProfile() {
  const request = axios.get(`${ROOT_URL}/users/profile`, getConfig());

  return {
    type: GET_PROFILE,
    payload: request
  }
}

export function editPassword(currentPassword, newPassword, callback) {
  const url = `${ROOT_URL}/auth/change_password`;
  const request = axios.post(url, { currentPassword, newPassword }, getConfig())
                       .then((resp) => callback(resp))
                       .catch((err) => alert('Failed to change password. Please verify your current password and try again.'));

  return {
    type: EDIT_PASSWORD,
    payload: request
  }
}

export function addSlackIds(userId, teamId, callback) {
  const url = `${ROOT_URL}/slack/ids`;
  const request = axios.post(url, { userId, teamId }, getConfig())
                       .then((resp) => callback(resp));

  return {
    type: ADD_SLACK_IDS,
    payload: request
  }
}