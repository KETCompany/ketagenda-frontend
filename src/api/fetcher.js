const get = (url) => fetch(url, {
  headers: {
    Authorization: `bearer ${sessionStorage.getItem('jwtToken')}`
  }
});

export default {
  get,
}