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
document.getElementById('start_button').disabled = true;
document.getElementById('start_button').style.opacity = 0.5;
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
        console.log('Before call....');
        theDuck.displayMessage();
        messageInterval = intervalHolder;
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

function handleInput(e) {
  if (isEmpty(e.target.value)) {
    document.getElementById('start_button').disabled = true;
    document.getElementById('start_button').style.opacity = 0.5;
  } else {
    document.getElementById('start_button').disabled = false;
    document.getElementById('start_button').style.opacity = 1;
  }
}

function isEmpty(str) {
  return str.replace(/^\s+|\s+$/g, '').length == 0;
}

document.getElementById('start_button').addEventListener('click', handleStart);
document.getElementById('done_button').addEventListener('click', handleStop);
// document.getElementById('reset_button').addEventListener('click', handleReset);
document.getElementById('test').addEventListener('click', function() {minutes = -1;});
document.getElementById('userGoalInput').addEventListener('input', handleInput);

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
    clear();
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
    clear();
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
    var dom = document.createElement('h2');
    dom.textContent = 'DOM NODE DOES NOT EXIST';
    section.appendChild(dom);
    var domCode1 = document.createElement('h3');
    domCode1.textContent = 'var el = document.getElementById(\'z\'); ' + ' \"z\" <-';
    section.appendChild(domCode1);
    var domCode2 = document.createElement('h3');
    domCode2.textContent = 'el.innerHTML = \'Mango\'';
    section.appendChild(domCode2);
    var domError = document.createElement('h2');
    domError.textContent = 'TypeError: \'null\' is not an object (evaluating \'el.innerHTML = \'Mango\')';
    section.appendChild(domError);
  },
  //----------- Range Error ----------------->
  rangeError: function(){
    clear();
    var rangeErrorTitle = document.createElement('h1');
    rangeErrorTitle.textContent = 'RangeError';
    section.appendChild(rangeErrorTitle);
    var rangeSub = document.createElement('h2');
    rangeSub.textContent = 'NUMBER OUTSIDE OF RANGE';
    section.appendChild(rangeSub);
    var rangeDescription = document.createElement('p');
    rangeDescription.textContent = 'If you can call a function using numbers outside of its accepted range';
    section.appendChild(rangeDescription);
//--->
    var cannotCreateArray = document.createElement('h2');
    cannotCreateArray.textContent = 'CANNOT CREATE ARRAY WITH -1 ITEMS';
    section.appendChild(cannotCreateArray);
    var cannotCode = document.createElement('h3');
    cannotCode.textContent = 'var anArray = new Array(-1);';
    section.appendChild(cannotCode);
    var cannotError = document.createElement('h2');
    cannotError.textContent = 'RangeError: Array size is not a small enough positive integer';
    section.appendChild(cannotError);
//--->
    var number = document.createElement('h2');
    number.textContent = 'NUMBER OF DIGITS AFTER DECIMAL IN tofixed() CAN ONLY BE 0-20';
    section.appendChild(number);
    var numberCode1 = document.createElement('h3');
    numberCode1.textContent = 'var price = 9.99;';
    section.appendChild(numberCode1);
    var numberCode2 = document.createElement('h3');
    numberCode2.textContent = 'price.toFixed(21); ' + ' \"21\"<-';
    section.appendChild(numberCode2);
    var numberError = document.createElement('h2');
    numberError.textContent = 'RangeError: toFixed() argument must be between 0 and 20';
    section.appendChild(numberError);
//--->
    var numberOf = document.createElement('h2');
    numberOf.textContent = 'NUMBER OF DIGITS IN toPrecion() CAN';
    section.appendChild(numberOf);
    var numberOfCode1 = document.createElement('h3');
    numberOfCode1.textContent = 'num = 2.3456';
    section.appendChild(numberOfCode1);
    var numberOfCode2 = document.createElement('h3');
    numberOfCode2.textContent = 'num.toPrecision(22); ' + ' \"22\"<-';
    section.appendChild(numberOfCode2);
    var numberOfError = document.createElement('h2');
    numberOfError.textContent = 'RangeError: toPrecision() argument must be between 0 and 21';
    section.appendChild(numberOfError);
  },
  //----------Error ------------------------>
  error: function(){
    clear();
    var errorTitle = document.createElement('h1');
    errorTitle.textContent = 'Error';
    section.appendChild(errorTitle);
    var errorSub = document.createElement('h2');
    errorSub.textContent = 'GENERIC ERROR OBJECT';
    section.appendChild(errorSub);
    var errorDescription = document.createElement('p');
    errorDescription.textContent = 'The generisc Error object is the template (or prototype) from which all other error objects are created.';
    section.appendChild(errorDescription);
  },
  //------------ NaN ------------------------>
  nan: function() {
    clear();
    var nanTitle = document.createElement('h1');
    nanTitle.textContent = 'NaN';
    section.appendChild(nanTitle);
    var nanSub = document.createElement('h2');
    nanSub.textContent = 'NOT AN ERROR';
    section.appendChild(nanSub);
    var nanDescription = document.createElement('p');
    nanDescription.textContent = 'Note: If you perform a mathematical operation using a value that is not a number, you end up with the value of NaN, not a type error.';
    section.appendChild(nanDescription);
//--->
    var notNumber = document.createElement('h2');
    notNumber.textContent = 'NOT A NUMBER';
    section.appendChild(notNumber);
    var notNumberCode = document.createElement('h3');
    notNumberCode.textContent = 'var total = 3 * \'Ivy\'; ' + ' \"Ivy\"<-';
    section.appendChild(notNumberCode);
  }

};
//------------Clear Section----------------->
function clear(){
  document.getElementById('cheat_sheet').innerHTML = '';
}
//-------------Event Listener---------------->
document.getElementById('syntax').addEventListener('click',cheatSheet.syntaxError);
document.getElementById('typeE').addEventListener('click',cheatSheet.typeError);
document.getElementById('range').addEventListener('click',cheatSheet.rangeError);
document.getElementById('uri').addEventListener('click',cheatSheet.uriError);
document.getElementById('nan').addEventListener('click',cheatSheet.nan);
document.getElementById('error').addEventListener('click',cheatSheet.error);
document.getElementById('reference').addEventListener('click',cheatSheet.referenceError);
