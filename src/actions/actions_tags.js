import axios from 'axios';
import { ROOT_URL, getConfig } from './utils';

export const GET_TAGS = 'get_tags';

export function getTags() {
  const request = axios.get(`${ROOT_URL}/tags`, getConfig());

  return {
    type: GET_TAGS,
    payload: request
  }
}