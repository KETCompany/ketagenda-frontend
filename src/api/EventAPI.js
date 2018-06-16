import arrToObj from '../utils/arrMapper';
import UserAPI from './UserAPI';
import RoomAPI from './RoomAPI';
import GroupAPI from './GroupAPI';
const url = 'http://localhost:8080/api';

export const list = async (query, select, populate) => (
  fetch(`${url}/events?select=${select ? select.join(',') : ''}${populate ? '&populate' : ''}`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
);

export const get = async (id, populate) => (
  fetch(`${url}/events/${id}${populate ? '?populate' : ''}`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
);

export const filters = async query => (
  fetch(`${url}/events?filters${query}`)
    .then(resp => resp.json())
    .then(({ locations, floors, types }) => {
      return {
        locations: arrToObj(locations),
        floors: arrToObj(floors),
        types: types.map(type => ({ label: type })),
      };
    })
);

export const post = async postData => (
  fetch(`${url}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .catch(err => console.log(err))
);

export const initForm = async () => (
  Promise.all([
    UserAPI.list('', ['name', 'id']),
    GroupAPI.list('', ['name', 'id']),
    RoomAPI.list('', ['name', 'id']),
  ]).then(([users, groups, rooms]) => ({ owner: users, groups, rooms }))
    
)

export const put = async (postData, id) => (
  fetch(`${url}/events/${id}`, {
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
  put,
  post,
  get,
  filters,
  initForm,
}