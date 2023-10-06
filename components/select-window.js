import { html } from "../utils/html.js";

/**
 *
 * @param {{
 *  title: string,
 *  options: string[],
 *  selectedOpt: string,
 *  onSelect: (opt: string) => {}
 * }}
 * @returns
 */
export default function SelectWindow({
    title,
    options,
    selectedOpt,
    onSelect,
}) {
    const selectWindow = html(`
        <div class="select-window overlay-hidden">
            <div class="select-content">
                <div class="select-title">
                    ${title}
                </div>
                <div class="select-options"></div>
                <button type="button" class="select-close-btn">
                    Close
                </button>
            </div>
        </div>
    `);

    for (let i = 0; i < options.length; i++) {
        // element.querySelector(".select-options").innerHTML += `
        //     <div class="select-opt ${
        //         options[i] == selectedOpt ? "selected-opt" : ""
        //     }">
        //         <div class="select-opt-text">${options[i]}</div>
        //         <i class="fas fa-check"></i>
        //     </div>
        // `;

        const selectOpt = html(`
            <div class="select-opt ${
                options[i] == selectedOpt ? "selected-opt" : ""
            }">
                <div class="select-opt-text">${options[i]}</div>
                <i class="fas fa-check"></i>
            </div>
        `);

        selectOpt.onclick = () => {
            onSelect(options[i]);
        };

        selectWindow.querySelector(".select-options").append(selectOpt);
    }

    selectWindow.querySelector(".select-close-btn").onclick = () => {
        selectWindow.classList.add("overlay-hidden");
    };

    selectWindow.onclick = () => {
        selectWindow.classList.add("overlay-hidden");
    };

    selectWindow.querySelector(".select-content").onclick = (e) => {
        e.stopPropagation();
    };

    return selectWindow;
}
