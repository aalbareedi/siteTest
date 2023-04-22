// Dependencies:
// Web server must redirect all requests to the SPA (usually index.html)

// Attributes:
// data-current-path: automatically applied to the body tag to indicate location path
// data-scrolls-to-top: can be used on <a> tags to scroll to top of the page after navigating
// data-path: can be used on a page section to cause <a> tags to link to it

// const root = new URL(location.href.split("/").slice(0, -1).join("/"));
const root = new URL(location.origin);

const html = document.querySelector("html");
const body = document.querySelector("body");

// Make the links work
document.querySelectorAll("[data-path]").forEach((page) => {
  document
    .querySelectorAll(`[href='${page.dataset.path || "/" + page.id}']`)
    .forEach((a) => {
      a.onclick = (e) => {
        e.preventDefault();
        const url = new URL(a.href);
        const pageName = url.hash.substring(1) || url.pathname.substring(1);

        // TODO: Investigate this
        // if (page.dataset.root) {
        //   history.pushState({}, null, page.dataset.root);
        // }

        history.pushState({}, null, `${root.origin}/${pageName}`);
        // window.onpopstate();
        window.dispatchEvent(
          new PopStateEvent("popstate", { state: history.state })
        );

        if ("scrollsToTop" in a.dataset) {
          // Scroll to top of new page
          setTimeout(() => {
            // page.scrollIntoView();
            // document.querySelector(".container").scrollIntoView();
            window.scroll(0, -200);
            // document.querySelector(".landing-contact-btn").offsetHeight;
          }, 20);
        }
      };
    });
});

function showPageFromAddress() {
  document.querySelectorAll(".project-window").forEach((projectWindow) => {
    projectWindow.classList.add("hidden");
    body.classList.remove("overflow-hidden");
  });
  const parts = location.pathname.split("/");
  parts.shift();
  const path = "/" + parts.join("/");

  // Cut off the file name
  if (parts[parts.length - 1] == "index.html") {
    parts.pop();
    history.replaceState({}, null, `${root}`);
    window.dispatchEvent(
      new PopStateEvent("popstate", { state: history.state })
    );
    return;
  }

  const notFoundPageId = "not-found";

  // Get the page name or "route" from the address bar
  const pageName = parts[0] || "";

  // Show any element with data-path equal to the address bar path
  const element = document.querySelector(`[data-path='${path}']`);
  if (element) {
    element.classList.remove("hidden");

    // NOTE: Assuming this means it's a modal
    if (parts.length > 1) {
      body.classList.add("overflow-hidden");

      // Scroll to top of new page
      setTimeout(() => {
        // window.scroll(0, -200);
        element.scrollTop = 0;
      }, 20);
    }
  }

  // Find the page, default to 404
  const page =
    document.querySelector(`[data-path="${path}"]`) ||
    document.querySelector(`#${notFoundPageId}`);

  console.log("path: ", path);
  console.log("parts: ", parts);
  console.log("pageName: ", pageName);
  console.log("page: ", page);

  if (page) {
    document.querySelectorAll(`[data-path]`).forEach((element) => {
      // NOTE: Assuming the homepage is an exception to the "keep open" rule
      if (
        !path.startsWith(element.dataset.path) ||
        element.dataset.path == "/"
      ) {
        element.classList.remove("open");
      } else {
        element.classList.add("open");
      }
    });

    page.classList.add("open");
  }

  const link = document.querySelector(`.middle-sidebar [href='/${pageName}']`);

  if (link) {
    document.querySelectorAll(".middle-sidebar li.active").forEach((li) => {
      li.classList.remove("active");
    });

    // Add the "active" class to the closest <li> ancestor
    link.closest("li").classList.add("active");
  }

  // window.scroll(0, 0);

  resizeResume();
}

const iframe = document.querySelector("#resume iframe");
if (iframe) {
  iframe.onload = () => {
    resizeResume();
  };
}

window.addEventListener("resize", resizeResume);

function resizeResume() {
  const iframe = document.querySelector("#resume iframe");
  const wrapper =
    iframe && iframe.contentWindow.document.querySelector(".wrapper");

  if (iframe && wrapper) {
    iframe.style.height = wrapper.scrollHeight + 10 + "px";
    // iframe.contentWindow.document.documentElement.scrollHeight + 10 + "px";
  }
}

window.onpopstate = () => {
  showPageFromAddress();

  // Get the page name or "route" from the address bar
  // const page = location.pathname.split("/").pop().replaceAll("/", "");
  const path = location.pathname;

  if (path) {
    document.body.dataset.currentPath = path;
  } else {
    delete document.body.dataset.currentPath;
  }
};

window.addEventListener("load", () => {
  // window.onpopstate();
  window.dispatchEvent(new PopStateEvent("popstate", { state: history.state }));
});
