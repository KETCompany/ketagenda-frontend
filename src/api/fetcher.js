const get = (url) => fetch(url, {
  headers: {
    Authorization: `bearer ${sessionStorage.getItem('jwtToken')}`
  }
});

const post = (url, options) => fetch(url, {
  ...options,
  headers: {
    ...options.headers,
    Authorization: `bearer ${sessionStorage.getItem('jwtToken')}`
  }
})

export default {
  get,
  post,
}