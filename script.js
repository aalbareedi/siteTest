const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");

menuIconButton.addEventListener("click", () => {
  // if (document.body.classList.contains("menu-open")) {
  //   document.body.classList.remove("menu-open");
  //   // body.classList.remove("menu-open-even-on-mobile");
  // } else {
  //   document.body.classList.add("menu-open");

  //   // if (window.innerWidth < 740) {
  //   //   body.classList.add("menu-open-even-on-mobile");
  //   // }
  // }

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

  projectWindow.addEventListener("click", (e) => {
    // If `projectWindow` itself was just clicked, rather than a descendent
    if (e.target == e.currentTarget) {
      projectWindow.classList.add("hidden");
      body.classList.remove("overflow-hidden");
    }
  });
});

// const projectWindowContents = document.querySelectorAll(
//   ".project-window-content"
// );

// projectWindowContents.forEach((projectContent) => {
//   projectContent.addEventListener("click", (e) => {
//     e.stopPropagation();
//   });
// });

// window.addEventListener("resize", () => {
//   console.log(window.innerWidth);

//   body.classList.add("no-animation");
//   console.log(document.querySelector(".sidebar").offsetHeight);
//   if (window.innerWidth < 740) {
//     body.classList.remove("menu-open");
//   } else {
//     body.classList.add("menu-open");
//   }
//   body.classList.remove("no-animation");
// });

// body.classList.add("hidden");
// console.log(body.offsetHeight);
// if (window.innerWidth < 740) {
//   body.classList.remove("menu-open");
// } else {
//   body.classList.add("menu-open");
// }
// body.classList.remove("hidden");
