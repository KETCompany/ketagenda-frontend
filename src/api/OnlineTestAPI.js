
import fetcher from './fetcher';

const { apiUrl } = require('../config');
const url = `${apiUrl}/api`;

export const get = async () => (
  fetcher.get(`${url}/}`)
);

export default {
  get
}