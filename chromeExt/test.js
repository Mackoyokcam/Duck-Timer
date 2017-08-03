'use strict';

chrome.browserAction.onClicked.addListener(function () { //Fired when User Clicks ICON

  var minutes = 15;
  var seconds = 0;
  var timer = 1;

  function notifyMe() {
    if (Notification.permission !== 'granted')
      Notification.requestPermission();
    else {
      var audio = new Audio('quack.mp3');
      var notification;
      audio.play();

      if (!timer) {
        notification = new Notification('Ducky Timer App', {
          icon: 'imgs/notification_icon.png',
          body: 'Ducky Timer stopped.',
        });
        return;
      }

      if (minutes < 0) {
        notification = new Notification('Ducky Timer App', {
          icon: 'imgs/notification_icon.png',
          body: 'Your 15 minutes have expired. Take a break!',
        });
      } else if (minutes === 15){
        notification = new Notification('Ducky Timer App', {
          icon: 'imgs/notification_icon.png',
          body: 'Ducky Timer App started! You have 15 minutes. Good luck!',
        });
      } else {
        notification = new Notification('Ducky Timer App', {
          icon: 'imgs/notification_icon.png',
          body: 'Hey, you have ' + minutes + ' minutes remaining!',
        });
      }

      setTimeout(notification.close.bind(notification), 10000);

      notification.onclick = function () {
        // Do something
      };
    }
  }

  function handleStart() {
    notifyMe();
    timer = setInterval(function() {
      seconds--;
      // 1 minute has has passed
      if (seconds === -1) {
        minutes--;
        seconds = 59;
        if (messageInterval === 0) {
          // Send message to duck
          // theDuck.displayMessage();
          messageInterval = intervalHolder;
        }
        messageInterval--;
      }
      // Notify 5 minute mark
      if (minutes === 5 && seconds === 0) {
        notifyMe();
      }
      // Time expired
      if (minutes < 0) {
        notifyMe();
        clearInterval(timer);

      } else {
        // document.getElementById('timer').textContent = minutes + ':' + ('0' + seconds).slice(-2);
      }
    }, 1000);
  }
  handleStart();

});
