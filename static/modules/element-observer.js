/**
 * Calls the given function when an element matching the given selector appears in the document.
 * @param {string} selector - The CSS selector of the element to wait for.
 * @param {Function} callback - The function to call when the element appears.
 */
export function onElementAdded(parent, selector, callback) {
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((x) => {
                    if (!(x instanceof Element)) {
                        return;
                    }

                    if (x.matches(selector) || x.querySelector(selector)) {
                        callback();
                    }
                });
            }
        }
    });

    observer.observe(parent, {
        childList: true,
        subtree: true,
    });
}

/**
 * Calls the given function when an element matching the given selector disappears from the document.
 * @param {string} selector - The CSS selector of the element to wait for.
 * @param {Function} callback - The function to call when the element disappears.
 */
export function onElementRemoved(parent, selector, callback) {
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                mutation.removedNodes.forEach((x) => {
                    if (!(x instanceof Element)) {
                        return;
                    }

                    if (x.matches(selector) || x.querySelector(selector)) {
                        callback();
                    }
                });
            }
        }
    });

    observer.observe(parent, {
        childList: true,
        subtree: true,
    });
}
