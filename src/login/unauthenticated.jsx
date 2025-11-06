import React from 'react';

import Button from 'react-bootstrap/Button';


export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName || '');
    const [password, setPassword] = React.useState('');

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        try {
            console.log('Attempting login/create:', endpoint);
            const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: 'include', // Include cookies in the request
            });
            console.log('Response status:', response.status);
            if (response?.status === 200) {
                console.log('Success! Setting localStorage and calling onLogin');
                localStorage.setItem('userName', userName);
                props.onLogin(userName);
            } else {
                let errorMsg = 'An error occurred';
                try {
                    const body = await response.json();
                    errorMsg = body.msg || errorMsg;
                } catch (e) {
                    errorMsg = response.statusText || errorMsg;
                }
                console.log(`⚠ Error: ${errorMsg}`);
            }
        } catch (err) {
            console.error('Error during login/create:', err);
        }
    }

    function textChange(e) {
        setUserName(e.target.value);
    }
    return (
        <div>
            <div>{props.userName}</div>
            <div>
                <div className="login">
                    <div className="inputs">
                        <div>
                            <span>👤 </span>
                            <input placeholder="your@email.com" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        <div>
                            <span>🔒</span>
                            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="loginButtons">
                <button onClick={() => loginUser()} disabled= {!userName || !password}>Login</button>
                <button onClick={() => createUser()} disabled= {!userName || !password} >Create </button>
            </div>
        </div>
    );
};