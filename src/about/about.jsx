import React from 'react';
import { useState, useEffect } from 'react';

const [imageURL, setImageURL] = useEffect("Loading Image")
const [quote, setQuote] = useEffect("Loading Quote...")
const [author, setAuthor] = useEffect("Loading Author...")

  React.useEffect(() => {
    setImageURL(`placeholder.jpg`);
    setQuote('A quote has loaded!!');
    setQuoteAuthor('Psychologist');
  }, []);

export function About() {
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