const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");

menuIconButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

const projectWindow = document.querySelector(".project-window");
const moreInfoBtn = document.querySelector(".more-info-btn");
const closeProjectBtn = document.querySelector(".close-project-btn");
const html = document.querySelector("html");
const body = document.querySelector("body");

moreInfoBtn.addEventListener("click", () => {
  projectWindow.classList.remove("hidden");
  // html.classList.add("overflow-hidden");
  body.classList.add("overflow-hidden");
});
closeProjectBtn.addEventListener("click", () => {
  projectWindow.classList.add("hidden");
  // html.classList.remove("overflow-hidden");
  body.classList.remove("overflow-hidden");
});

const swiper = new Swiper(".swiper", {
  loop: true,
  // slidesPerView: "auto",
  slidesPerView: 8,
  loopedSlides: 1,
  freeMode: true,
  // autoplay: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 4000,
  // allowTouchMove: false,
  // preventInteractionOnTransition: true,
  // initialSlide: 0,
  // longSwipesMs: 0,
  // observer: true,
  // observeParents: true,
  // watchSlidesVisibility: true,
  // watchSlidesProgress: true,
});
