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
  let key = parseInt(
    year + month + date + hours + minutes + seconds + milliSecond
  );
  if (key.toString().length != 17) {
    throw 'Key Generation Error : Key length is differed';
  }
  return [key, now];
}

//add event listener for add product
const addProductButton = document
  .getElementById('addProduct')
  .addEventListener('click', addProduct);
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

function getUserData() {
  let productName = document.getElementById('product-name').value;
  let amount = document.getElementById('amount').value;
  let count = document.getElementById('count').value;
  document.getElementById('product-name').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('count').value = '';

  document
    .getElementById('product-name')
    .previousElementSibling.classList.remove('active');
  document
    .getElementById('product-name')
    .nextElementSibling.classList.remove('active');
  document
    .getElementById('amount')
    .previousElementSibling.classList.remove('active');
  document
    .getElementById('amount')
    .nextElementSibling.classList.remove('active');
  document
    .getElementById('count')
    .previousElementSibling.classList.remove('active');
  document
    .getElementById('count')
    .nextElementSibling.classList.remove('active');

  return [true, productName, amount, count];
}

function addProduct() {
  localSetup();
  let flag, productName, amount, count;
  const arr = getUserData();
  flag = arr[0];
  if (flag) {
    productName = arr[1];
    amount = arr[2];
    count = arr[3];
    let [key, time] = getKey();
    keys[0].unshift(key);
    let x = {};
    x[key] = {
      name: productName,
      amount: +amount,
      count: +count,
      total: amount * amount,
      time: time,
    };
    Object.assign(data, x);
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('keys', JSON.stringify(keys));
  }

  console.log(data);
  console.log(keys[0]);
}

// addProduct();
// localSetup();
// console.log(data);
// console.log(keys[0]);
// clearAllData();

document.getElementById('delete-data').addEventListener('click', clearAllData);

function clearAllData() {
  localStorage.clear();
  localSetup();
  console.log('Cleared local storage');
  
}
