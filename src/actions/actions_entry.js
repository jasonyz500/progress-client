import axios from 'axios';

export const FETCH_ALL = 'fetch_all';
export const FETCH_ENTRIES_WITH_QUERY = 'fetch_entries_with_query';
export const FETCH_ENTRY = 'fetch_entry';
export const CREATE_ENTRY = 'create_entry';
export const UPDATE_ENTRY = 'update_entry';
export const DELETE_ENTRY = 'delete_entry';
// export const FETCH_WEEK = 'fetch_week';

const ROOT_URL = 'http://localhost:3000';

function getConfig() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${localStorage.getItem('auth_token')}`
    }
  }
}

export function fetchAll() {
  const request = axios.get(`${ROOT_URL}/entries/all`, getConfig());

  return {
    type: FETCH_ALL,
    payload: request
  }
}

export function fetchEntriesWithQuery(startDate, endDate, isWeekly) {
  let url = `${ROOT_URL}/entries?start_date=${startDate}&end_date=${endDate}`;
  if (!(isWeekly == null)) {
    url = url + `&is_weekly=${isWeekly}`
  }
  const request = axios.get(url, getConfig());

  return {
    type: FETCH_ENTRIES_WITH_QUERY,
    payload: request
  }
}

export function fetchEntry(_id) {
  const request = axios.get(`${ROOT_URL}/entries/${_id}`, getConfig());

  return {
    type: FETCH_ENTRY,
    payload: request
  }
}

export function createEntry(entry, callback) {
  const request = axios.post(`${ROOT_URL}/entries/new`, entry, getConfig()).then((resp) => callback(resp.data));

  return {
    type: CREATE_ENTRY,
    payload: request
  }
}

export function updateEntry(entry, callback) {
  const request = axios.patch(`${ROOT_URL}/entries/${entry._id}`, entry, getConfig()).then((resp) => callback());

  return {
    type: UPDATE_ENTRY,
    payload: request
  }
}

export function deleteEntry(_id, callback) {
  const request = axios.delete(`${ROOT_URL}/entries/${_id}`, getConfig()).then(() => callback());

  return {
    type: DELETE_ENTRY,
    payload: request
  }
}
