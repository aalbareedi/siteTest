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
  speed: 4000,
  loop: true,
  freeMode: true,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    stopOnLastSlide: false,
    pauseOnMouseEnter: true,
  },
  slidesPerView: "auto",
  loopFillGroupWithBlank: true,
  normalizeSlideIndex: true,
  spaceBetween: 44,
  // preventInteractionOnTransition: true,
});

// document.querySelector(".landing-skills").onmouseenter = () => {
//   console.log("test");
//   swiper.autoplay.stop();
// };

// $(".swiper-container").hover(
//   function () {
//     this.swiper.autoplay.stop();
//   },
//   function () {
//     this.swiper.autoplay.start();
//   }
// );
