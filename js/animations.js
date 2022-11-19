{
  const elements = document.querySelectorAll("[data-animation-in-view]");
  console.log("elements:", elements);
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          console.log("ADDING CLASS");
          entry.target.classList.add(
            "animate__animated",
            entry.target.getAttribute("data-animation-in-view")
          );
        }
      }
    },
    { root: null, rootMargin: "-140px" }
  );

  for (const element of elements) {
    observer.observe(element);
  }
}
