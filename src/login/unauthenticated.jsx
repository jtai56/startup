import React from 'react';

import Button from 'react-bootstrap/Button';


export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.user);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: userName, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        });
        if (response?.status === 200) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
        } else {
        const body = await response.json();
        setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }

    return (
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
    );
};