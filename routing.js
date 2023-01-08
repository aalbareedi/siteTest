// Dependencies:
// Web server must redirect all requests to the SPA (usually index.html)

const root = location.href.split("/").slice(0, -1).join("/");

showPageFromAddress();

// Make the links work
document.querySelectorAll(".tab-content").forEach((page) => {
  document.querySelectorAll(`[href='#${page.id}']`).forEach((a) => {
    a.onclick = (e) => {
      e.preventDefault();
      history.pushState({}, null, `${root}/${a.hash.substr(1)}`);
      showPageFromAddress();
    };
  });
});

function showPageFromAddress() {
  document.querySelectorAll(".project-window").forEach((projectWindow) => {
    projectWindow.classList.add("hidden");
  });

  // Cut off the file name
  if (location.pathname == "/index.html") {
    history.pushState({}, null, `${root}/`);
  }

  const homepageId = "overview";
  const notFoundPageId = "not-found";

  // Get the page name or "route" from the address bar
  const pageName = location.pathname.split("/").pop().replaceAll("/", "");

  if (pageName == homepageId) {
    history.pushState({}, null, `${root}/`);
  }

  console.log("location.pathname: ", location.pathname);
  console.log("pageName: ", pageName);

  // Find the page, default to 404
  const page =
    document.querySelector(`#${pageName || homepageId}`) ||
    document.querySelector(`#${notFoundPageId}`);

  if (page) {
    document.querySelectorAll(".tab-content.open").forEach((a) => {
      a.classList.remove("open");
    });

    page.classList.add("open");
  }

  const link = document.querySelector(
    `.middle-sidebar [href='#${pageName || homepageId}']`
  );

  if (link) {
    document.querySelectorAll(".middle-sidebar li.active").forEach((li) => {
      li.classList.remove("active");
    });

    // Add the "active" class to the closest <li> ancestor
    link.closest("li").classList.add("active");
  }
}

window.addEventListener("popstate", (event) => {
  showPageFromAddress();
});
