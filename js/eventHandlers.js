// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function () {}, true);

navToggleBtn.onclick = function () {
  if (navLogoBar.classList.contains("openNavLogoBar") == false) {
    // openNavMenu();
    navWindow.classList.add("openNavWindow");
    navLogoBar.classList.add("openNavLogoBar");
    navToggleIcon.classList.add("is-active");
    navMenu.classList.add("openNavMenu");
  } else {
    // closeNavMenu();
    navWindow.classList.remove("openNavWindow");
    navToggleIcon.classList.remove("is-active");
    navMenu.classList.remove("openNavMenu");

    // if nav is open, and toggle Btn is clicked, then close logo bar only if we are on home page & NOT about, portfolio, contact pages.
    if (
      portfolioBox.classList.contains("openBox") == false &&
      contactBox.classList.contains("openBox") == false &&
      aboutBox.classList.contains("openBox") == false
    ) {
      navLogoBar.classList.remove("openNavLogoBar");
    }
  }
};

navLogoBar.onclick = function () {
  // navWindow.classList.remove("openNavWindow");
  // navLogoBar.classList.remove("openNavLogoBar");
  // navToggleIcon.classList.remove("is-active");
  // navMenu.classList.remove("openNavMenu");
  // closeNavMenu();
  // landing.classList.remove("displayHidden");
  // aboutBox.classList.remove("openBox");
  // portfolioBox.classList.remove("openBox");
  // contactBox.classList.remove("openBox");
};

aboutLink.onclick = function () {
  // navWindow.classList.remove("openNavWindow");
  // navLogoBar.classList.remove("openNavLogoBar");
  navToggleIcon.classList.remove("is-active");
  navMenu.classList.remove("openNavMenu");
  // closeNavMenu();
  aboutBox.classList.add("openBox");
  landing.classList.add("displayHidden");
  portfolioBox.classList.remove("openBox");
  contactBox.classList.remove("openBox");
};

portfolioLink.onclick = function () {
  // navWindow.classList.remove("openNavWindow");
  // navLogoBar.classList.remove("openNavLogoBar");
  navToggleIcon.classList.remove("is-active");
  navMenu.classList.remove("openNavMenu");
  // closeNavMenu();
  portfolioBox.classList.add("openBox");
  landing.classList.add("displayHidden");
  aboutBox.classList.remove("openBox");
  contactBox.classList.remove("openBox");
};

contactLink.onclick = function () {
  // navWindow.classList.remove("openNavWindow");
  // navLogoBar.classList.remove("openNavLogoBar");
  navToggleIcon.classList.remove("is-active");
  navMenu.classList.remove("openNavMenu");
  // closeNavMenu();
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
