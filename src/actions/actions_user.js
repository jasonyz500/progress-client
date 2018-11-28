import axios from 'axios';
import { ROOT_URL, getConfig } from './utils';

export const GET_PROFILE = 'get_profile';

export function getProfile() {
  const request = axios.get(`${ROOT_URL}/users/profile`, getConfig());

  return {
    type: GET_PROFILE,
    payload: request
  }
}