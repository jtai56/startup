import React from 'react';

export function Leaderboard() {
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