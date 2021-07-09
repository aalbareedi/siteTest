// Remove Gray Highlight When Tapping Links in Mobile Safari + mobile active states
document.addEventListener("touchstart", function () {}, true);

let pageSize = document.querySelector(".pageSize");
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
let box5 = document.querySelector(".box5");
let box6 = document.querySelector(".box6");
let boxes = document.querySelectorAll(".box");
let landingBgImg = document.querySelector(".landingBgImg");
let box5parallaxImg = document.querySelector(".box5parallaxImg");
let desktopNav = document.querySelector(".desktopNav");
let desktopNavLink1 = document.querySelector("#desktopNavLink1");
let desktopNavLink2 = document.querySelector("#desktopNavLink2");
let desktopNavLink3 = document.querySelector("#desktopNavLink3");
let desktopNavLink4 = document.querySelector("#desktopNavLink4");
let desktopNavLinks = document.querySelectorAll(".desktopNavLink");
let navSublinks = document.querySelectorAll(
  // selects all elements that have href = #
  ".navSublink[href='#'], .desktopNavLink[href='#']"
);
let toggleText = document.querySelector(".toggleText");
let moreTextBtn = document.querySelector(".moreTextBtn");
let lessTextBtn = document.querySelector(".lessTextBtn");

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
  // alert("header clicked");
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

  // hiding parallax imgs to avoid appearing after scroll.
  if (box2.getBoundingClientRect().top < 0) {
    landingBgImg.classList.add("displayHidden");
  } else {
    landingBgImg.classList.remove("displayHidden");
  }

  if (box6.getBoundingClientRect().top < 0) {
    box5parallaxImg.classList.add("displayHidden");
  } else {
    box5parallaxImg.classList.remove("displayHidden");
  }

  // console.log(ctaBtnPosition);
};

function distanceToBody(element) {
  let body = document.querySelector("body");
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

desktopNav.onclick = (e) => {
  e.stopPropagation();
};

// scrolling to desktopNavLinks
for (let i = 0; i < desktopNavLinks.length; i++) {
  //console.log(desktopNavLinks[i].href);

  desktopNavLinks[i].onclick = () => {
    window.scrollTo({
      top: distanceToBody(boxes[i]) - headerHeight,
      behavior: "smooth",
    });
  };
}

for (let i = 0; i < navSublinks.length; i++) {
  // Replaces first .onclick
  // navSublinks[i].onclick = (e) => {
  //   e.preventDefault();
  // };

  // Doesn't replace .onclick
  navSublinks[i].addEventListener("click", (e) => {
    e.preventDefault();
  });
}

const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  // direction: "vertical",
  loop: true,
  autoplay: { delay: 4000 },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: ".swiper-scrollbar",
  // },
});

moreTextBtn.onclick = () => {
  toggleText.classList.remove("lessToggleText");
  moreTextBtn.classList.add("displayHidden");
  lessTextBtn.classList.remove("displayHidden");
};

lessTextBtn.onclick = () => {
  toggleText.classList.add("lessToggleText");
  moreTextBtn.classList.remove("displayHidden");
  lessTextBtn.classList.add("displayHidden");
};
setTimeout(function () {
  // Setting the innerHTML of an element removes all of the event listeners on its children
  pageSize.innerHTML = window.innerWidth + "," + window.innerHeight;
  pageSize.classList.remove("displayHidden");
}, 3000);

// from bottom up
ScrollReveal().reveal(".scrollReveal", {
  viewOffset: {
    bottom: 60,
  },
  distance: "30px",
});
// from left
ScrollReveal().reveal(".scrollRevealX", {
  origin: "left",
  distance: "30px",
  viewOffset: {
    bottom: 60,
  },
});
