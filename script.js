const header = document.querySelector(".header");
disableScrollBehind(header);

const navDock = document.querySelector(".nav-dock");
disableScrollBehind(navDock);
navDock.onscroll = (e) => e.stopPropagation();
navDock.onscroll = (e) => e.preventDefault();
navDock.ontouchmove = (e) => e.stopPropagation();
navDock.ontouchmove = (e) => e.preventDefault();

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
  const id = projectBtn.getAttribute("data-modal-id");
  const title = document.querySelector(`#${id} .project-window-title`);
  if (title) {
    disableScrollBehind(title);
  }

  const content = document.querySelector(`#${id} .project-window-content`);
  if (content) {
    disableScrollBehind(content);
  }

  projectBtn.addEventListener("click", () => {
    showModal(document.querySelector(`#${id}`));
  });
});

projectWindows.forEach((projectWindow) => {
  const closeProjectBtn = projectWindow.querySelector(".close-project-btn");

  closeProjectBtn.addEventListener("click", () => {
    hideModal(projectWindow);
  });

  projectWindow.addEventListener("click", (e) => {
    // If `projectWindow` itself was just clicked, rather than a descendent
    if (e.target == e.currentTarget) {
      hideModal(projectWindow);
    }
  });
});

function showModal(modal) {
  if (modal) {
    modal.classList.remove("hidden");
  }
  // html.classList.add("overflow-hidden");
  body.classList.add("overflow-hidden");
}

function hideModal(modal) {
  if (modal) {
    modal.classList.add("hidden");

    if (modal.dataset.root) {
      history.replaceState({}, null, modal.dataset.root);
      document.body.dataset.path = modal.dataset.root;
    }
  }
  // html.classList.remove("overflow-hidden");
  body.classList.remove("overflow-hidden");
}

if (window.innerWidth <= 1100) {
  body.classList.remove("menu-open");
} else {
  body.classList.add("menu-open");
}

body.classList.remove("hidden");

let previousWidth = window.innerWidth;

window.addEventListener("resize", () => {
  if (window.innerWidth == previousWidth) {
    return;
  }
  previousWidth = window.innerWidth;

  if (window.innerWidth <= 1100) {
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

window.addEventListener("load", () => {
  setTimeout(() => {
    header.classList.remove("hidden");
    sidebar.classList.remove("hidden");
    navDock.classList.remove("hidden");
  }, 100);
});

new Splide(".splide").mount();

const contactForm = document.querySelector("#contact-form");

contactForm.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("focus", () => {
    navDock.classList.add("hidden-on-touchscreen");
  });
  input.addEventListener("blur", () => {
    navDock.classList.remove("hidden-on-touchscreen");
  });
});
