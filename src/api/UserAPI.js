import arrToObj from '../utils/arrMapper';
import GroupAPI from './GroupAPI';
const url = 'http://localhost:8080/api';


export const list = async query => (
  fetch(`${url}/users${query}`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
);

export const listUsers = async () => (
  fetch(`${url}/users`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
)

export const get = async (id, populate) => (
  fetch(`${url}/users/${id}${populate ? '?populate' : ''}`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
);

export const deleteById = async (id) => (
  fetch(`${url}/users/${id}`, { method: 'DELETE' })
    .then(resp => resp.json())
);

export const filters = async query => (
  fetch(`${url}/users?filters${query}`)
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
  fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .catch(err => console.log(err))
);

export const put = async (postData, id) => (
  fetch(`${url}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .catch(err => console.log(err))
);

export default {
  list, get, deleteById, initForm, post, put, listUsers,
};
