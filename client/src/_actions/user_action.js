import axios from 'axios';
import {AUTH_USER, LOGIN_USER, REGISTER_USER} from './types';
export function userLogin(data) {
  const request = axios
    .post('http://localhost:5000/api/users/login', data, {
      withCredentials: true,
    })
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function userRegister(data) {
  const request = axios
    .post('http://localhost:5000/api/users/register', data)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get('http://localhost:5000/api/users/auth', {withCredentials: true})
    .then(response => response.data)
    .catch(err => alert(err));

  return {
    type: AUTH_USER,
    payload: request,
  };
}
