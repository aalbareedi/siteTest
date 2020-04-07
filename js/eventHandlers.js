// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function () {}, true);

navToggleBtn.onclick = function () {
  if (navLogoBar.classList.contains("openNavLogoBar") == false) {
    navLogoBar.classList.add("openNavLogoBar");
    navToggleIcon.classList.add("is-active");
    navMenu.classList.add("openNavMenu");
    // openNavMenu();
  } else {
    // closeNavMenu();
    navLogoBar.classList.remove("openNavLogoBar");
    navToggleIcon.classList.remove("is-active");
    navMenu.classList.remove("openNavMenu");
  }
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
