import React, { useState, useEffect } from 'react';

export function Leaderboard({logs}) {
    const [highestLog, setHighestLog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadHighestLog() {
            try {
                const response = await fetch('/api/log/highest', {
                    credentials: 'include', // sends the cookies with the req 
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.msg !== 'No logs yet') {
                        setHighestLog(data);
                    }
                }
            } catch (err) {
                console.error('Error loading highest log:', err);
            } finally {
                setLoading(false);
            }
        }
        loadHighestLog();
    }, []);

    return (
        <main>
            <table className="table table-light">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Skill</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="3">Loading...</td>
                        </tr>
                    ) : highestLog ? (
                        <tr>
                            <td>You</td>
                            <td>{highestLog.name}</td>
                            <td>You spent {highestLog.hours} hours on this skill. Amazing!</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="3">No logs yet</td>
                        </tr>
                    )}
                    <tr>
                        <td>James</td>
                        <td>Juggling one-handed</td>
                        <td>James spent 20,000 hours on this skill. He is at the top of his game!</td>
                    </tr>
                    <tr>
                        <td>孫悟空</td>
                        <td>Training</td>
                        <td>孫悟空 has spent 10,042 hours on training. He is next level!</td>
                    </tr>
                    <tr>
                        <td>성진우</td>
                        <td>Running</td>
                        <td>성진우 has spent 10 hours running since April 21, 2023. Cheer him on!</td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}