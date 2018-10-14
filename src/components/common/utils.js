import moment from 'moment';

export function getDisplayTitle(weekStr) {
  const start = moment(weekStr);
  const end = moment(weekStr).add(4, 'days');
  const firstHalf = start.format('MMMM D');
  const secondHalf = start.month() === end.month() ? end.format('D') : end.format('MMMM D');
  return `${firstHalf} - ${secondHalf} (Week ${start.format('W')})`
}