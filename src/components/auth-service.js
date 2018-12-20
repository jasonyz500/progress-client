import decode from 'jwt-decode';
import axios from 'axios';
import _ from 'lodash';
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
      this.setLocalStorage(authToken);
      return true;
    } catch (error) {
      return false;
    }
  }

  async signup(data, encryptionKey) {
    try {
      const request = await axios.post(`${ROOT_URL}/users/new`, { data }, CONFIG);
      const authToken = request.data;
      this.setLocalStorage(authToken, encryptionKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  setLocalStorage(authToken, encryptionKey) {
    localStorage.setItem('auth_token', authToken);
    const decoded = decode(authToken);
    localStorage.setItem('email', decoded.email);
    localStorage.setItem('expires_at', decoded.exp);
    localStorage.setItem('is_encryption_enabled', decoded.is_encryption_enabled);
    if (encryptionKey) {
      localStorage.setItem('encryption_key', encryptionKey);
    }
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('is_encryption_enabled');
    localStorage.removeItem('encryption_key');
  }

  getProfile() {
    return _.assign(decode(localStorage.getItem('auth_token')), { 'encryption_key': localStorage.getItem('encryption_key') });
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