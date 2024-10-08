import {
    onElementAdded,
    onElementRemoved,
} from "./modules/element-observer.js";

export default function InputListSection(section, minimum, maximum) {
    const childSelector = ".remove-btn";
    hideIfLessThan(section, childSelector, minimum);
    showIfMoreThan(section, childSelector, minimum);
    disableIfMoreThan(section, childSelector, maximum);
    enableIfLessThan(section, childSelector, maximum);
    renderRemainder(section, childSelector, maximum);

    onElementAdded(section, childSelector, () => {
        showIfMoreThan(section, childSelector, minimum);
        disableIfMoreThan(section, childSelector, maximum);
        renderRemainder(section, childSelector, maximum);
    });

    onElementRemoved(section, childSelector, () => {
        hideIfLessThan(section, childSelector, minimum);
        enableIfLessThan(section, childSelector, maximum);
        renderRemainder(section, childSelector, maximum);
    });
}

function hideIfLessThan(parent, selector, minimum) {
    const elements = parent.querySelectorAll(selector);
    if (elements.length <= minimum) {
        elements.forEach((x) => {
            x.classList.add("invisible");
        });
    }
}

function showIfMoreThan(parent, selector, minimum) {
    const elements = parent.querySelectorAll(selector);
    if (elements.length > minimum) {
        elements.forEach((x) => {
            x.classList.remove("invisible");
        });
    }
}

function disableIfMoreThan(parent, selector, maximum) {
    const elements = parent.querySelectorAll(selector);
    if (elements.length >= maximum) {
        elements.forEach((x) => {
            const addMoreBtn = parent.querySelector(".add-more-btn");
            addMoreBtn.classList.add("disabled-add-btn");
            addMoreBtn.disabled = true;
        });
    }
}

function enableIfLessThan(parent, selector, maximum) {
    const elements = parent.querySelectorAll(selector);
    if (elements.length < maximum) {
        elements.forEach((x) => {
            const addMoreBtn = parent.querySelector(".add-more-btn");
            addMoreBtn.classList.remove("disabled-add-btn");
            addMoreBtn.disabled = false;
        });
    }
}

function renderRemainder(section, childSelector, maximum) {
    console.log("section: ", section);
    const amountDiv = section.querySelector(".remainder-amount");
    const children = section.querySelectorAll(childSelector);

    console.log("amountDiv: ", amountDiv);
    console.log("children: ", children);
    console.log("maximum - children.length: ", maximum - children.length);
    amountDiv.innerHTML = maximum - children.length;
}
