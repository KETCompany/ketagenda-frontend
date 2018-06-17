import arrToObj from '../utils/arrMapper';
import GroupAPI from './GroupAPI';
import fetcher from './fetcher';

const url = 'http://localhost:8080/api';
const baseUrl = 'http://localhost:8080';




export const list = async query => (
  fetcher.get(`${url}/users${query}`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
);

export const listUsers = async () => (
  fetcher.get(`${url}/users`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
)

export const get = async (id, populate) => (
  fetcher.get(`${url}/users/${id}${populate ? '?populate' : ''}`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
);

export const deleteById = async (id) => (
  fetcher.post(`${url}/users/${id}`, { method: 'DELETE' })
    .then(resp => resp.json())
);

export const filters = async query => (
  fetcher.get(`${url}/users?filters${query}`)
    .then(resp => resp.json())
    .then(({ locations, floors, types }) => {
      return {
        locations: arrToObj(locations),
        floors: arrToObj(floors),
        types: types.map(type => ({ label: type })),
      };
    })
);

export const initForm = async => (
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
  }).then(res => res.json())
    .catch(err => console.log(err))
);

export const put = async (postData, id) => (
  fetcher.post(`${url}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .catch(err => console.log(err))
);

export const login = async (code) => (
  fetch(`${baseUrl}/auth/google/callback${code}`)
    .then(res => res.json())
);

export const profile = async () =>
  fetcher.get(`${baseUrl}/api/users/profile`)
  .then(res => res.json());

export default {
  list, get, deleteById, initForm, post, put, listUsers, login, profile,
};
