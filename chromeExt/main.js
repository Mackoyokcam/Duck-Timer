'use strict';

Notification.requestPermission();

var notification = new Notification('Hello there!');

var name = 'Johnny';
if(localStorage.userName) {
  name = JSON.parse(localStorage.userName);
}

var duckMessages = inspMessages; // Located in messages.js

var times = {};

if (localStorage.times) { // old user
  times = JSON.parse(localStorage.times);
} else { // new user
  times = {
    'userName': name,
    'goal': {},
    'unsolved': {}
  };
}

var minutes = 15;
var seconds = 0;
var timer;

document.getElementById('timer').textContent = minutes + ':' + ('0' + seconds).slice(-2);
document.getElementById('done_button').disabled = true;
document.getElementById('done_button').style.opacity = 0.5;
document.getElementById('duck_message').textContent = 'Good Luck!';

// Get this info from localStorage in the future
var messageInterval = 1;
var intervalHolder = messageInterval;
var theDuck = new Duck(duckMessages);

// Duck Constructor
function Duck(messages) {
  this.messages = messages;
  this.previous = -5; // Previous message index
  this.displayMessage = function() {
    // Display a message to user
    var rando = randomNumber(0, this.messages.length);
    console.log('Display Called!');
    while(this.previous === rando) {
      rando = randomNumber(0, this.messages.length);
    }
    document.getElementById('duck_message').textContent = this.messages[rando];
    this.previous = rando;
  };
}

// Generates a random number used to index the messages for the duck
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
  document.getElementById('timer').textContent = minutes + ':' + ('0' + seconds).slice(-2);
  minutes = 15;
  seconds = 0;
}

// Start event handler
function handleStart() {
  document.getElementById('start_button').disabled = true;
  document.getElementById('start_button').style.opacity = 0.5;
  document.getElementById('done_button').disabled = false;
  document.getElementById('done_button').style.opacity = 1;

  document.getElementById('timer').textContent = minutes + ':' + ('0' + seconds).slice(-2);
  minutes = 15;
  seconds = 0;

  timer = setInterval(function() {
    seconds--;
    // 1 minute has has passed
    if (seconds === -1) {
      minutes--;
      seconds = 59;
      if (messageInterval === 0) {
        // Send message to duck
        console.log('Before call....');
        theDuck.displayMessage();
        messageInterval = intervalHolder;
      }
      messageInterval--;
    }
    // Time expired
    if (minutes < 0) {
      clearInterval(timer);
      document.getElementById('timer').innerHTML = 'EXP';
      document.getElementById('done_button').disabled = true;
      document.getElementById('done_button').style.opacity = 0.5;
      document.getElementById('start_button').disabled = false;
      document.getElementById('start_button').style.opacity = 1;
      // Send info to summary page
    } else {
      document.getElementById('timer').textContent = minutes + ':' + ('0' + seconds).slice(-2);
    }
  }, 1000);
}

document.getElementById('start_button').addEventListener('click', handleStart);
document.getElementById('done_button').addEventListener('click', handleStop);
