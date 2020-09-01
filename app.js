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

function alertError(errorString) {
  M.toast({ html: errorString });
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

  if (keys[0] == undefined || keys[0].length == 0) {
    document
      .getElementsByClassName('time-line')[0]
      .setAttribute('style', 'display : none;');
    // console.log(document.getElementsByClassName('time-line'));
  } else {
    document
      .getElementsByClassName('time-line')[0]
      .setAttribute('style', 'display : block;');
  }
  return [data, keys];
}

function getUserData() {
  let productName = document.getElementById('product-name').value;
  let amount = document.getElementById('amount').value;
  let count = document.getElementById('count').value;
  let flag;

  // console.log(productName, amount, count);
  if (
    productName === '' ||
    amount === '' ||
    count === '' ||
    amount <= 0 ||
    count <= 0
  ) {
    flag = false;
  } else {
    flag = true;
  }

  if (productName === '') {
    alertError('Product Name can not be Empty');
  } else if (amount === '') {
    alertError('Amount can not be Empty');
  } else if (count === '') {
    alertError('Count can not be Empty');
  } else if (amount < 0) {
    alertError('Amount can not be Negative');
  } else if (count < 0) {
    alertError('Count can not be Negative');
  }
  if (flag) {
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
  }
  return [flag, productName, amount, count];
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
    alertError('Item added successfully');
    displayTimeLine();
  }
}

document.getElementById('delete-data').addEventListener('click', clearAllData);

function clearAllData() {
  localStorage.clear();
  localSetup();
  alertError('Cleared local storage successfully');
  displayTimeLine();
}

function changeCollapsible(e) {
  // console.log(e.target.parentElement);
  // console.log(e.target.parentElement.children[1].style.display)
  try {
    if (e.target.parentElement.children[1].nodeName == 'DIV') {
      if (
        e.target.parentElement.children[1].style.display == '' ||
        e.target.parentElement.children[1].style.display == 'block'
      ) {
        e.target.parentElement.children[1].setAttribute(
          'style',
          'display : none;'
        );
      } else {
        e.target.parentElement.children[1].setAttribute(
          'style',
          'display : block;'
        );
      }
    }
  } catch (error) {
    // console.log(error)
  }
}

function displayTimeLine() {
  let [data, keys] = localSetup();
  console.table(data);
  console.log(keys);

  let collapsible = document.getElementsByClassName('collapsible')[0];
  let html = '';
  keys[0].forEach((key) => {
    // console.log(data[key]);
    let product = data[key];
    let name = product.name;
    let amount = product.amount;
    let count = product.count;
    let total = product.total;
    let time = new Date(product.time);
    let date = time.getUTCDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    let timing = time.toString().split(' ')[4];
    let day = time.toString().split(' ')[0];

    html += `
    <li class='${key}'>
         <div class="collapsible-header">
             ${name}
             <span class="badge"> <b> ₹ ${total}</b></span>
             <i class="material-icons delete-icon">cancel</i>
         </div>
         <div class="collapsible-body">
             <p>Price per item :<b> ₹${amount}</b></p>
             <p>Product count  :<b> ${count}</b></p
             <p>Date           :<b> ${date}-${
      month + 1
    }-${year} (${day})</b></p>
             <p>Time           :<b> ${timing}</b><p>
         </div>
    </li>`;
  });

  collapsible.innerHTML = html;

  let collapsibleHeader = document.querySelectorAll('.collapsible-header');
  collapsibleHeader.forEach((ele) =>
    ele.addEventListener('click', (e) => changeCollapsible(e))
  );
  let deleteIcon = document.querySelectorAll('.delete-icon');
  deleteIcon.forEach((ele) =>
    ele.addEventListener('click', (e) => {
      console.log(e.target.parentElement.parentElement.className);
      let ID = e.target.parentElement.parentElement.className;
      // console.log(data, keys);
      delete data[ID];
      const index = keys[0].indexOf(+ID);
      if (index > -1) {
        keys[0].splice(index, 1);
      }
      // console.log(data);
      // console.log(keys);

      localStorage.setItem('data', JSON.stringify(data));
      localStorage.setItem('keys', JSON.stringify(keys));
      displayTimeLine();
      e.preventDefault();
    })
  );
}

displayTimeLine();
