import axios from 'axios';


// const baseURL = 'http://localhost:8000/api/';
const baseURL = 'https://api-tweatter.herokuapp.com/api/'
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: localStorage.getItem('access_token')
      ? 'JWT' + localStorage.getItem('access_token')
      : null,
    accept: 'application/json', 'Content-Type': 'application/json;charset=UTF-8',
  }
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async function (error) {
    // get the response error
    const originalRequest = error.config;

    // error response is unauthorized
    if (
      error.response.status === 401
      && originalRequest.url == baseURL + 'token/refresh/'
    ) {
      window.location.href = '/login/';
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid'
      && error.response.status === 401
      && error.response.statusText === 'Unauthorized'
      && error.response.data.detail === 'Given token not valid for any token type'
    ){
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        // get token expired time
        const expTokenTime = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in
        // while now() returns milliseconds
        const now = Math.ceil(Date.now() / 1000);

        // refresh token is not expired
        if (expTokenTime.exp > now) {
          return axiosInstance
            .post('token/refresh/', { refresh: refreshToken })
            .then((res) => {
              localStorage.setItem('access_token', res.data.access);
              localStorage.setItem('refresh_token', res.data.refresh);

              // set the new jwt token
              let newJWT = 'JWT ' + res.data.access;
              axiosInstance.defaults.headers['Authorization'] = newJWT;
              originalRequest.headers['Authorization'] = newJWT;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.error(err.response);
            });
        } else {
          alert('You must be logged in');

          // remote all related user in local-storage
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("username");
          localStorage.removeItem("avatar");
          localStorage.removeItem("isLogin");

          // set header auth to null, in order to
          // prevent user action after logout
          axiosInstance.defaults.headers["Authorization"] = null;
          originalRequest.headers['Authorization'] = null;
          window.location.href = '/login/';
        }
      } else {
        alert('Token not available');
        window.location.href = '/login/';
      }
    }

    // error response is undefined
    if (typeof error.response == 'undefined') {
      alert(
        'A server/network error occurred. ' +
        'Looks like CORS might be the problem. ' +
        'Sorry about this - we will get it fixed shortly.'
      );
      return Promise.reject(error);
    }

  // specific error handling done elsewhere
  return Promise.reject(error);
  }
);

export default axiosInstance;
