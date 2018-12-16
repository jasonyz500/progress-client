import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { ROOT_URL, getConfig } from './utils';

export const GET_PROFILE = 'get_profile';
export const EDIT_PASSWORD = 'edit_password';

export function getProfile() {
  const request = axios.get(`${ROOT_URL}/users/profile`, getConfig());

  return {
    type: GET_PROFILE,
    payload: request
  }
}

export function newUser() {
  
}

export function editPassword(currentPassword, newPassword, callback) {
  const url = `${ROOT_URL}/auth/change_password`;
  const request = axios.post(url, { currentPassword, newPassword }, getConfig())
                       .then((resp) => callback(resp))
                       .catch((err) => {
                         console.log(err);
                         throw new SubmissionError( {currentPassword: 'Incorrect Password', _error: 'Failed!' });
                       });

  return {
    type: EDIT_PASSWORD,
    payload: request
  }
}