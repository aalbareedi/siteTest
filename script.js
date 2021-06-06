let openNavBtn = document.querySelector(".openNavBtn");
let closeNavBtn = document.querySelector(".closeNavBtn");
let navWindow = document.querySelector(".mobileNav");
let ctaBtn = document.querySelector(".ctaBtn");
let ctaBtnText = document.querySelector(".ctaBtnText");
let form = document.querySelector("form");
let closeFormBtn = document.querySelector(".closeFormBtn");
let header = document.querySelector("header");
let body = document.querySelector("body");
let headerHeight = document.querySelector("header").offsetHeight;
let navOverlay = document.querySelector(".navOverlay");
let mobileNavLink1 = document.querySelector("#mobileNavLink1");
let mobileNavLink2 = document.querySelector("#mobileNavLink2");
let mobileNavLink3 = document.querySelector("#mobileNavLink3");
let box2 = document.querySelector(".box2");
let box3 = document.querySelector(".box3");
let box4 = document.querySelector(".box4");
let landingBgImg = document.querySelector(".landingBgImg");

// openNavBtn.onclick = () => {
//   navWindow.classList.remove("displayHidden");
// };

// closeNavBtn.onclick = () => {
//   navWindow.classList.add("displayHidden");
// };
navWindow.onclick = (e) => {
  e.stopPropagation();
};

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

navOverlay.onclick = (e) => {
  e.stopPropagation();
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
  // body.scrollIntoView({ behavior: "smooth" });
  window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (box2.getBoundingClientRect().top < 0) {
    landingBgImg.classList.add("displayHidden");
  } else {
    landingBgImg.classList.remove("displayHidden");
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

mobileNavLink1.onclick = (e) => {
  e.stopPropagation();
  // box2.scrollIntoView({ behavior: "smooth" });
  window.scrollTo({
    top: distanceToBody(box2) - headerHeight,
    behavior: "smooth",
  });

  navWindow.classList.remove("showNav");
  navOverlay.classList.add("hiddenOverlay");
};

mobileNavLink2.onclick = (e) => {
  e.stopPropagation();
  // box3.scrollIntoView({ behavior: "smooth" });
  window.scrollTo({
    top: distanceToBody(box3) - headerHeight,
    behavior: "smooth",
  });

  navWindow.classList.remove("showNav");
  navOverlay.classList.add("hiddenOverlay");
};

mobileNavLink3.onclick = (e) => {
  e.stopPropagation();
  // box4.scrollIntoView({ behavior: "smooth" });
  window.scrollTo({
    top: distanceToBody(box4) - headerHeight,
    behavior: "smooth",
  });

  navWindow.classList.remove("showNav");
  navOverlay.classList.add("hiddenOverlay");
};

// setTimeout(function () {
//   alert(window.innerWidth + "," + window.innerHeight);
// }, 3000);
