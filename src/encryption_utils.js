import { crypto } from 'crypto';
const ALGORITHM = 'aes192';

export function encrypt(text, key) {
  const password = localStorage.getItem('encryption_key');
  var cipher = crypto.createCipher(ALGORITHM, password);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function decrypt(text, key) {
  const password = localStorage.getItem('encryption_key');
  var decipher = crypto.createDecipher(ALGORITHM, password);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}