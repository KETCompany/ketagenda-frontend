import arrToObj from '../utils/arrMapper';
const url = 'http://localhost:8080/api';

export const list = async query => (
  fetch(`${url}/rooms${query}`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
);

export const get = async (id, populate) => (
  fetch(`${url}/rooms/${id}${populate ? '?populate' : ''}`)
    .then(resp => resp.json())
    .catch(err => console.error(err))
);

export const filters = async query => (
  fetch(`${url}/rooms?filters${query}`)
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
  fetch(`${url}/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .catch(err => console.log(err))
);

export const put = async (postData, id) => (
  fetch(`${url}/rooms/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .catch(err => console.log(err))
);
