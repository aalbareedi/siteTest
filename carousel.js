const carousel = document.querySelector(".landing-skills-content");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.target.offsetLeft < 0) {
        carousel.classList.remove("animated");

        // Trigger "reflow"
        carousel.offsetHeight;

        carousel.classList.add("animated");

        carousel.append(entry.target);
      }
    });
  },
  {
    root: document.querySelector(".landing-skills-content"),
    threshold: [0],
  }
);

document.querySelectorAll(".swiper-skill-img-wrapper").forEach((element) => {
  observer.observe(element);
});

carousel.classList.add("animated");

// carousel.onclick = (e) => {
//   e.preventDefault();
//   e.stopPropagation();

//   console.log("test");
//   document
//     .querySelectorAll(".swiper-skill-img-wrapper")
//     .forEach((element, i) => {
//       element.classList.remove("animated");
//       element.style.left = "0px";
//     });
// };
