{
  const elements = document.querySelectorAll(
    "[data-animation-in-view], [data-waterfall-in-view]"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          startAnimation(entry.target);
        }
      }
    },
    { root: null, rootMargin: "-110px" }
    // { rootMargin: "-160px" }
    // { root: document.body, rootMargin: "-200px" }
  );

  for (const element of elements) {
    observer.observe(element);

    if (element.getBoundingClientRect().y < 0) {
      startAnimation(element);
    }
  }

  function startAnimation(element) {
    if (element.getAttribute("data-animation-in-view")) {
      element.classList.add(
        "animate__animated",
        element.getAttribute("data-animation-in-view")
      );
      return;
    }

    if (element.getAttribute("data-waterfall-in-view")) {
      for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        child.style.animationDelay = i / 7.6 + "s";
        console.log("delay: ", i / 7.6 + "s");
        child.classList.add(
          "animate__animated",
          element.getAttribute("data-waterfall-in-view")
        );
      }
      return;
    }
  }
}
