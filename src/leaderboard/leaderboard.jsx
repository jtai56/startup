import React, { useState, useEffect } from 'react';

export function Leaderboard({logs}) {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadLeaderboard() {
            try {
                const response = await fetch('/api/leaderboard', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setLeaderboard(data);
                }
            } catch (err) {
                console.error('Error loading leaderboard:', err);
            } finally {
                setLoading(false);
            }
        }
        loadLeaderboard();
    }, []);

    return (
        <main>
            <h1>Leaderboard - Top 10</h1>
            <table className="table table-light">
                <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">User</th>
                        <th scope="col">Skill</th>
                        <th scope="col">Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4">Loading...</td>
                        </tr>
                    ) : leaderboard.length > 0 ? (
                        leaderboard.map((entry, index) => (
                            <tr key={entry.userEmail}>
                                <td>{index + 1}</td>
                                <td>{entry.userEmail}</td>
                                <td>{entry.name}</td>
                                <td>{entry.hours} hours</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No logs yet. Be the first!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </main>
    );
}