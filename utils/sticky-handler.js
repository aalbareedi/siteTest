// Import and expand on polyfills if necessary (https://caniuse.com/?search=CSSStyleValue)
if (!window.CSSStyleValue) {
    // TODO: Use Promise.all
    const { default: polyfill } = await import(
        "https://cdn.jsdelivr.net/npm/css-typed-om@0.4.0/index.es.min.js"
    );
    polyfill(window);
    const { default: convert } = await import(
        "https://cdn.jsdelivr.net/npm/css-unit-converter@1.1.2/+esm"
    );

    // NOTE: Polyfill lacks a `parse` method
    CSSStyleValue.parse = (property, cssText) => {
        const numbers = cssText.match(/-?[0-9]\d*(\.\d+)?/g);
        const units = cssText.match(/(?!-?[0-9]\d*(\.\d+)?)\w+/g);

        if (!CSS.supports(property, cssText)) {
            throw new Error(
                `CSS property "${property}" does not support value "${cssText}".`
            );
        }

        if (numbers.length == 0) {
            throw new Error(
                `CSS property value "${cssText}" must contain a number.`
            );
        }

        if (numbers.length > 1) {
            throw new Error(
                `CSS property value "${cssText}" may only contain one number.`
            );
        }

        if (units.length == 0) {
            throw new Error(
                `CSS property value "${cssText}" must contain a unit.`
            );
        }

        if (units.length > 1) {
            throw new Error(
                `CSS property value "${cssText}" may only contain one unit.`
            );
        }

        if (!CSS[units[0]]) {
            throw new Error(`Unsupported unit in value "${cssText}".`);
        }

        const { value, unit } = CSS[units[0]](numbers[0]);

        return Object.defineProperties(
            {
                value,
                unit,
                // NOTE: Polyfill lacks a `to` method
                to(newUnit) {
                    return CSS[newUnit](
                        convert(this.value, this.unit, newUnit)
                    );
                },
            },
            Object.getOwnPropertyDescriptors(CSS[units[0]](numbers[0]))
        );
    };
}

/**
 * @param {Element} element
 * @param {function} callback
 */
export function onStick(element, callback) {
    // const style = getComputedStyle(element);
    // const top = CSSStyleValue.parse("top", style.top);
    // const marginTop = CSS.px(top.to("px").value * -1 - 1);

    // if (style.position != "sticky") {
    //     throw new Error("Element must have `position: sticky`");
    // }

    const observer = new IntersectionObserver(
        ([e]) => {
            if (e.intersectionRatio < 1) {
                callback();
            }
        },
        { threshold: [1], rootMargin: `-61px 0px 0px 0px` }
    );

    observer.observe(element);
}

/**
 * @param {Element} element
 * @param {function} callback
 */
export function onUnstick(element, callback) {
    const style = getComputedStyle(element);
    const top = CSSStyleValue.parse("top", style.top);
    const marginTop = CSS.px(top.to("px").value * -1 - 1);

    if (style.position != "sticky") {
        throw new Error("Element must have `position: sticky`");
    }

    const observer = new IntersectionObserver(
        ([e]) => {
            if (e.intersectionRatio >= 1) {
                callback();
            }
        },
        { threshold: [1], rootMargin: `${marginTop.value}px 0px 0px 0px` }
    );

    observer.observe(element);
}
