const navBar = document.querySelectorAll('#navBar li a');
navBar.forEach((element) =>
  element.addEventListener('click', (e) => changeTab(e))
);
const home = document.getElementById('home');
const dashBoard = document.getElementById('dashBoard');
const settings = document.getElementById('settings');


function changeTab(e) {
    navBar.forEach((element)=>{
        element.parentElement.classList.remove("active");
    })
  switch (e.target.id) {
    case 'homeButton':
        home.style.display = "block";
        dashBoard.style.display = "none";
        settings.style.display = "none";
        e.target.parentElement.classList.add("active");
      break;
    case 'dashBoardButton':
        home.style.display = "none";
        dashBoard.style.display = "block";
        settings.style.display = "none";
        e.target.parentElement.classList.add("active");
      break;
    case 'settingsButton':
        home.style.display = "none";
        dashBoard.style.display = "none";
        settings.style.display = "block";
        e.target.parentElement.classList.add("active");
      break;
  }
}

