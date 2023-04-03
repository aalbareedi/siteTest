const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");
const navOverlay = document.querySelector(".nav-overlay");
const navItems = document.querySelectorAll(".sidebar-list-item");

menuIconButton.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
  // sidebar.classList.toggle("open");
  if (window.innerWidth <= 1100) {
    navOverlay.classList.toggle("invisible");
  }
});

navOverlay.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  navOverlay.classList.add("invisible");
});

navItems.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    console.log("clicked");

    if (window.innerWidth <= 1100) {
      document.body.classList.remove("menu-open");
      navOverlay.classList.add("invisible");
    }
  });
});

const projectBtns = document.querySelectorAll(".project-btn");
const projectWindows = document.querySelectorAll(".project-window");
const closeProjectBtns = document.querySelectorAll(".close-project-btn");

const html = document.querySelector("html");
const body = document.querySelector("body");

projectBtns.forEach((projectBtn) => {
  projectBtn.addEventListener("click", () => {
    // alert("click");
    const id = projectBtn.getAttribute("data-modal-id");
    // alert("id: " + id);

    document.querySelector(`#${id}`).classList.remove("hidden");
    // alert("element: " + document.querySelector(`#${id}`));
    html.classList.add("overflow-hidden");
    body.classList.add("overflow-hidden");
  });
});

projectWindows.forEach((projectWindow) => {
  const closeProjectBtn = projectWindow.querySelector(".close-project-btn");

  closeProjectBtn.addEventListener("click", () => {
    projectWindow.classList.add("hidden");
    html.classList.remove("overflow-hidden");
    body.classList.remove("overflow-hidden");
  });

  projectWindow.addEventListener("click", (e) => {
    // If `projectWindow` itself was just clicked, rather than a descendent
    if (e.target == e.currentTarget) {
      projectWindow.classList.add("hidden");
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    }
  });
});

if (window.innerWidth <= 1100) {
  body.classList.remove("menu-open");
} else {
  body.classList.add("menu-open");
}

body.classList.remove("hidden");

window.addEventListener("resize", () => {
  if (window.innerWidth <= 1100) {
    body.classList.remove("menu-open");
  } else {
    body.classList.add("menu-open");
  }
});

// let pageSize = document.querySelector(".pageSize");

// setTimeout(function () {
//   // Setting the innerHTML of an element removes all of the event listeners on its children
//   pageSize.innerHTML = window.innerWidth + ", " + window.innerHeight;
//   pageSize.classList.remove("hidden");
// }, 3000);

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
