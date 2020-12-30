import axios from 'axios';
import {LOGIN_USER} from './types';
export function userLogin(data) {
  const request = axios
    .post('http://localhost:5000/api/users/login', data)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
