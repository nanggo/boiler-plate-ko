import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth())
        .then(response => {
          //Not Loggined in Status
          if (!response.payload.isAuth) {
            if (options) {
              props.history.push('/login');
            }
            //Loggined in Status
          } else {
            //supposed to be Admin page, but not admin person wants to go inside
            if (adminRoute && !response.payload.isAdmin) {
              props.history.push('/');
            }
            //Logged in Status, but Try to go into log in page
            else {
              if (options === false) {
                props.history.push('/');
              }
            }
          }
        })
        .catch(err => alert(err.message));
    }, [dispatch, props.history]);

    return <Component {...props} user={user} />;
  }
  return AuthenticationCheck;
}
