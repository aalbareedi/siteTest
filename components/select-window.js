/**
 *
 * @param {{
 *  title: string,
 *  options: string[],
 *  selectedOpt: string
 * }}
 * @returns
 */
export default function SelectWindow({ title, options, selectedOpt }) {
    const element = document.createElement("div");
    element.classList.add("select-window");
    element.classList.add("display-hidden");

    element.innerHTML += `
        <div class="select-content">
            <div class="select-title">
                ${title}
            </div>
            <div class="select-options">
            </div>
            <button type="button" class="select-close-btn">
                Close
            </button>
        </div>
    `;

    for (let i = 0; i < options.length; i++) {
        element.querySelector(".select-options").innerHTML += `
            <div class="select-opt ${
                options[i] == selectedOpt ? "selected-opt" : ""
            }">
                <div class="select-opt-text">${options[i]}</div>
                <i class="fas fa-check"></i>
            </div>
        `;
    }

    return element;
}
