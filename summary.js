'use strict';

var times = {};
var message;
var but;

if (localStorage.times) { // Local Storage exists
  times = JSON.parse(localStorage.times);

  message = document.getElementById('personal_message');
  message.textContent = 'Greetings ' + times.userName + '! Here is your summary:';

  var pElement;
  var divElement;
  var solvedProblems = document.getElementById('solved');
  var unsolvedProblems = document.getElementById('unsolved');

  // Display solved problems
  for(var key in times.goal) {
    divElement = document.createElement('div');
    divElement.id = times.goal[key];
    pElement = document.createElement('p');
    pElement.textContent = 'Problem: ' + key;
    divElement.appendChild(pElement);
    pElement = document.createElement('p');
    pElement.textContent = 'Solution: ' + times.goal[key];
    divElement.appendChild(pElement);
    but = document.createElement('button');
    but.textContent = 'X';
    but.addEventListener('click', removeItemSolved);
    divElement.appendChild(but);
    solvedProblems.appendChild(divElement);
  }

  // Display unsolved problems
  for(key in times.unsolved) {
    divElement = document.createElement('div');
    divElement.id = times.unsolved[key];
    pElement = document.createElement('p');
    pElement.textContent = 'Problem: ' + key;
    divElement.appendChild(pElement);
    pElement = document.createElement('p');
    pElement.textContent = 'Comment: ' + times.unsolved[key];
    divElement.appendChild(pElement);
    but = document.createElement('button');
    but.textContent = 'X';
    but.addEventListener('click', removeItemUnsolved);
    divElement.appendChild(but);
    unsolvedProblems.appendChild(divElement);
  }

} else {
  // no local storage
  message = document.getElementById('personal_message');
  message.textContent = 'You have no Duck-Timer summary.';
}

function handleBack() {
  window.location.href = 'main.html';
}

function removeItemSolved (event) {
  var button = event.target;
  for(var key in times.goal) {
    if(button.parentNode.id === times.goal[key]){
      console.log('Found match!');
      delete times.goal[key];
      localStorage.times = JSON.stringify(times);
    }
  }
  button.parentNode.parentNode.removeChild(button.parentNode);
}

function removeItemUnsolved (event) {
  var button = event.target;
  for(var key in times.unsolved) {
    if(button.parentNode.id === times.unsolved[key]){
      delete times.unsolved[key];
      localStorage.times = JSON.stringify(times);
    }
  }
  button.parentNode.parentNode.removeChild(button.parentNode);
}

document.getElementById('back_button').addEventListener('click', handleBack);
