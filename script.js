const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");
const navOverlay = document.querySelector(".nav-overlay");
const navItems = document.querySelectorAll(".sidebar-list-item");

menuIconButton.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
  // sidebar.classList.toggle("open");
  navOverlay.classList.toggle("invisible");
});

navOverlay.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  navOverlay.classList.add("invisible");
});

// navItems.forEach((navItem) => {
//   navItem.addEventListener("click", () => {
//     console.log("clicked");
//     document.body.classList.remove("menu-open");
//     navOverlay.classList.add("invisible");
//   });
// });

const moreInfoBtns = document.querySelectorAll(".more-info-btn");
const projectWindows = document.querySelectorAll(".project-window");
const closeProjectBtns = document.querySelectorAll(".close-project-btn");

const body = document.querySelector("body");

moreInfoBtns.forEach((moreInfoBtn) => {
  moreInfoBtn.addEventListener("click", () => {
    const id = moreInfoBtn.getAttribute("data-modal-id");

    document.querySelector(`#${id}`).classList.remove("hidden");
    body.classList.add("overflow-hidden");
  });
});

projectWindows.forEach((projectWindow) => {
  const closeProjectBtn = projectWindow.querySelector(".close-project-btn");

  closeProjectBtn.addEventListener("click", () => {
    projectWindow.classList.add("hidden");
    body.classList.remove("overflow-hidden");
  });

  projectWindow.addEventListener("click", (e) => {
    // If `projectWindow` itself was just clicked, rather than a descendent
    if (e.target == e.currentTarget) {
      projectWindow.classList.add("hidden");
      body.classList.remove("overflow-hidden");
    }
  });
});

if (window.innerWidth <= 1000) {
  body.classList.remove("menu-open");
} else {
  body.classList.add("menu-open");
}

body.classList.remove("hidden");

window.addEventListener("resize", () => {
  if (window.innerWidth <= 1000) {
    body.classList.remove("menu-open");
  } else {
    body.classList.add("menu-open");
  }
});

let pageSize = document.querySelector(".pageSize");

setTimeout(function () {
  // Setting the innerHTML of an element removes all of the event listeners on its children
  pageSize.innerHTML = window.innerWidth + ", " + window.innerHeight;
  pageSize.classList.remove("hidden");
}, 3000);
