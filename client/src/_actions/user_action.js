import axios from 'axios';
import {url} from '../Config';
import {AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER} from './types';
export function userLogin(data) {
  const request = axios
    .post(`${url}/api/users/login`, data, {
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
    .post(`${url}/api/users/register`, data, {withCredentials: true})
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${url}/api/users/auth`, {withCredentials: true})
    .then(response => response.data)
    .catch(err => alert(err));

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${url}/api/users/logout`, {withCredentials: true})
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
