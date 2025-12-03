import React from 'react';
import { useState, useEffect} from 'react';
import { LogNotifier, LogEvent } from './logNotifier.js';

export function Log() {
    const [logName, setLogName] = React.useState("")
    const [logs, setLogs] = React.useState([])
    const [activities,setActivities] =React.useState([])

    async function sendLogToServer(log) {
        const response = await fetch('/api/log', {
            method: 'POST',
            body: JSON.stringify(log),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: 'include', // Include cookies for authentication
        });
        if (!response.ok) {
            console.error('Failed to save log:', await response.text());
        }
    }

    async function updateLogOnServer(log) {
        const response = await fetch(`/api/log/${log.id}`, {
            method: 'PUT',
            body: JSON.stringify(log),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: 'include', // Include cookies for authentication
        });
        if (!response.ok) {
            console.error('Failed to update log:', await response.text());
        }
    }
    const createLog = () => {
        //creates new log
        if (logName.trim()=== ""){return}
        const newLog = {
            id:Date.now(),
            name: logName,
            hours: 0
        };
        sendLogToServer(newLog);
        //puts new log in the maps withe the other log peeps
        setLogs([...logs,newLog])
        setLogName("")            //clears the log names so that people can't repeatedly 

    };
    

    const updateHours = async (id, changeInt) => {
        // Find and update the log
        const updatedLogs = logs.map(log => 
          log.id === id ? {...log, hours: Math.max(0, log.hours + changeInt)} : log 
        );
        const updatedLog = updatedLogs.find(log => log.id === id);
        setLogs(updatedLogs);
        
        if (updatedLog) {
          await updateLogOnServer(updatedLog);
          try {
            const response = await fetch('/api/user', { credentials: 'include' });
            if (response.ok) {
              const userData = await response.json();
              const userName = userData.email.split('@')[0]; //parses user name from email
              
              const message = `${userName} has now spent ${updatedLog.hours} hours on ${updatedLog.name}!`;
              
              console.log('Broadcasting message:', message);
              LogNotifier.broadcastEvent(userName, LogEvent.End, { msg: message });
            } else {
              console.error('Failed to get user data:', response.status);
            }
          } catch (error) {
            console.error('Error broadcasting update:', error);
          }
        }
    };

    function handleLogEvent(event) {
        console.log('Received WebSocket event:', event);
        if (event.type === LogEvent.End) {
          const message = event.value.msg;
          console.log('Adding activity:', message);
          setActivities(prev => [message, ...prev].slice(0, 5));
        }
    }

    useEffect(() => {
        // Load user's logs from server when component mounts
        async function loadLogs() {
            try {
                const response = await fetch('/api/log', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const userLogs = await response.json();
                    setLogs(userLogs);
                }
            } catch (err) {
                console.error('Error loading logs:', err);
            }
        }
        loadLogs();

        // Register WebSocket handler
        LogNotifier.addHandler(handleLogEvent);

        // Cleanup when component unmounts 
        return () => LogNotifier.removeHandler(handleLogEvent);
    }, []); // Empty dependency array = run once on mount
    
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
                    <button onClick={() => updateHours(log.id, 1)}>+</button>
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