'use strict';



function storeOnClick () {

  console.log('the function is working');
  var userName = document.getElementById('userName').value;
  localStorage.userName = JSON.stringify(userName);
  //add the function to open next page 

}

document.getElementById('userNameSubmitButton').addEventListener('click', storeOnClick);

storeOnClick();
