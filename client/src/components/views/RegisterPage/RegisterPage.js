import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {userLogin, userRegister} from '../../../_actions/user_action';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = event => {
    setEmail(event.target.value);
  };

  const onNameHandler = event => {
    setName(event.target.value);
  };

  const onPasswordHandler = event => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordHandler = event => {
    setConfirmPassword(event.target.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    if (password === confirmPassword) {
      const body = {
        email,
        password,
        name,
      };

      dispatch(userRegister(body))
        .then(result => {
          if (!result.payload.success) {
            alert(result.payload.message || result.payload.err.message);
          } else {
            props.history.push('/login');
          }
        })
        .catch(error => alert(error.message));
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
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
        <label>Name</label>
        <input type="text" value={name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
}

export default RegisterPage;
