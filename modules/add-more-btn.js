function AddMoreBtn(addMoreBtn) {
    if (!addMoreBtn.getAttribute("x-element-to-copy")) {
        throw new Error("add-more-btn has no x-element-to-copy attribute!");
    }
    if (!addMoreBtn.getAttribute("x-destination")) {
        throw new Error("add-more-btn has no x-destination attribute!");
    }

    const elementToCopy = document.querySelector(
        addMoreBtn.getAttribute("x-element-to-copy")
    );
    const destination = document.querySelector(
        addMoreBtn.getAttribute("x-destination")
    );

    if (!elementToCopy) {
        throw new Error(
            `add-more-btn failed to find element to copy with selector '${addMoreBtn.getAttribute(
                "x-element-to-copy"
            )}'!`
        );
    }

    if (!destination) {
        throw new Error(
            `add-more-btn failed to find destination element with selector '${addMoreBtn.getAttribute(
                "x-destination"
            )}'!`
        );
    }

    const clone = elementToCopy.cloneNode(true);

    addMoreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        destination.append(clone.cloneNode(true));
    });
}

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach((x) => {
                if (!(x instanceof Element)) {
                    return;
                }

                x.querySelectorAll(".add-more-btn").forEach((x) =>
                    AddMoreBtn(x)
                );

                if (x.classList.contains("add-more-btn")) {
                    AddMoreBtn(x);
                }
            });
        }
    }
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
});

document.querySelectorAll(".add-more-btn").forEach((x) => AddMoreBtn(x));
