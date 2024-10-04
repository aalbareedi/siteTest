function hideOrShowAll(exclusiveElement) {
    const all = document.querySelectorAll(
        exclusiveElement.getAttribute("[x-exclusive-with]")
    );

    const minimum = exclusiveElement.getAttribute("[x-exclusive-minimum]");

    if (all.length <= minimum) {
        all.forEach((x) => x.classList.add("invisible"));
    } else {
        all.forEach((x) => x.classList.remove("invisible"));
    }
}

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach((x) => {
                if (!(x instanceof Element)) {
                    return;
                }

                if (x.hasAttribute("x-exclusive-with")) {
                    hideOrShowAll(x);
                }

                // If the added node(s) contained an "exclusive element"
                if (x.querySelector("[x-exclusive-with]")) {
                    x.querySelectorAll("[x-exclusive-with]").forEach(
                        (exclusiveElement) => {
                            hideOrShowAll(exclusiveElement);
                        }
                    );
                }
            });
        }
    }
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
});

document
    .querySelectorAll("[x-exclusive-with]")
    .forEach((x) => hideOrShowAll(x));
