let openNavBtn = document.querySelector(".openNavBtn");
let closeNavBtn = document.querySelector(".closeNavBtn");
let navWindow = document.querySelector("nav");
let ctaBtn = document.querySelector(".ctaBtn");
let ctaBtnText = document.querySelector(".ctaBtnText");
let form = document.querySelector("form");
let closeFormBtn = document.querySelector(".closeFormBtn");
let header = document.querySelector("header");
let body = document.querySelector("body");
let headerHeight = document.querySelector("header").offsetHeight;
let navOverlay = document.querySelector(".navOverlay");

// openNavBtn.onclick = () => {
//   navWindow.classList.remove("displayHidden");
// };

// closeNavBtn.onclick = () => {
//   navWindow.classList.add("displayHidden");
// };

openNavBtn.onclick = (e) => {
  e.stopPropagation();
  navWindow.classList.add("showNav");
  navOverlay.classList.remove("hiddenOverlay");
};

closeNavBtn.onclick = (e) => {
  e.stopPropagation();
  navWindow.classList.remove("showNav");
  navOverlay.classList.add("hiddenOverlay");
};

navOverlay.onclick = () => {
  navWindow.classList.remove("showNav");
  navOverlay.classList.add("hiddenOverlay");
};

ctaBtn.onclick = () => {
  form.classList.add("showForm");
};

closeFormBtn.onclick = () => {
  form.classList.remove("showForm");
};

header.onclick = () => {
  body.scrollIntoView({ behavior: "smooth" });
};

// we get the buttons initial position outside the scroll event
// so it doesnt change when we add the class to it
let ctaBtnPosition = distanceToBody(ctaBtn);

body.onscroll = () => {
  let bodyScroll = document.documentElement.scrollTop || body.scrollTop;

  if (bodyScroll > ctaBtnPosition - headerHeight) {
    ctaBtn.classList.add("btnScrolled");
  } else {
    ctaBtn.classList.remove("btnScrolled");
  }

  // console.log(ctaBtnPosition);
};

function distanceToBody(element) {
  let parent = element;
  let total = 0;

  do {
    total += parent.offsetTop;
    parent = parent.offsetParent;
  } while (parent != body);

  return total;
}

setTimeout(function () {
  alert(window.innerWidth + "," + window.innerHeight);
}, 3000);
