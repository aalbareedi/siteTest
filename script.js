let navBtn = document.querySelector(".nav-menu-btn");
let settings = document.querySelector(".settings-window");
let cryptoDockBtn = document.querySelector("#crypto-dock-btn");
let crypto = document.querySelector("#crypto");
let stocksDockBtn = document.querySelector("#stocks-dock-btn");
let stocks = document.querySelector("#stocks");

navBtn.onclick = () => {
  settings.classList.add("showSettings");
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
