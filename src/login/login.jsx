import React from 'react';

export function Login() {
  return (
    <main>
        <container>
            <h1>Lets repo your progress.</h1>
            <h1>Github but for pushing your life forward.</h1>
            <form method="get" action="play.html">
                <div className="login">
                    <div>
                    <span>👤 </span><input type="text" placeholder="your@email.com" />
                    </div>
                    <div>
                    <span>🔒</span>
                    <input type="password" placeholder="password" />
                    </div>
                </div>
                <div className="loginButtons"> 
                    <button type="submit">Login</button>
                    <button type="submit">Create</button>
                </div>
            </form>
        </container>
    </main>
  );
}