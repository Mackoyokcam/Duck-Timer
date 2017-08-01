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

document.getElementById('timer').textContent = minutes + ':' + ('0' + seconds).slice(-2);
document.getElementById('done_button').disabled = true;
document.getElementById('done_button').style.opacity = 0.5;
document.getElementById('duck_message').textContent = 'Hello ' + name + '!';

// Get this info from localStorage in the future
var messageInterval = 1;
var intervalHolder = messageInterval;
var theDuck = new Duck(duckMessages);


//when user enters info and presses start, goal changes
function showGoal() {
  console.log('showing goal');
  var userGoal = document.getElementById('userGoalInput').value;
  var divEl = document.getElementById('theGoalOutPut');
  var pEl = document.createElement('p');
  pEl.id = 'userGoal';
  pEl.textContent = userGoal;
  divEl.appendChild(pEl);



  var elem = document.getElementById('goalForm');
  elem.parentNode.removeChild(elem);

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
// function handleReset() {
//   minutes = 15;
//   seconds = 0;
//   messageInterval = intervalHolder;
//   timer = clearInterval(timer);
//   document.getElementById('timer').textContent = minutes + ':' + ('0' + seconds).slice(-2);
//   document.getElementById('done_button').disabled = true;
//   document.getElementById('done_button').style.opacity = 0.5;
//   document.getElementById('start_button').disabled = false;
//   document.getElementById('start_button').style.opacity = 1;
// }

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
      seconds = 5;
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
      document.getElementById('timer').textContent = minutes + ':' + ('0' + seconds).slice(-2);
    }
  }, 1000);
}

