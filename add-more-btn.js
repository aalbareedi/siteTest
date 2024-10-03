document.querySelectorAll(".add-more-btn").forEach((addMoreBtn) => {
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

    const clone = elementToCopy.cloneNode();

    addMoreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        destination.append(clone.cloneNode());
    });
});
