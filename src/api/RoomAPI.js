import arrToObj from '../utils/arrMapper';
import fetcher from './fetcher';

const url = 'http://localhost:8080/api';

export const list = async query => (
  fetcher.get(`${url}/rooms${query}`)
    .then(resp => resp.json())
).catch(err => console.error(err))

export const get = async (id, populate) => (
  fetcher.get(`${url}/rooms/${id}${populate ? '?populate' : ''}`)
    .then(resp => resp.json())
).catch(err => console.error(err))

export const filters = async query => (
  fetcher.get(`${url}/rooms?filters${query}`)
    .then(resp => resp.json())
    .then(({ locations, floors, types }) => {
      return {
        locations: arrToObj(locations),
        floors: arrToObj(floors),
        types: types.map(type => ({ label: type })),
      };
    })
).catch(err => console.error(err))

export const initForm = async () => (
  Promise.all([

  ])
).catch(err => console.error(err))

export const post = async postData => (
  fetcher.post(`${url}/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .catch(err => console.log(err))
).catch(err => console.error(err))

export const put = async (postData, id) => (
  fetcher.post(`${url}/rooms/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .catch(err => console.log(err))
).catch(err => console.error(err))

export default {
  list, get, filters, post, put,
}