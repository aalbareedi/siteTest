export function html(string) {
    const wrapper = document.createElement("template");
    wrapper.innerHTML += string.trim();

    return wrapper.content.firstElementChild;
}
