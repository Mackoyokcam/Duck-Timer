'use strict';

// Get this info from localStorage


var userName = JSON.parse(localStorage.getItem(userName));
var duckMessages = ['You can do it ' + userName + '!',
  'I believe in you ' + userName + '!'];

var minutes = 15;
var seconds = 0;

// Get this info from localStorage in the future
var messageInterval = 1;
var theDuck = new Duck(duckMessages);


//when user enters info and presses start, goal changes


var userGoal = getElementById('userGoalInput').value;

function showGoal() {
  var divEl = document.getElementById('theGoalOutPut');
  var pEl = document.createElement('pE');
  pEl.textContent = userGoal;
  divEl.appendChild(pEl);

}


function Duck(messages) {
  this.messages = messages;
  this.displayMessage = function() {
    // Display a message to user
    document.getElementById('duck_message').textContent = messages[0];
  };
}

// Call function every 1 second
var timer = setInterval(function() {

  seconds--;

  // 1 minute has has passed
  if (seconds === -1) {
    minutes--;
    seconds = 59;
    if (messageInterval === 0) {
      // Send message to duck
      theDuck.displayMessage();
    }
    messageInterval--;
  }
  // Time expired
  if (minutes < 0) {
    clearInterval(timer);
    document.getElementById('timer').innerHTML = 'EXPIRED';

    // Send info to summary page
  }

  // Every interval, send message to duck

  document.getElementById('timer').textContent = minutes + 'm : ' + seconds + 's';
}, 1000);


showGoal();
console.log(JSON.parse(localStorage.getItem(userName)));
