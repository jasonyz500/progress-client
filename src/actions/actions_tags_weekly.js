import axios from 'axios';
import { ROOT_URL, getConfig } from './utils';

export const GET_WEEKLY_TAGS = 'get_weekly_tags';

export function getWeeklyTags(startDate, endDate) {
  const request = axios.get(`${ROOT_URL}/tags/weekly?startDate=${startDate}&endDate=${endDate}`, getConfig());

  return {
    type: GET_WEEKLY_TAGS,
    payload: request
  }
}