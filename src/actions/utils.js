export const ROOT_URL = process.env.API_URL;

export function getConfig() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${localStorage.getItem('auth_token')}`
    }
  }
}