document.getElementById('start_button').addEventListener('click', handleStart);
document.getElementById('done_button').addEventListener('click', handleStop);
// document.getElementById('reset_button').addEventListener('click', handleReset);
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
    var namedTitle = document.createElement('h2');
    namedTitle.textContent = 'NAMED FUNCTION IS UNDEFINED';
    section.appendChild(namedTitle);
    var namedCode = document.createElement('h3');
    namedCode.textContent = 'document.write(randomFunction());';
    section.appendChild(namedCode);
    var namedError = document.createElement('h2');
    namedError.textContent = 'RefrenceError: Can\'t find varfiable: randomFunction';
    section.appendChild(namedError);
    console.log('RefrenceError cheat printed...');
  },
  //+++++++++++++++++++++ syntaxError +++++++++++++++++++>
  syntaxError: function (){
    clear();
    var mainTitle = document.createElement('h1');
    mainTitle.textContent = 'SyntaxError';
    section.appendChild(mainTitle);
    var mainSub = document.createElement('h2');
    mainSub.textContent = 'SYNTAX IS NOT CORRECT';
    section.appendChild(mainSub);
    var description = document.createElement('p');
    description.textContent = 'This is caused by incorrect use of the rules of the language. It is often the result of a simple typo.';
    section.appendChild(description);
//--->
    var mismatch = document.createElement('h2');
    mismatch.textContent = 'MISMATCH OR UNCLOSED QUOTES';
    var mismatchExp = document.createElement('h3');
    mismatchExp.textContent = 'document.write(\"Howdy\')';
    section.appendChild(mismatchExp);
    var mismatchError = document.createElement('h2');
    mismatchError.textContent = 'SyntaxErro: Unexpected EOF';
    section.appendChild(mismatchError);
//--->
    var missBracket = document.createElement('h2');
    missBracket.textContent = 'MISSING CLOSING BRACKET';
    section.appendChild(missBracket);
    var missBrackCode = document.createElement('h3');
    missBrackCode.textContent = 'documnet.getElementById(\'page\'';
    section.appendChild(missBrackCode);
    var missError = document.createElement('h2');
    missError.textContent = 'SyntaxError: Expected token \')\'';
    section.appendChild(missError);
//--->
    var missinComma = document.createElement('h2');
    missinComma.textContent = 'MISSING COMMA IN ARRAY';
    section.appendChild(missinComma);
    var missinCommaTip = document.createElement('p');
    missinCommaTip.textContent = 'Would be same for missing ] at the end';
    section.appendChild(missinCommaTip);
    var missinCommaCode = document.createElement('h3');
    missinCommaCode.textContent = 'var list = [\'Item 1\', \'Itme 2\' \'Item 3\'];';
    section.appendChild(missinCommaCode);
    var missinCommaError = document.createElement('h2');
    missinCommaError.textContent = 'SyntaxError: Expected token \']\'';
    section.appendChild(missinCommaError);
//--->
    var malfTitle = document.createElement('h2');
    malfTitle.textContent = 'MALFORMED PROPERTY NAME';
    section.appendChild(malfTitle);
    var malfTip = document.createElement('p');
    malfTip.textContent = 'It has a pace but is not surrounded by quote marks';
    section.appendChild(malfTip);
    var malfCode = document.createElement('h3');
    malfCode.textContent = 'user = {first name: \"Ben\", lastName: \"Lee\"};';
    section.appendChild(malfCode);
    var malfError = document.createElement('h2');
    malfError.textContent = 'SyntaxError: Expected an identifier but found \'name\' instead';
    section.appendChild(malfError); console.log('SyntaxError is printing!');
  },
  //+++++++++++ URIError +++++++++++++++++++>
  uriError : function() {
    var uriErrorTitle = document.createElement('h1');
    uriErrorTitle.textContent = 'URIError';
    section.appendChild(uriErrorTitle);
    var uriDescription = document.createElement('p');
    uriDescription.textContent = 'If these characters are not escaped in URIs, they will cause an error: / ? & # : ;';
    section.appendChild(uriDescription);
//--->
    var characterEscape = document.createElement('h2');
    characterEscape.textContent = 'CHARACTERS ARE NOT ESCAPED';
    section.appendChild(characterEscape);
    var characterCode = document.createElement('h3');
    characterCode.textContent = 'decodeURI(\'http://bbc.com/news.php?a=1\')  \"?\"';
    section.appendChild(characterCode);
    var characterError = document.createElement('h2');
    characterError.textContent = 'URIError: URI error';
    section.appendChild(characterError);
    console.log('URIError is printing!');
  },
  //------------ TypeError ------------------->
  typeError: function() {
    var typeErrorTitle = document.createElement('h1');
    typeErrorTitle.textContent = 'TypeError';
    section.appendChild(typeErrorTitle);
    var typeSub = document.createElement('h2');
    typeSub.textContent = 'VALUE IS UNEXPECTED DATA TYPE';
    section.appendChild(typeSub);
    var typeDescription = document.createElement('p');
    typeDescription.textContent = 'This is often caused by trying to use an object or method that does not exist.';
    section.appendChild(typeDescription);
//--->
    var incorCase = document.createElement('h2');
    incorCase.textContent = 'INCORRECT CASE FOR document OBJECT';
    section.appendChild(incorCase);
    var incorCaseCode = document.createElement('h3');
    incorCaseCode.textContent = 'Document.write(\'Oops!\');' + ' \"D\"<-';
    section.appendChild(incorCaseCode);
    var incorCaseError = document.createElement('h2');
    incorCaseError.textContent = 'TypeError: \'undifined\' is fnot a function (evaluating \'Document.write(\'Oops!\')\')';
    section.appendChild(incorCaseError);
//--->
    var incorCaseWrite = document.createElement('h2');
    incorCaseWrite.textContent = 'INCORRECT CASE FOR write() METHOD';section.appendChild(incorCaseWrite);
    var incorCaseCodeWrite = document.createElement('h3');
    incorCaseCodeWrite.textContent = 'document.Write(\'Oops!\');' + ' \"W\"<-';
    section.appendChild(incorCaseCodeWrite);
    var incorCaseErrorWrite = document.createElement('h2');
    incorCaseErrorWrite.textContent = 'TypeError: \'undifined\' is fnot a function (evaluating \'document.Write(\'Oops!\')\')';
    section.appendChild(incorCaseErrorWrite);
//--->
    var method = document.createElement('h2');
    method.textContent = 'METHOD DOES NOT EXIST';
    section.appendChild(method);
    var methodCode1 = document.createElement('h3');
    methodCode1.textContent = 'var box = {}; ' + ' // Creat empty object';
    section.appendChild(methodCode1);
    var methodCode2 = document.createElement('h3');
    methodCode2.textContent = 'box.getArea ' + ' // Try to access getArea()';
    section.appendChild(methodCode2);
    var methodError = document.createElement('h2');
    methodError.textContent = 'TypeError: \'undefind\' is not a function (evaluating \'box.getArea()\')';
    section.appendChild(methodError);
//--->
  }

};
//------------Clear Section----------------->
function clear(){
  document.getElementById('cheat_sheet').innerHTML = '';
}
//-------------Event Listener---------------->
submit.addEventListener('click',cheatSheet.uriError);
