import React, {useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/hello')
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }, []);

  const onLogoutClickHandler = () => {
    axios
      .get('http://localhost:5000/api/users/logout', {withCredentials: true})
      .then(response => {
        if (response.data.success) {
          props.history.push('/login');
        } else {
          alert('로그아웃에 실패했습니다.');
        }
      })
      .catch(err => alert(err));
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
      <h2>시작 페이지</h2>
      <button onClick={onLogoutClickHandler}>Logout</button>
    </div>
  );
}

export default withRouter(LandingPage);
