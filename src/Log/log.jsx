import React from 'react';
import { useState, useEffect, Date, Math} from 'react';

export function Log() {
    const [logs, setLogs] = React.useState([])
    const [logName, setLogName] = React.useState("")
    
    const createLog = () => {
        //creates new log
        if (logName.strip()=== ""){return}
        const newLog = {
            id:Date.now(),
            name: logName,
            hours: 0
        }
        //puts new log in the maps withe the other log peeps
        setLogs([...logs,newLog])
        setLogName("")            //clears the log names so that people can't repeatedly 

    };
    
    const updateHours = (id, changeInt) => {
        setLogs(logs.map(log =>      // This code is buns but basically, if the log.id in the array == selected id, change log.hours by the changeInt (-1 or +1), if not keep the log and to map anything.
            log.id === id ? {...log, hours: Math.maxlog(0,log.hours + changeInt)} : log
        ))  
    }

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
            
        </div>
        <div id = "logMenu">
            <input type="text" id="" name="Goal Name" placeholder="Whats next?"/>
            <button id= "createLogButton" onClick={createLog}>Create</button>
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