'use strict';

var times = {};
var message;

if (localStorage.times) {
  times = JSON.parse(localStorage.times);

  message = document.getElementById('personal_message');
  message.textContent = 'Greetings ' + times.userName + '! Here is your summary:';

  var pElement;
  var solvedProblems = document.getElementById('solved');
  var unsolvedProblems = document.getElementById('unsolved');

  // Display solved problems
  for(var key in times.goal) {
    pElement = document.createElement('p');
    pElement.textContent = 'Problem: ' + key;
    solvedProblems.appendChild(pElement);
    pElement = document.createElement('p');
    pElement.textContent = 'Solution: ' + times.goal[key];
    solvedProblems.appendChild(pElement);
    var brElement = document.createElement('br');
    solvedProblems.appendChild(brElement);
  }

  // Display unsolved problems
  for(key in times.unsolved) {
    pElement = document.createElement('p');
    pElement.textContent = 'Problem: ' + key;
    unsolvedProblems.appendChild(pElement);
    pElement = document.createElement('p');
    pElement.textContent = 'Comment: ' + times.unsolved[key];
    unsolvedProblems.appendChild(pElement);
    brElement = document.createElement('br');
    unsolvedProblems.appendChild(brElement);
  }
} else {
  // no local storage
  message = document.getElementById('personal_message');
  message.textContent = 'You have no Duck-Timer summary.';
}
