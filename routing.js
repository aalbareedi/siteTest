// Dependencies:
// Web server must redirect all requests to the SPA (usually index.html)

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

        if (page.dataset.root) {
          history.pushState({}, null, page.dataset.root);
        }

        history.pushState({}, null, `${root.origin}/${pageName}`);
        window.onpopstate();
      };
    });
});

function showPageFromAddress() {
  document.querySelectorAll(".project-window").forEach((projectWindow) => {
    projectWindow.classList.add("hidden");
    // body.classList.remove("overflow-hidden");
  });

  const parts = location.pathname.split("/");

  // console.log("parts before: ", parts);
  parts.shift();
  // console.log("root: " + root);
  // if ("/" + parts[0] == root.pathname) {
  //   parts.shift();
  // }

  const path = "/" + parts.join("/");

  // Cut off the file name
  if (parts[parts.length - 1] == "index.html") {
    parts.pop();
    history.replaceState({}, null, `${root}`);
  }

  const homepageId = "overview";
  const notFoundPageId = "not-found";

  // Get the page name or "route" from the address bar
  const pageName = parts[0] || homepageId;

  // console.log("pageName: ", pageName);
  // console.log("path: ", path);

  // Show any element with data-path equal to the address bar path
  const element = document.querySelector(`[data-path='${path}']`);
  if (element) {
    element.classList.remove("hidden");
    // body.classList.add("overflow-hidden");
  }

  if (pageName == homepageId) {
    history.replaceState({}, null, `${root}`);
  }

  console.log("path: ", path);

  // Find the page, default to 404
  const page =
    document.querySelector(`[data-path="${path}"]`) ||
    document.querySelector(`#${homepageId}`) ||
    document.querySelector(`#${notFoundPageId}`);

  if (page) {
    document.querySelectorAll(`[data-path]`).forEach((element) => {
      // if (!path.startsWith(element.dataset.path)) {
      console.log("closing: ", element);
      element.classList.remove("open");
      // }
    });

    page.classList.add("open");
  }

  const link = document.querySelector(
    `.middle-sidebar [href='/${pageName || homepageId}']`
  );

  if (link) {
    document.querySelectorAll(".middle-sidebar li.active").forEach((li) => {
      li.classList.remove("active");
    });

    // Add the "active" class to the closest <li> ancestor
    link.closest("li").classList.add("active");
  }

  // window.scroll(0, 0);

  setTimeout(() => {
    // page.scrollIntoView();
    // document.querySelector(".container").scrollIntoView();
    window.scroll(0, -200);
    document.querySelector(".landing-contact-btn").offsetHeight;
  }, 20);

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

window.onpopstate();
