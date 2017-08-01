'use strict';

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

document.getElementById('timer').textContent = minutes + 'm : ' + seconds + 's';
document.getElementById('done_button').disabled = true;
document.getElementById('done_button').style.opacity = 0.5;
document.getElementById('duck_message').textContent = 'Hello ' + name + '!';

// Get this info from localStorage in the future
var messageInterval = 1;
var intervalHolder = messageInterval;
var theDuck = new Duck(duckMessages);


//when user enters info and presses start, goal changes
function showGoal() {
  var userGoal = document.getElementById('userGoalInput').value;
  var divEl = document.getElementById('theGoalOutPut');
  var pEl = document.createElement('p');
  pEl.id = 'userGoal';
  pEl.textContent = userGoal;
  divEl.appendChild(pEl);
}

// Duck Constructor
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
  var jqPrompt = {
    state0: {
      title: 'Name',
      html:'<label>Solution: <input type="text" name="solution" value=""></label><br />',
      buttons: { Solved: 1 },
      focus: 'input[name="solution"]',
      submit:function(e,v,m,f){
        console.log(f);
        e.preventDefault();
        $.prompt.close();

        // store in array
        times.goal[document.getElementById('userGoal').textContent] = f.solution;
        localStorage.times = JSON.stringify(times);
        window.location.href = 'summary.html';
      }
    }
  };
  $.prompt(jqPrompt);
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
      var jqPrompt = {
        state0: {
          title: 'Name',
          html:'<label>Comment: <input type="text" name="comment" value=""></label><br />',
          buttons: { Comment: 1 },
          focus: 'input[name="comment"]',
          submit:function(e,v,m,f){
            console.log(f);
            e.preventDefault();
            $.prompt.close();

            // store in array
            times.unsolved[document.getElementById('userGoal').textContent] = f.comment;
            localStorage.times = JSON.stringify(times);
            window.location.href = 'summary.html';
          }
        }
      };
      $.prompt(jqPrompt);

      // Send info to summary page
    } else {
      document.getElementById('timer').textContent = minutes + 'm : ' + seconds + 's';
    }
  }, 1000);
}

document.getElementById('start_button').addEventListener('click', handleStart);
document.getElementById('done_button').addEventListener('click', handleStop);
document.getElementById('reset_button').addEventListener('click', handleReset);
document.getElementById('test').addEventListener('click', function() {minutes = -1;});

//----------->
//--------------Cheat Sheet Globals-------------->
var section = document.getElementById('cheat_sheet');

//------------Cheat sheet Object----------------->
var cheatSheet = {
  referenceError: function (){
    clear();
    var h1 = document.createElement('h1');
    h1.textContent = 'ReferenceError';
    section.appendChild(h1);
    var h2 = document.createElement('h2');
    h2.textContent = 'VARIABLE DOES NOT EXIST';
    section.appendChild(h2);
    var p = document.createElement('p');
    p.textContent = 'This is caused by a variable that is not declared or is out of scope.';
    section.appendChild(p);
    var secH2 = document.createElement('h2');
    secH2.textContent = 'VARIABLE IS UNDECLARED';
    section.appendChild(secH2);
    var h3 = document.createElement('h3');
    h3.textContent = 'var width = 12;';
    section.appendChild(h3);
    var secH3 = document.createElement('h3');
    secH3.textContent = 'var area = width * height;';
    section.appendChild(secH3);
    var h4 = document.createElement('h2');
    h4.textContent = 'RefrenceError: Can\'t find variable: height';
    section.appendChild(h4);
    console.log('RefrenceError cheat printed...');
  }
};
//------------Clear Section----------------->
function clear(){
  document.getElementById('cheat_sheet').innerHTML = '';
}
//-------------Event Listener---------------->
submit.addEventListener('click',cheatSheet.referenceError);
