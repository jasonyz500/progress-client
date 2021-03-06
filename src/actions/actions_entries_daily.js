import axios from 'axios';
import { ROOT_URL, getConfig } from './utils';
import { encryptEntry } from '../encryption_utils';

export const FETCH_ENTRIES_DAILY = 'fetch_entries_daily';
export const FETCH_ENTRY_DAILY = 'fetch_entry_daily';
export const CREATE_ENTRY_DAILY = 'create_entry_daily';
export const UPDATE_ENTRY_DAILY = 'update_entry_daily';
export const DELETE_ENTRY_DAILY = 'delete_entry_daily';

export function fetchEntriesDaily(startDate, endDate) {
  let url = `${ROOT_URL}/entries/daily?startDate=${startDate}&endDate=${endDate}`;
  const request = axios.get(url, getConfig());

  return {
    type: FETCH_ENTRIES_DAILY,
    payload: request
  }
}

export function fetchEntry(_id) {
  const request = axios.get(`${ROOT_URL}/entries/daily/${_id}`, getConfig());

  return {
    type: FETCH_ENTRY_DAILY,
    payload: request
  }
}

export function createEntry(entry, callback) {
  entry = encryptEntry(entry);
  const request = axios.post(`${ROOT_URL}/entries/daily/new`, entry, getConfig()).then((resp) => callback());

  return {
    type: CREATE_ENTRY_DAILY,
    payload: request
  }
}

export function updateEntry(entry, callback) {
  entry = encryptEntry(entry);
  const request = axios.patch(`${ROOT_URL}/entries/daily/${entry.id}`, entry, getConfig()).then((resp) => callback());

  return {
    type: UPDATE_ENTRY_DAILY,
    payload: request
  }
}

export function deleteEntry(id, callback) {
  const request = axios.delete(`${ROOT_URL}/entries/daily/${id}`, getConfig()).then(() => callback());

  return {
    type: DELETE_ENTRY_DAILY,
    payload: request
  }
}
