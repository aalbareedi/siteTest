export default function ImageListItem(imageSrc) {
    const item = document.createElement("div");
    item.classList.add("upload-wrapper");

    item.innerHTML = `
        <div class="uploaded-img"></div>
        <button
            class="remove-btn"
            title="Remove"
            x-ancestor-to-remove=".upload-wrapper"
        >
            <i class="fa-solid fa-trash-can"></i>
        </button>
        <a target="_blank" class="uploaded-img-link">open</a>
        <input type="hidden" name="images" />
    `;

    const imageDiv = item.querySelector(".uploaded-img");
    imageDiv.style.backgroundImage = `url("${imageSrc}")`;

    // const removeBtn = item.querySelector(".remove-btn");
    // removeBtn.onclick = () => {
    //     item.remove();
    // };

    const link = item.querySelector(".uploaded-img-link");
    link.onclick = (e) => {
        e.preventDefault();

        const newWindow = window.open(null, "_blank");
        newWindow.document.open();
        newWindow.document.write(`<img src="${imageSrc}" />`);
        newWindow.document.close();
    };

    const inputField = item.querySelector("input");
    inputField.value = imageSrc;

    return item;
}
