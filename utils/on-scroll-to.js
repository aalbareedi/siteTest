export function onScrollTo(element, callback) {
    const observer = new IntersectionObserver(
        ([e]) => {
            if (e.intersectionRatio >= 1) {
                callback();
            }
        },
        { threshold: [1] }
    );

    observer.observe(element);
}
