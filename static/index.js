const BACKEND_URL = ``;

const form = document.querySelector(".questionnaire-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputFields = form.querySelectorAll(`input, textarea, select`);

    const data = {};

    for (const inputField of inputFields) {
        const key = inputField.name;
        const value = inputField.value;
        const isCheckbox =
            inputField.type == "checkbox" || inputField.type == "radio";

        if (!key) {
            throw new Error("Input field missing a name!");
        }

        if (isCheckbox) {
            if (!inputField.checked) {
                continue;
            }

            data[key] = true;
            continue;
        }

        if (key in data) {
            // Make it an array
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }

            data[key].push(value);
            continue;
        }

        data[key] = value;
    }

    const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Somehting went wrong.");
    }

    form.querySelector(".submission-message").innerHTML = `
        Submission Successful!
    `;
});
