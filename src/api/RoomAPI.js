import arrToObj from '../utils/arrMapper';

export const list = async query => (
  fetch(`http://localhost:8080/api/rooms${query}`)
    .then(resp => resp.json())
);

export const get = async (id, populate) => (
  fetch(`http://localhost:8080/api/rooms/${id}${populate ? '?populate' : ''}`)
    .then(resp => resp.json())
);

export const filters = async query => (
  fetch(`http://localhost:8080/api/rooms?filters${query}`)
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
  fetch('http://localhost:8080/api/rooms/reservation', {
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