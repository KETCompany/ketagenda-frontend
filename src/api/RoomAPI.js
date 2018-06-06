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
  fetch(`${url}/rooms/reservation`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
);