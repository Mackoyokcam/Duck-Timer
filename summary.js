'use strict';

var times = {};

if (localStorage.times) {
  times = JSON.parse(localStorage.times);
}

var pElement;
var solvedProblems = document.getElementById('solved');
var unsolvedProblems = document.getElementById('unsolved');

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
