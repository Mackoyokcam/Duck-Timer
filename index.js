'use strict';



function storeOnClick () {

   console.log('the function is working')
  var userName = document.getElementById('userName').value;
  localStorage.userName = JSON.stringify(userName);

}

document.getElementById('userNameSubmitButton').addEventListener('click', storeOnClick);

storeOnClick();
