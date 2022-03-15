var navMenuBtn = document.querySelector(".nav-menu-btn");
var screenOverlay = document.querySelector(".screen-overlay");
var wrapper = document.querySelector(".wrapper");

let navMenuOpt = document.getElementsByClassName("nav-menu-option");
let navOptBox = document.getElementsByClassName("nav-option-box");
let navArrow = document.getElementsByClassName("nav-menu-arrow");

navMenuBtn.onclick = function () {
  navMenuBtn.classList.toggle("is-active");
  screenOverlay.classList.toggle("displayHidden");
  wrapper.classList.toggle("open-menu");
};
screenOverlay.onclick = function () {
  navMenuBtn.classList.toggle("is-active");
  screenOverlay.classList.toggle("displayHidden");
  wrapper.classList.toggle("open-menu");
};

for (let i = 0; i < navMenuOpt.length; i++) {
  navMenuOpt[i].onclick = function () {
    navArrow[i].classList.toggle("nav-arrow-open");
    // navOptBox[i].classList.toggle("displayHidden");
    navOptBox[i].classList.toggle("open-nav-option");
  };
}
