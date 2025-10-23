import React from 'react';
import { useState, useEffect} from 'react';

export function Log() {
    const [logs, setLogs] = React.useState([])
    const [logName, setLogName] = React.useState("")
    const [activities,setActivities] =React.useState([])

    const createLog = () => {
        //creates new log
        if (logName.trim()=== ""){return}
        const newLog = {
            id:Date.now(),
            name: logName,
            hours: 0
        };
        //puts new log in the maps withe the other log peeps
        setLogs([...logs,newLog])
        setLogName("")            //clears the log names so that people can't repeatedly 

    };
    
    const updateHours = (id, changeInt) => {
        setLogs(logs.map(log =>      // This code is buns to understand but basically, if the log.id in the array == selected id, 
                                    // change log.hours by the changeInt (-1 or +1), if not keep the log and to map anything.
            log.id === id ? {...log, hours: Math.max(0,log.hours + changeInt)} : log
        ));
    };
    
    useEffect(() => {
    const interval = setInterval(() => {
      const userName = `User-${Math.floor(Math.random() * 100)}`;
      const time = Math.floor(Math.random() * 5) + 1;
      const newActivity = `${userName} just spent ${time} hours on a skill!`;

      
      setActivities(prev => [newActivity, ...prev].slice(0, 5)); // Keep last 5 activities
    }, 5000);

    return () => clearInterval(interval);    // Cleanup when component unmounts
    }, []);  //Doesn't need dependecies, just runs once on mount and then lets the interval keep going i guess
    
    
    return (
    <main className="logpage">
        <h1 id="logheader">Your Log:</h1>
        <div id="log">
            {logs.map(log => (
            <div key = {log.id} className="skillcard"> 
                <div className="cardtitle">{log.name}</div>
                <h2 className="hours">{log.hours}</h2>
                <div className="addsubtract">
                    <button onClick={() => updateHours(log.id, -1)}>-</button>
                    <button onClick={() => updateHours(log.id, 1)} >+</button>
                </div>
            </div>
            ))}
        </div>
        <div id = "logMenu">
            <input type="text" value = {logName} id="" name="Goal Name" placeholder="Whats next?" onChange = {e => setLogName(e.target.value)}/>
            <button id= "createLogButton" onClick={createLog}>Create</button>
        </div>
        <br />
        <div className="players">
            <h2>Other Activity:</h2>
            <ul className="notification">
                {activities.map((a, i) => (
                <li key={i} className="player-name">
                    {a}
                </li>
                ))}
            </ul>
        </div>
    </main>
  );
}