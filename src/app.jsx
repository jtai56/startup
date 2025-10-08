import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body bg-dark text-light">
            <header className="header">
                <h1> Level Up</h1>
                <nav className = "navbar">
                    <ul>
                        <li><a href="index.html">Index</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="leveluplog.html">Log</a></li>
                        <li><a href="leaderboard.html">Leaderboard</a></li>
                    </ul>
                </nav>
            </header>
            
            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/play' element={<Play />} />
                <Route path='/scores' element={<Scores />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>    
                <container>
                <inline>Joshua Tai</inline>
                <a href="https://github.com/jtai56/startup">My Github</a>
                </container>
            </footer>
        </div>
    </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}