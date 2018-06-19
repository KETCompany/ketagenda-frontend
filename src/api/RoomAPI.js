import arrToObj from '../utils/arrMapper';
import fetcher from './fetcher';

const { apiUrl } = require('../config');
const url = `${apiUrl}/api`;

export const list = async query =>
  fetcher.get(`${url}/rooms${query}`);

export const get = async (id, populate) => 
  fetcher.get(`${url}/rooms/${id}${populate ? '?populate' : ''}`);

export const filters = async query => (
  fetcher.get(`${url}/rooms?filters${query}`)
    .then(({ locations, floors, types }) => {
      return {
        locations: arrToObj(locations),
        floors: arrToObj(floors),
        types: types.map(type => ({ label: type })),
      };
    })
)

export const initForm = async () => (
  Promise.all([

  ])
)

export const post = async postData => (
  fetcher.post(`${url}/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
)

export const put = async (postData, id) => (
  fetcher.post(`${url}/rooms/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
)

export default {
  list, get, filters, post, put,
}