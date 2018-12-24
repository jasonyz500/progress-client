export const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://progress-svc.herokuapp.com' : 'localhost:3000';

export function getConfig() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${localStorage.getItem('auth_token')}`
    }
  }
}