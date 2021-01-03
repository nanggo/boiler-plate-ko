/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Menu} from 'antd';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {url} from '../../../../Config';

function RightMenu(props) {
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios
      .get(`${url}/api/users/logout`, {withCredentials: true})
      .then(response => {
        if (response.status === 200) {
          props.history.push('/login');
        } else {
          alert('Log Out Failed');
        }
      })
      .catch(err => alert(err.message));
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
