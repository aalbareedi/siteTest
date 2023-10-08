// const carousels = document.querySelectorAll(".carousel");

// carousels.forEach((carousel) => {
//     const clone = carousel.cloneNode(true);
//     carousel.after(clone);

//     carousel.classList.add("animated");
//     clone.classList.add("animated");
// });

// // NOTE: This assumes that you have one pause button for every carousel...

// const pauseButtons = document.querySelectorAll(".pause-btn");

// pauseButtons.forEach((pauseButton, i) => {
//     pauseButton.onclick = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         carousels[i].classList.toggle("paused");
//         carousels[i].nextElementSibling.classList.toggle("paused");
//         pauseButton.classList.toggle("is-paused");
//     };
// });

export function makeCarouselWork(carousel) {
    const clone = carousel.cloneNode(true);
    carousel.after(clone);

    carousel.classList.add("animated");
    clone.classList.add("animated");
}

export function makePauseButtonWork(button, carousel) {
    button.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        carousel.classList.toggle("paused");
        carousel.nextElementSibling.classList.toggle("paused");
        button.classList.toggle("is-paused");
    };
}
