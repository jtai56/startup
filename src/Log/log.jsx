import React from 'react';

export function Log() {
  return (
    <main className="logpage">
        <h1 id="logheader">Your Log:</h1>
        <div id="log">
            <div className="skillcard"> 
                <div className="cardtitle">Drawing</div>
                <h2 className="hours">10000</h2>
                <div className="addsubtract">
                    <button>-</button>
                    <button>+</button>
                </div>
            </div>
            <div className="skillcard"> 
                <div className="cardtitle">Drawing</div>
                <h2 className="hours">10000</h2>
                <div className="addsubtract">
                    <button>-</button>
                    <button>+</button>
                </div>
            </div>
            <div className="skillcard"> 
                <div className="cardtitle">Drawing</div>
                <h2 className="hours">10000</h2>
                <div className="addsubtract">
                    <button>-</button>
                    <button>+</button>
                </div>
            </div>
            <div className="skillcard"> 
                <div className="cardtitle">Drawing</div>
                <h2 className="hours">10000</h2>
                <div className="addsubtract">
                    <button>-</button>
                    <button>+</button>
                </div>
            </div>
            <div className="skillcard"> 
                <div className="cardtitle">Drawing</div>
                <h2 className="hours">10000</h2>
                <div className="addsubtract">
                    <button>-</button>
                    <button>+</button>
                </div>
            </div>
            <div className="skillcard"> 
                <div className="cardtitle">Drawing</div>
                <h2 className="hours">10000</h2>
                <div className="addsubtract">
                    <button>-</button>
                    <button>+</button>
                </div>
            </div>
            <div className="skillcard"> 
                <div className="cardtitle">Drawing</div>
                <h2 className="hours">10000</h2>
                <div className="addsubtract">
                    <button>-</button>
                    <button>+</button>
                </div>
            </div>
        </div>
        <br />
        <div className="players">
            <h2>Other Activity:</h2>
            <ul className="notification">
                <li className="player-name">Tim started a new skill (pottery)</li>
                <li className="player-name">Ada started a new skill (hatchet throwing)</li>
                <li className="player-name">Tim just spent 2 hours on drywalling</li>
            </ul>
        </div>
    </main>
  );
}