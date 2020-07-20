import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginStr = '/login';
const SignInStr = '/users';

//requests for log in and sing in

const getToken = (string, body ) => {
  fetch(`${string}`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: `${body}`,
  })
  .then((response) => {
    if (response.ok) {
      return response.json().then(data => {
        document.cookie =`token=${data.accessToken}`;
        document.location.assign('/contacts')
      });
    } else {
      console.error(response);
      return response.text().then(message => {
        throw new Error('Failed to login due to: ' + message);
      });
    }
  })
  .catch(console.error)
}

//login page component

export const LoginComponent = ({ setLoggedIn }) => {
  const [passwordShown, setPasswordShown] = useState(true)
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const Body = JSON.stringify({
    "email":login,
    "password":password
  })

  const handleSubmit = (event, string) => {
    event.preventDefault();
    getToken(string, Body, setLoggedIn);
  }

  return (
    <div className='container'>
      <div className='header'>
        Contacts
      </div>
      <div className='forms'>
        <input type='text' value={login} placeholder='login' onChange={event => setLogin(event.target.value)} />
        <div className='password'>
          <input 
            type={passwordShown ? 'password' : 'text'} 
            value={password} 
            placeholder='password' 
            onChange={event => setPassword(event.target.value)} />
          <FontAwesomeIcon icon='eye' className='oneIcon eye' onClick={() => setPasswordShown(!passwordShown)} />
        </div>
        <div className='buttons'>
          <form onSubmit={event => handleSubmit(event, LoginStr)}>
            <input type='submit' value='Log In' />
          </form>
          <form onSubmit={event => handleSubmit(event, SignInStr)}>
            <input type='submit' value='Sign in' />
          </form>
        </div>
      </div>
    </div>
  )
}
 