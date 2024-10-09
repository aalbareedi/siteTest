export default function FileSelector(element, onChange) {
    function getBase64Image(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    }

    element.addEventListener("change", async (event) => {
        /** @type {FileList} */
        const files = event.target.files;

        try {
            const base64Image = await getBase64Image(file);
            onChange(base64Image);
        } catch (error) {
            console.error("Error reading file:", error);
        }
    });
}
