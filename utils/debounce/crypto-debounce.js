let lowestIndex = null;
let timeout = null;

export function debounce(index, callback) {
    if (lowestIndex === null || index <= lowestIndex) {
        if (timeout) {
            clearTimeout(timeout);
        }

        lowestIndex = index;

        timeout = setTimeout(() => {
            console.log("Calling callback...");
            callback();

            timeout = null;
            lowestIndex = null;
        }, 3000);
    }
}
