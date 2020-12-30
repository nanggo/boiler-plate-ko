import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {userLogin} from '../../../_actions/user_action';

function LoginPage(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = event => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = event => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    const body = {
      email,
      password,
    };

    dispatch(userLogin(body))
      .then(result => {
        if (!result.payload.loginSuccess) {
          alert(result.payload.message);
        } else {
          props.history.push('/');
        }
      })
      .catch(error => alert(error.message));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
