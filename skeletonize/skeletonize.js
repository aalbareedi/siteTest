export function skeletonize(element) {
    element.classList.add("skeleton");
    [...textNodesUnder(element), ...element.querySelectorAll("img")].forEach(
        (dataNode) => {
            if (dataNode.textContent && !dataNode.textContent.trim()) {
                return;
            }

            const span = document.createElement("span");
            span.classList.add("skeleton-data-placeholder");
            span.append(dataNode.cloneNode());
            dataNode.replaceWith(span);
        }
    );

    return element;
}

function textNodesUnder(element) {
    let n,
        a = [],
        walk = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
    while ((n = walk.nextNode())) a.push(n);
    return a;
}
