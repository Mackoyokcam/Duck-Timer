'use strict';

// Get this info from localStorage
var userName = JSON.parse(localStorage.getItem(userName));
var duckMessages = inspMessages; // Located in messages.js


var minutes = 15;
var seconds = 0;
var timer;
document.getElementById('timer').textContent = minutes + 'm : ' + seconds + 's';
document.getElementById('done_button').disabled = true;
document.getElementById('done_button').style.opacity = 0.5;
document.getElementById('duck_message').textContent = 'Hello ' + name + '!';

// Get this info from localStorage in the future
var messageInterval = 1;
var intervalHolder = messageInterval;
var theDuck = new Duck(duckMessages);


function Duck(messages) {
  this.messages = messages;
  this.previous = -5; // Previous message index
  this.displayMessage = function() {
    // Display a message to user
    var rando = randomNumber(0, this.messages.length);
    while(this.previous === rando) {
      rando = randomNumber(0, this.messages.length);
      console.log('pew');
    }
    document.getElementById('duck_message').textContent = this.messages[rando];
    this.previous = rando;
  };
}

var userGoal = getElementById('userGoalInput').value;

function showGoal() {
  var divEl = document.getElementById('theGoalOutPut');
  var pEl = document.createElement('pE');
  pEl.textContent = userGoal;
  divEl.appendChild(pEl);

}


function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Stop the clock
function handleStop() {
  document.getElementById('done_button').disabled = true;
  document.getElementById('done_button').style.opacity = 0.5;
  document.getElementById('start_button').disabled = false;
  document.getElementById('start_button').style.opacity = 1;
  timer = clearInterval(timer);
}

// Reset timer to 15 minutes, stop the clock
function handleReset() {
  minutes = 15;
  seconds = 0;
  messageInterval = intervalHolder;
  timer = clearInterval(timer);
  document.getElementById('timer').textContent = minutes + 'm : ' + seconds + 's';
  document.getElementById('done_button').disabled = true;
  document.getElementById('done_button').style.opacity = 0.5;
  document.getElementById('start_button').disabled = false;
  document.getElementById('start_button').style.opacity = 1;
}

// Start event handler
function handleStart() {
  document.getElementById('start_button').disabled = true;
  document.getElementById('start_button').style.opacity = 0.5;
  document.getElementById('done_button').disabled = false;
  document.getElementById('done_button').style.opacity = 1;

  showGoal(); 

  timer = setInterval(function() {
    seconds--;
    // 1 minute has has passed
    if (seconds === -1) {
      minutes--;
      seconds = 59;
      if (messageInterval === 0) {
        // Send message to duck
        theDuck.displayMessage();
        messageInterval = intervalHolder + 1;
      }
      messageInterval--;
    }
    // Time expired
    if (minutes < 0) {
      clearInterval(timer);
      document.getElementById('timer').innerHTML = 'EXPIRED';
      window.location.href = 'summary.html';

      // Send info to summary page
    } else {
      document.getElementById('timer').textContent = minutes + 'm : ' + seconds + 's';
    }
  }, 1000);
}

document.getElementById('start_button').addEventListener('click', handleStart);
document.getElementById('done_button').addEventListener('click', handleStop);
document.getElementById('reset_button').addEventListener('click', handleReset);
