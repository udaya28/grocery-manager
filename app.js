'use strict';
// nav bar change code
const navBar = document.querySelectorAll('#navBar li a');
navBar.forEach((element) =>
  element.addEventListener('click', (e) => changeTab(e))
);
const home = document.getElementById('home');
const dashBoard = document.getElementById('dashBoard');
const settings = document.getElementById('settings');

function changeTab(e) {
  navBar.forEach((element) => {
    element.parentElement.classList.remove('active');
  });
  switch (e.target.id) {
    case 'homeButton':
      home.style.display = 'block';
      dashBoard.style.display = 'none';
      settings.style.display = 'none';
      e.target.parentElement.classList.add('active');
      break;
    case 'dashBoardButton':
      home.style.display = 'none';
      dashBoard.style.display = 'block';
      settings.style.display = 'none';
      e.target.parentElement.classList.add('active');
      break;
    case 'settingsButton':
      home.style.display = 'none';
      dashBoard.style.display = 'none';
      settings.style.display = 'block';
      e.target.parentElement.classList.add('active');
      break;
  }
}

//get key
function getKey() {
  let now = new Date();
  let year = now.getFullYear().toString();
  let month = (now.getMonth() + 1).toString();
  let date = now.getDate().toString();
  let hours = now.getHours().toString();
  let minutes = now.getMinutes().toString();
  let seconds = now.getSeconds().toString();
  let milliSecond = now.getMilliseconds().toString();
  if (month.length == 1) {
    month = '0' + month;
  }
  if (date.length == 1) {
    date = '0' + date;
  }
  if (hours.length == 1) {
    hours = '0' + hours;
  }
  if (minutes.length == 1) {
    minutes = '0' + minutes;
  }
  if (seconds.length == 1) {
    seconds = '0' + seconds;
  }
  if (milliSecond.length == 1) {
    milliSecond = '00' + milliSecond;
  } else if (milliSecond.length == 2) {
    milliSecond = '0' + milliSecond;
  }
  // console.log(year);
  // console.log(month);
  // console.log(date);
  // console.log(hours);
  // console.log(minutes);
  // console.log(seconds);
  // console.log(milliSecond);
  let key = parseInt(
    year + month + date + hours + minutes + seconds + milliSecond
  );
  if (key.toString().length != 17) {
    throw 'Key Generation Error : Key length is differed';
  }
  return [key, now];
}

//data declaration
var keys = {};
var data = {};

//get data from the local storage
function localSetup() {
  if (localStorage.getItem('data') == null) {
    localStorage.setItem('data', JSON.stringify({}));
  } else {
    data = JSON.parse(localStorage.getItem('data'));
  }

  if (localStorage.getItem('keys') == null) {
    localStorage.setItem('keys', JSON.stringify({ 0: [] }));
  } else {
    keys = JSON.parse(localStorage.getItem('keys'));
  }
  return true;
}

function addProduct() {
  localSetup();
  let [key, time] = getKey();
  keys[0].unshift(key);
  let x = {};
  x[key] = time;
  Object.assign(data, x);
  localStorage.setItem('data', JSON.stringify(data));
  localStorage.setItem('keys', JSON.stringify(keys));
}

addProduct();
console.log(data);
console.log(keys[0]);
// clearAllData();FFF

function clearAllData() {
  localStorage.clear();
  localSetup();
}
