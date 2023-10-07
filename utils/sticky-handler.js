/**
 * @param {Element} element
 * @param {function} callback
 */
export function onStick(element, callback) {
    const style = getComputedStyle(element);
    const top = CSSUnitValue.parse(style.top);
    const marginTop = CSS.px(top.to("px").value * -1 - 1);

    if (style.position != "sticky") {
        throw new Error("Element must have `position: sticky`");
    }

    const observer = new IntersectionObserver(
        ([e]) => {
            if (e.intersectionRatio < 1) {
                callback();
            }
        },
        { threshold: [1], rootMargin: `${marginTop.value}px 0px 0px 0px` }
    );

    observer.observe(element);
}

/**
 * @param {Element} element
 * @param {function} callback
 */
export function onUnstick(element, callback) {
    const style = getComputedStyle(element);
    const top = CSSUnitValue.parse(style.top);
    const marginTop = CSS.px(top.to("px").value * -1 - 1);

    if (style.position != "sticky") {
        throw new Error("Element must have `position: sticky`");
    }

    const observer = new IntersectionObserver(
        ([e]) => {
            if (e.intersectionRatio <= 1) {
                callback();
            }
        },
        { threshold: [1], rootMargin: `${marginTop.value}px 0px 0px 0px` }
    );

    observer.observe(element);
}
