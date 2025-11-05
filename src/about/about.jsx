import React from 'react';
import { useState, useEffect } from 'react';


function getQuote() {
  return {author: "Quoter", quote: "A quote has loaded"}
}

export function About() {
  
  const [imageURL, setImageURL] = useState("Loading Image")
  const [quote, setQuote] = useState("Loading Quote...")
  const [author, setAuthor] = useState("Loading Author...")

  useEffect(() => {
    fetch('/api/quote')
    .then((res) => res.json())
    .then((data) => {
    setQuote(data[0].q);
    setAuthor(data[0].a);
  });
}, []);

  return (
    <main>
      <div id="picture" className="picture-box"><img width="400px" src={imageURL} alt="placeholder" /></div>
      <div className="aboutText">
        <p>
          You've probably heard that it takes 10,000 hours to master a skill. Have you ever wondered how many hours you've invested in something? Have you ever wondered what kind of progress you have made? Ever wonder what skills your friends are working on? Level Up is github version control but for humans. It allows us to track how much time has been put into specific skills and note our progress along the way. You can set goals, track habits and work with friends all to help you become the best version of yourself you can be. Six months to sexy has never been so easy.
        </p>
        <p>
          To start tracking, simply create a new skill card and start tracking the hours you've spent on a subject!
        </p>
      </div>
      <div className="quote">
        <div>{quote}</div>
        <div className="author">- {author}</div>
      </div>
    </main>
  );
}