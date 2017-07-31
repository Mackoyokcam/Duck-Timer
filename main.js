'use strict';

// Get this info from localStorage
var name = 'Johnny';
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

//----------->
//--------------Cheat Sheet Globals-------------->
var h1 = document.createElement('h1');
var h2 = document.createElement('h2');
var p = document.createElement('p');
var h3 = document.createElement('h3');
var section = document.getElementById('cheat_sheet');

//------------Cheat sheet Object----------------->
var cheatSheet = {
  referenceError: function (){
    clear();
    h1.textContent = 'ReferenceError';
    section.appendChild(h1);
    h2.textContent = 'VARIABLE DOES NOT EXIST';
    section.appendChild(h2);
    p.textContent = 'This is caused by a variable that is not declared or is out of scope.';
    section.appendChild(p);
    h2.textcontent = 'VARIABLE IS UNDECLARED';
    h3.textContent = ''
    console.log('RefrenceError sheet printed...');
  }
};
//------------Clear Section----------------->
function clear(){
  document.getElementById('cheat_sheet').innerHTML = '';
}
//-------------Event Listener---------------->
submit.addEventListener('click',cheatSheet.referenceError);
