import arrToObj from '../utils/arrMapper';
import EventAPI from './EventAPI';
import UserAPI from './UserAPI';

import fetcher from './fetcher';

const url = 'http://localhost:8080/api';

export const list = async (query, select) => (
  fetcher.get(`${url}/groups?select=${select ? select.join(',') : ''}`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
);

export const get = async (id, populate) => (
  fetcher.get(`${url}/groups/${id}${populate ? '?populate' : ''}`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
);

export const filters = async query => (
  fetcher.get(`${url}/groups?filters${query}`)
    .then(resp => resp.json())
    .then(({ locations, floors, types }) => {
      return {
        locations: arrToObj(locations),
        floors: arrToObj(floors),
        types: types.map(type => ({ label: type })),
      };
    })
);

export const deleteById = async (id) => (
  fetcher.post(`${url}/groups/${id}`, { method: 'DELETE' })
    .then(resp => resp.json())
);

export const initForm = async () => (
  Promise.all([
    EventAPI.list(null, ['name', 'id']),
    UserAPI.listUsers(null, ['name', 'id'])
  ]).then(([events, users]) => ({ events, users }))
);

export const post = async postData => (
  fetcher.post(`${url}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .catch(err => console.log(err))
);

export const put = async (postData, id) => (
  fetcher.post(`${url}/groups/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .catch(err => console.log(err))
);


export default {
  list,
  get,
  filters,
  post,
  put,
  deleteById,
};
