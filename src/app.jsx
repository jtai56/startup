import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Log } from './log/log';
import { Leaderboard } from './leaderboard/leaderboard';
import { AuthState } from './login/authstate';
import { About } from './about/about';


export default function App() {
    const [logs, setLogs] = React.useState([]);
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
        <div className="body bg-dark">
            <header className="header">
            <h1>Level Up</h1>
            <nav className="navbar">
                <ul>
                <li><NavLink to='/'>Login</NavLink></li>
                <li><NavLink to='/about'>About</NavLink></li>
                {authState === AuthState.Authenticated && (
                    <>
                    <li className='nav-item'><NavLink className='nav-link' to='/log'>Log</NavLink></li>
                    <li className='nav-item'><NavLink className='nav-link' to='/leaderboard'>Leaderboard</NavLink></li>
                    </>
                )}
                </ul>
            </nav>
            </header>

            <Routes>
            <Route
                path='/'
                element={
                <Login
                    userName={userName}
                    authState={authState}
                    onAuthChange={(userName, authState) => {
                    setAuthState(authState);
                    setUserName(userName);
                    }}
                />
                }
            />
            <Route path='/log' element={<Log logs={logs} setLogs={setLogs} />} />
            <Route path='/leaderboard' element={<Leaderboard logs={logs} />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
            <div>
                <span>{userName} </span>
                <a href="https://github.com/jtai56/startup">My Github</a>
            </div>
            </footer>
        </div>
        </BrowserRouter>
    );
    }

    function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
    }
