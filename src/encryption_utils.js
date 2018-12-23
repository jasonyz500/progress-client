const crypto = require('crypto');
const ALGORITHM = 'aes192';

function shouldEncrypt() {
  return localStorage.getItem('is_encryption_enabled') === 'true';
}

export function encrypt(text) {
  if (!shouldEncrypt()) {
    return text;
  }
  const password = localStorage.getItem('encryption_key');
  const cipher = crypto.createCipher(ALGORITHM, password);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

export function encryptList(list) {
  const res = [];
  for (const text of list) {
    res.push(encrypt(text));
  }
  return res;
}

export function encryptUpdates(updates) {
  for (let i in updates) {
    updates[i].body = encrypt(updates[i].body);
    for (let j in updates[i].tags) {
      updates[i].tags[j].tag = encrypt(updates[i].tags[j].tag);
    }
  }
  return updates;
}

export function encryptEntry(entry) {
  entry.mood_reason = encrypt(entry.mood_reason);
  entry.updates = encryptUpdates(entry.updates);
  return entry;
}

export function decrypt(text) {
  if (!shouldEncrypt()) {
    return text;
  }
  const password = localStorage.getItem('encryption_key');
  const decipher = crypto.createDecipher(ALGORITHM, password);
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
}

export function decryptList(list) {
  const res = [];
  for (const text of list) {
    res.push(decrypt(text));
  }
  return res;
}