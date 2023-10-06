let body = document.querySelector("body");
let navBtn = document.querySelector(".nav-menu-btn");
// let settings = document.querySelector(".settings-window");
let cryptoDockBtn = document.querySelector("#crypto-dock-btn");
let crypto = document.querySelector("#crypto");
let stocksDockBtn = document.querySelector("#stocks-dock-btn");
let stocks = document.querySelector("#stocks");
let backToTopBtn = document.querySelector("#back-to-top-btn");
let scrollingElement =
    document.scrollingElement || document.documentElement || body;

let cryptoQuantitySelect = document.querySelector("#crypto-quantity-select");
let selectCloseBtn = document.querySelector(".select-close-btn");
let settingsCloseBtn = document.querySelector(".settings-close-btn");
let cryptoSelectContent = document.querySelector(".crypto-select-content");

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("doc ready");

    document.onscroll = function () {
        console.log("scroll");
    };
});

body.onscroll = function () {
    if (scrollingElement.scrollTop > 0) {
        backToTopBtn.classList.remove("opacity-zero");
    } else {
        backToTopBtn.classList.add("opacity-zero");
    }

    let originalGlobalStatsTop = document.querySelector(".main-stats-wrapper");
    if (scrollingElement.scrollTop > 74) {
        originalGlobalStatsTop.classList.add("sticking");
    } else {
        originalGlobalStatsTop.classList.remove("sticking");
    }
};

// let originalGlobalStatsTop = document.querySelector(".main-stats-wrapper");

// new IntersectionObserver(
//     ([e]) => {
//         e.target.classList.toggle("sticking", e.intersectionRatio < 1);
//     },
//     {
//         threshold: [1],
//     }
// ).observe(originalGlobalStatsTop);

navBtn.onclick = () => {
    body.classList.toggle("showSettings");
};

settingsCloseBtn.onclick = () => {
    body.classList.remove("showSettings");
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

let cryptoTimeframeSelect = document.querySelector("#crypto-timeframe-select");
cryptoTimeframeSelect.onclick = () => {
    const selectWindow = document.querySelector(
        "#crypto-timeframe-select-window .select-window"
    );
    selectWindow.classList.remove("display-hidden");
};

cryptoQuantitySelect.onclick = () => {
    const selectWindow = document.querySelector(
        "#crypto-quantity-select-window .select-window"
    );
    selectWindow.classList.remove("display-hidden");
};

// cryptoSelectWindow.onclick = () => {
//     let cryptoSelectWindow = document.querySelector(
//         "#crypto-timeframe-select-window .select-window"
//     );

//     cryptoSelectWindow.classList.add("display-hidden");
// };
// TODO: Fix console error caused by this...
// cryptoSelectContent.onclick = (e) => {
//     e.stopPropagation();
// };
