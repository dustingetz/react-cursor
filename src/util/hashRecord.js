import hashString from './hashString';

export default function hashRecord(record) {
  return hashString(JSON.stringify(record));
}
