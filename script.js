const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");

menuIconButton.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
  // sidebar.classList.toggle("open");
});

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

  projectWindow.addEventListener("click", () => {
    projectWindow.classList.add("hidden");
    body.classList.remove("overflow-hidden");
  });
});

const projectWindowContents = document.querySelectorAll(
  ".project-window-content"
);

projectWindowContents.forEach((projectContent) => {
  projectContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
