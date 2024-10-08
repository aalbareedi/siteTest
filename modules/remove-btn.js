/**
 *
 * @param {Element} removeBtn
 */
function RemoveBtn(removeBtn) {
    if (!removeBtn.getAttribute("x-ancestor-to-remove")) {
        throw new Error("remove-btn has no x-ancestor-to-remove attribute!");
    }

    removeBtn.addEventListener("click", () => {
        const ancestorToRemove = removeBtn.closest(
            removeBtn.getAttribute("x-ancestor-to-remove")
        );

        if (!ancestorToRemove) {
            throw new Error(
                `remove-btn failed to find element to copy with selector '${removeBtn.getAttribute(
                    "x-ancestor-to-remove"
                )}'!`
            );
        }

        ancestorToRemove.remove();
    });
}

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach((x) => {
                if (!(x instanceof Element)) {
                    return;
                }

                x.querySelectorAll(".remove-btn").forEach((x) => RemoveBtn(x));

                if (x.classList.contains("remove-btn")) {
                    RemoveBtn(x);
                }
            });
        }
    }
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
});

document.querySelectorAll(".remove-btn").forEach((x) => RemoveBtn(x));
