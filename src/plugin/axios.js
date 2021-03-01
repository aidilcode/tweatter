import axios from 'axios';


const baseURL = 'https://tweatter-api.herokuapp.com/api/';
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: localStorage.getItem('access_token')
      ? 'JWT' + localStorage.getItem('access_token')
      : null,
    accept: 'application/json',
    "Content-Type": "application/json;charset=UTF-8",
  }
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async function (error) {
    // get the response error
    const originalRequest = error.config;

    // response error is undifined
    if (typeof error.response === 'undefined') {
      alert(
        'A server/network error occurred. ' +
        'Looks like CORS might be the problem. ' +
        'Sorry about this - we will get it fixed shortly.'
      );
      return Promise.reject(error);
    }

    // response error is unauthorized
    if (
        error.response.status === 401
        && originalRequest.url === baseURL + 'token/refresh/'
      ) {
      window.location.href = '/login/';
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid'
      && error.response.status === 401
      && error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        // get token expired time
        const expTokenTime = JSON.parse(atob(refreshToken.split('.')[1]));
        // exp date in token is expressed in
        // while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (expTokenTime.exp > now) {
          return axiosInstance
            .post('/token/refresh', {refresh: refreshToken})
            .then((res) => {
              localStorage.setItem('access_token', res.data.access);
              localStorage.setItem('refresh_token', res.data.refresh);

              axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + res.data.access;
              originalRequest.headers['Authorization'] =
                'JWT ' + res.data.access;

              return axiosInstance(originalRequest)
            })
            .catch((err) => {
              console.error(err)
            });
        } else { // token is expired
          alert('You must be logged in');
          window.location.href = '/login/';
        }
      } else {
        alert('Token not available');
        window.location.href = '/login/';
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
