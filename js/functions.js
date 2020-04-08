function openNavMenu() {
  navWindow.classList.add("openNavWindow");
  navLogoBar.classList.add("openNavLogoBar");
  navToggleIcon.classList.add("is-active");
  navMenu.classList.add("openNavMenu");
}

function closeNavMenu() {
  navWindow.classList.remove("openNavWindow");
  navLogoBar.classList.remove("openNavLogoBar");
  navToggleIcon.classList.remove("is-active");
  navMenu.classList.remove("openNavMenu");
}
