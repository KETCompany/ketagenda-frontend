import arrToObj from '../utils/arrMapper';
import UserAPI from './UserAPI';
import RoomAPI from './RoomAPI';
import GroupAPI from './GroupAPI';
import fetcher from './fetcher';

const { apiUrl } = require('../config');
const url = `${apiUrl}/api`;

export const list = async (query, select, populate) => (
  fetcher.get(`${url}/events?select=${select ? select.join(',') : ''}${populate ? '&populate' : ''}`)
);

export const get = async (id, populate) => (
  fetcher.get(`${url}/events/${id}${populate ? '?populate' : ''}`)
);

export const filters = async query => (
  fetcher.get(`${url}/events?filters${query}`)
    .then(({ locations, floors, types }) => {
      return {
        locations: arrToObj(locations),
        floors: arrToObj(floors),
        types: types.map(type => ({ label: type })),
      };
    })
);

export const subscribe = async (postData, subscribed) => (
  fetcher.post(`${url}/events/subscribe`, {
    method: (subscribed ? 'DELETE' : 'POST'),
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
);

export const post = async postData => (
  fetcher.post(`${url}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
);

export const initForm = async () => (
  Promise.all([
    UserAPI.list('', ['name', 'id']),
    GroupAPI.list('', ['name', 'id']),
    RoomAPI.list('', ['name', 'id']),
  ]).then(([users, groups, room]) => ({ owner: users, groups, room }))
    
)

export const put = async (postData, id) => (
  fetcher.post(`${url}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
);

export default {
  list,
  put,
  post,
  get,
  filters,
  initForm,
}