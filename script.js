let body = document.querySelector("body");
let navBtn = document.querySelector(".nav-menu-btn");
let settings = document.querySelector(".settings-window");
let cryptoDockBtn = document.querySelector("#crypto-dock-btn");
let crypto = document.querySelector("#crypto");
let stocksDockBtn = document.querySelector("#stocks-dock-btn");
let stocks = document.querySelector("#stocks");
let backToTopBtn = document.querySelector("#back-to-top-btn");
let scrollingElement =
    document.scrollingElement || document.documentElement || body;
let cryptoTimeframeSelect = document.querySelector("#crypto-timeframe-select");
let cryptoSelectWindow = document.querySelector(".crypto-select-window");
let selectCloseBtn = document.querySelector(".select-close-btn");

navBtn.onclick = () => {
    // settings.classList.add("showSettings");
    body.classList.toggle("showSettings");
};

cryptoDockBtn.onclick = () => {
    crypto.classList.remove("display-hidden");
    stocks.classList.add("display-hidden");
    stocksDockBtn.classList.remove("dock-btn-selected");
    cryptoDockBtn.classList.add("dock-btn-selected");
};

stocksDockBtn.onclick = () => {
    crypto.classList.add("display-hidden");
    stocks.classList.remove("display-hidden");
    stocksDockBtn.classList.add("dock-btn-selected");
    cryptoDockBtn.classList.remove("dock-btn-selected");
};

body.onscroll = function () {
    if (scrollingElement.scrollTop > 0) {
        backToTopBtn.classList.remove("opacity-zero");
    } else {
        backToTopBtn.classList.add("opacity-zero");
    }
};

cryptoTimeframeSelect.onclick = () => {
    cryptoSelectWindow.classList.remove("display-hidden");
};

selectCloseBtn.onclick = () => {
    cryptoSelectWindow.classList.add("display-hidden");
};
