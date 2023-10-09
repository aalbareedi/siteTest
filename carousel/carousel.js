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
