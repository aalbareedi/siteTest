/**
 * The average speed of all scrolling in the last second
 */
export let scrollSpeed = 0;

const scrollingElement =
    document.scrollingElement || document.documentElement || body;

let oldScrollTop = 0;

window.addEventListener("scroll", () => {
    const scrollTop = scrollingElement.scrollTop;

    const distance = oldScrollTop - scrollTop;

    scrollSpeed = distance;

    setTimeout(() => {
        oldScrollTop = scrollTop;
    }, 1000);
});
