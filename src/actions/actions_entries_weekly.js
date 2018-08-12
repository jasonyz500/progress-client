import axios from 'axios';

export const FETCH_WEEK = 'fetch_week';

const ROOT_URL = 'http://localhost:3000';

function getConfig() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${localStorage.getItem('auth_token')}`
    }
  }
}

export function fetchWeek(weekStr) {
  const request = axios.get(`${ROOT_URL}/weekly/${weekStr}`, getConfig());

  return {
    type: FETCH_WEEK,
    payload: request
  }
}