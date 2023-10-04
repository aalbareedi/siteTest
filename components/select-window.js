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
    const selectWindow = document.createElement("div");
    selectWindow.classList.add("select-window");
    selectWindow.classList.add("display-hidden");

    selectWindow.innerHTML += `
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
        // element.querySelector(".select-options").innerHTML += `
        //     <div class="select-opt ${
        //         options[i] == selectedOpt ? "selected-opt" : ""
        //     }">
        //         <div class="select-opt-text">${options[i]}</div>
        //         <i class="fas fa-check"></i>
        //     </div>
        // `;

        const selectOpt = document.createElement("div");
        selectOpt.classList.add("select-opt");
        if (options[i] == selectedOpt) {
            selectOpt.classList.add("selected-opt");
        }

        selectOpt.innerHTML = `
            <div class="select-opt-text">${options[i]}</div>
            <i class="fas fa-check"></i>
        `;

        selectOpt.onclick = () => {
            onSelect(options[i]);
        };

        selectWindow.querySelector(".select-options").append(selectOpt);
    }

    selectWindow.querySelector(".select-close-btn").onclick = () => {
        selectWindow.classList.add("display-hidden");
    };

    selectWindow.onclick = () => {
        selectWindow.classList.add("display-hidden");
    };

    selectWindow.querySelector(".select-content").onclick = (e) => {
        e.stopPropagation();
    };

    return selectWindow;
}
