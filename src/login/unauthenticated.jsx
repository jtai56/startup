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

    function textChange(e) {
        setUserName(e.target.value);
    }
    return (
        <div>
            <div>{props.userName}</div>
            <div className="loginButtons">
                <button onClick={() => Navigate('/log')} disabled={!userName || !password}>Start Log</button>
                <button onClick={() => logout()} >Logoout</button>
            </div>
        </div>
    );
};