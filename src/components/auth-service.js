import decode from 'jwt-decode';
import axios from 'axios';
import { ROOT_URL } from '../actions/utils';

const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export default class AuthService {
  async login(email, password) {
    try {
      const request = await axios.post(`${ROOT_URL}/auth/login`, { email, password }, CONFIG);
      const authToken = request.data;
      localStorage.setItem('auth_token', authToken);
      localStorage.setItem('expires_at', decode(authToken).exp);
      return true;
    } catch (error) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expires_at');
  }

  getProfile() {
    return decode(localStorage.getItem('auth_token'));
  }

  isLoggedIn() {
    try {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at')) * 1000;
      return new Date().getTime() < expiresAt;
    } catch (error) {
      return false;
    }
  }

}