// function openNavMenu() {
//   navWindow.classList.add("openNavWindow");
//   navLogoBar.classList.add("openNavLogoBar");
//   navToggleIcon.classList.add("is-active");
//   navMenu.classList.add("openNavMenu");
// }

// function closeNavMenu() {
//   navWindow.classList.remove("openNavWindow");
//   navLogoBar.classList.remove("openNavLogoBar");
//   navToggleIcon.classList.remove("is-active");
//   navMenu.classList.remove("openNavMenu");
// }

// function navigateToPage(page) {
//   navToggleIcon.classList.remove("is-active");
//   navMenu.classList.remove("openNavMenu");
//   aboutBox.classList.remove("openBox");
//   portfolioBox.classList.remove("openBox");
//   contactBox.classList.remove("openBox");
//   landing.classList.remove("openBox");
//   page.classList.add("openBox");
// }

function nextWord() {
  let siteTextWords = [
    "Hi!",
    "My",
    "name",
    "is",
    `<span class="myNameValue">Amer Albareedi</span>`,
    "and",
    "I",
    "am",
    "a",
    `<span class="jobTitleValue">
    Front-End Developer</span>.`,
  ];
  let index = 0;

  let interval = setInterval(function () {
    introBox.innerHTML = introBox.innerHTML + " " + siteTextWords[index];
    index++;
    if (index >= siteTextWords.length) {
      clearInterval(interval);
    }
  }, 300);
}
