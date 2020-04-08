// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function () {}, true);

navToggleBtn.onclick = function () {
  if (navLogoBar.classList.contains("openNavLogoBar") == false) {
    openNavMenu();
  } else {
    closeNavMenu();
  }
};

navLogoBar.onclick = function () {
  closeNavMenu();
  landing.classList.remove("displayHidden");
  aboutBox.classList.remove("openBox");
  portfolioBox.classList.remove("openBox");
  contactBox.classList.remove("openBox");
};

aboutLink.onclick = function () {
  closeNavMenu();
  aboutBox.classList.add("openBox");
  landing.classList.add("displayHidden");
  portfolioBox.classList.remove("openBox");
  contactBox.classList.remove("openBox");
};

portfolioLink.onclick = function () {
  closeNavMenu();
  portfolioBox.classList.add("openBox");
  landing.classList.add("displayHidden");
  aboutBox.classList.remove("openBox");
  contactBox.classList.remove("openBox");
};

contactLink.onclick = function () {
  closeNavMenu();
  contactBox.classList.add("openBox");
  landing.classList.add("displayHidden");
  aboutBox.classList.remove("openBox");
  portfolioBox.classList.remove("openBox");
};

// body.onscroll = function () {
//   if (scrollingElement.scrollTop > 0) {
//     backToTopBtn.classList.remove("opacityZero");
//   } else {
//     backToTopBtn.classList.add("opacityZero");
//   }
// };

// backToTopBtn.onclick = function(event) {
//   event.preventDefault();
//   event.stopPropagation();
// };
