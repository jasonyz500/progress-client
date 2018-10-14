import axios from 'axios';
import { ROOT_URL, getConfig } from './utils';

export const FETCH_UPDATES_WEEKLY = 'fetch_updates_weekly';
export const POST_UPDATES_WEEKLY = 'post_updates_weekly';

export function fetchUpdatesWeekly(startDate, endDate) {
  let url = `${ROOT_URL}/updates/weekly?startDate=${startDate}&endDate=${endDate}`;
  const request = axios.get(url, getConfig());

  return {
    type: FETCH_UPDATES_WEEKLY,
    payload: request
  }
}

export function postUpdatesWeekly(weekStr, updates, callback) {
  let url = `${ROOT_URL}/updates/weekly/${weekStr}`;
  const request = axios.post(url, updates, getConfig()).then((resp) => callback());

  return {
    type: POST_UPDATES_WEEKLY,
    payload: request
  }
}