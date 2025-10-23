import React from 'react';

export function Leaderboard({logs}) {
    const highestLog = logs.reduce((max, log) => {
      return log.hours > (max?.hours || 0) ? log : max;
    }, null);  // if the visitor is greater than the max, make the vistor the new max
      //max?.hours || 0, This just says if max hours is on its first go around make it 0.



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
          {highestLog ? (
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