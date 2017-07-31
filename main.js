'use strict';

var minutes = 15;
var seconds = 0;

// Call function every 1 second
var timer = setInterval(function() {

  seconds--;

  // 1 minute has has passed
  if (seconds === -1) {
    minutes--;
    seconds = 59;
  }
  // Time expired
  if (minutes < 0) {
    clearInterval(timer);
    document.getElementById('timer').innerHTML = 'EXPIRED';
  }
  document.getElementById('timer').textContent = minutes + 'm : ' + seconds + 's';
}, 1000);
