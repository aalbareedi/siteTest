const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");

menuIconButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

const projectWindow = document.querySelector(".project-window");
const moreInfoBtn = document.querySelector(".more-info-btn");
const closeProjectBtn = document.querySelector(".close-project-btn");
moreInfoBtn.addEventListener("click", () => {
  projectWindow.classList.toggle("hidden");
});
closeProjectBtn.addEventListener("click", () => {
  projectWindow.classList.toggle("hidden");
});
