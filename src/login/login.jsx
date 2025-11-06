import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authstate';

export function Login({ userName, authState, onAuthChange }) {
  const [loginName, setLoginName] = React.useState('');
  console.log('Login component render - authState:', authState, 'userName:', userName);
  return (
    <main className='main'>
      <div className="container">
        {authState !== AuthState.Unknown && <h1>Let's repo your progress.</h1>}
        {authState !== AuthState.Unknown && <h2>Github but for pushing your life forward.</h2>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              console.log('onLogin called with:', loginUserName);
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}
