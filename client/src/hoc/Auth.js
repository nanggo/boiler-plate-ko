import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';
// eslint-disable-next-line import/no-anonymous-default-export
export default function (Component, options, adminRoute = null) {
  /**
   * [options]
   * null: anyone
   * true: access who logged in
   * false: cannot access who logged in
   */
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth())
        .then(response => {
          if (response.payload.isAuth) {
            if (options === false) {
              props.history.push('/');
            }
          } else {
            if (options) {
              props.history.push('/login');
            }
          }
        })
        .catch(err => alert(err.message));
    });

    return <Component />;
  }
  return AuthenticationCheck;
}
