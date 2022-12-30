const carousel = document.querySelector(".landing-skills-content");

const clone = carousel.cloneNode(true);
carousel.after(clone);

carousel.classList.add("animated");
clone.classList.add("animated");

const pauseButton = document.querySelector(".landing-skills .pause-button");

pauseButton.onclick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  carousel.classList.toggle("paused");
  clone.classList.toggle("paused");
  pauseButton.classList.toggle("is-paused");
};
