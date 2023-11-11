let lowestIndex = null;
let timeout = null;

export function debounce(index, callback) {
    if (lowestIndex === null || index <= lowestIndex) {
        if (timeout) {
            clearTimeout(timeout);
        }

        lowestIndex = index;

        timeout = setTimeout(() => {
            console.log("Updating coins...");
            callback();

            timeout = null;
            lowestIndex = null;
        }, 1000);
    }
}
