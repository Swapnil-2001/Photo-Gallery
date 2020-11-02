import React, { useState } from 'react';
import Up from '../images/up-arrows.png';

function ScrollToTop({ delayInMs }) {
  const [intervalId, setIntervalId] = useState(0);
  function scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(intervalId);
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  function scrollToTop() {
    let intId = setInterval(scrollStep(), delayInMs);
    setIntervalId(intId);
  }
  return (
    <img
      src={Up}
      alt="Up"
      className="up"
      onClick={ () => scrollToTop() }
    />
  )
}

export default ScrollToTop;
