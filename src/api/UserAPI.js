import arrToObj from '../utils/arrMapper';
import GroupAPI from './GroupAPI';
import fetcher from './fetcher';

const { apiUrl } = require('../config');
const url = `${apiUrl}/api`;

export const list = async query => (
  fetcher.get(`${url}/users${query}`)
);

export const listUsers = async () => (
  fetcher.get(`${url}/users`)
)

export const get = async (id, populate) => (
  fetcher.get(`${url}/users/${id}${populate ? '?populate' : ''}`)
);

export const deleteById = async id => (
  fetcher.post(`${url}/users/${id}`, { method: 'DELETE' })
);

export const filters = async query => (
  fetcher.get(`${url}/users?filters${query}`)
    .then(({ locations, floors, types }) => {
      return {
        locations: arrToObj(locations),
        floors: arrToObj(floors),
        types: types.map(type => ({ label: type })),
      };
    })
);

export const initForm = async () => (
  GroupAPI.list(null, ['name', 'id'])
    .then(groups => ({ groups }))
)

export const post = async postData => (
  fetcher.post(`${url}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
);

export const put = async (postData, id) => (
  fetcher.post(`${url}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
);

export const login = async code =>
  fetcher.get(`${apiUrl}/auth/google/callback${code}`)

export const profile = async () =>
  fetcher.get(`${url}/users/profile`)

export const updateProfile = async postData => (
  fetcher.post(`${url}/users/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
)

export default {
  list, get, deleteById, initForm, post, put, listUsers, login, profile, updateProfile,
};
