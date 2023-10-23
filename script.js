import { onStick, onUnstick } from "./utils/sticky-handler.js";

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

let selectCloseBtn = document.querySelector(".select-close-btn");
let settingsCloseBtn = document.querySelector(".settings-close-btn");
let cryptoSelectContent = document.querySelector(".crypto-select-content");

// document.addEventListener("DOMContentLoaded", function (event) {
//     console.log("doc ready");

//     document.onscroll = function () {
//         console.log("scroll");
//     };
// });

body.onscroll = function () {
    if (scrollingElement.scrollTop > 0) {
        backToTopBtn.classList.remove("opacity-zero");
    } else {
        backToTopBtn.classList.add("opacity-zero");
    }

    let originalGlobalStatsTop = document.querySelector(".main-stats-wrapper");
    // const rect = originalGlobalStatsTop.getBoundingClientRect();

    if (scrollingElement.scrollTop > 74) {
        originalGlobalStatsTop.classList.add("sticking");
    } else {
        originalGlobalStatsTop.classList.remove("sticking");
    }
};

backToTopBtn.onclick = (e) => {
    e.preventDefault();

    // NOTE: Must use -1 for this to work in Safari mobile
    window.scrollTo({ top: -1, behavior: "smooth" });
};

// const stats = document.querySelector(".main-stats-wrapper");
// onStick(stats, () => {
//     stats.classList.add("sticking");
// });
// onUnstick(stats, () => {
//     stats.classList.remove("sticking");
// });

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
        "#crypto-timeframe-select-window"
    );
    selectWindow.classList.remove("overlay-hidden");
};

let cryptoQuantitySelect = document.querySelector("#crypto-quantity-select");
cryptoQuantitySelect.onclick = () => {
    const selectWindow = document.querySelector(
        "#crypto-quantity-select-window"
    );
    selectWindow.classList.remove("overlay-hidden");
};

// document.documentElement.style.setProperty(
//     "--100vh",
//     window.innerHeight + "px"
// );
// document.querySelector("#window-size").innerHTML = `
// <div>1: ${window.innerHeight + "px"}</div>
// <div>2: ${window.screen.height + "px"}</div>
// <div>3: ${window.screen.availHeight + "px"}</div>
// <div>4: ${document.documentElement.clientHeight + "px"}</div>
// <div>5: ${document.body.clientHeight + "px"}</div>
// `;

// window.onresize = () => {
//     document.documentElement.style.setProperty(
//         "--100vh",
//         window.innerHeight + "px"
//     );

//     document.querySelector("#window-size").innerHTML = `
//     <div>1: ${window.innerHeight + "px"}</div>
//     <div>2: ${window.screen.height + "px"}</div>
//     <div>3: ${window.screen.availHeight + "px"}</div>
//     <div>4: ${document.documentElement.clientHeight + "px"}</div>
//     <div>5: ${document.body.clientHeight + "px"}</div>
//     `;
// };
