import React from 'react';

export function Login({ userName, authState, onAuthChange }) {
  const [loginName, setLoginName] = React.useState('');

  function loginUser(e) {
    e.preventDefault(); // prevents page reload
    if (!loginName.trim()) return;
    localStorage.setItem('user', loginName);
    onAuthChange(loginName, 'Authenticated'); 
  }

  function textChange(e) {
    setLoginName(e.target.value);
  }

  return (
    <main className='main'>
      <div className="container">
        <h1>Let's repo your progress.</h1>
        <h2>Github but for pushing your life forward.</h2>
        <form onSubmit={loginUser}>
          <div className="login">
            <div className="inputs">
              <div>
                <span>👤 </span>
                <input
                  type="text"
                  placeholder="your@email.com"
                  value={loginName}
                  onChange={textChange}
                />
              </div>
              <div>
                <span>🔒</span>
                <input type="password" placeholder="password" />
              </div>
            </div>
          </div>
          <div className="loginButtons">
            <button type="submit">Login</button>
            <button type="button">Create</button>
          </div>
        </form>
      </div>
    </main>
  );
}
