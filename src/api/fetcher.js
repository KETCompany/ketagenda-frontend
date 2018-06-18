const get = (url) => fetch(url, {
  headers: {
    Authorization: `bearer ${sessionStorage.getItem('jwtToken')}`
  }
})
  .then(response => {
    return response.json().then(data => {
      if (response.ok) {
        return data;
      } else {
        return Promise.reject({status: response.status, data});
      }
    });
  })
  .catch(error => console.log('error:', error));

const post = (url, options) => fetch(url, {
  ...options,
  headers: {
    ...options.headers,
    Authorization: `bearer ${sessionStorage.getItem('jwtToken')}`
  }
})
  .then(response => {
    return response.json().then(data => {
      if (response.ok) {
        return data;
      } else {
        return Promise.reject({status: response.status, data});
      }
    });
  })
  .catch(error => console.log('error:', error));

export default {
  get,
  post,
}