// Dependencies:
// Web server must redirect all requests to the SPA (usually inde.html)

showPageFromAddress();

document.querySelectorAll(".middle-sidebar a").forEach((a) => {
  a.onclick = (e) => {
    e.preventDefault();
    history.pushState({}, null, `/${a.hash.substr(1)}`);
    showPageFromAddress();
  };
});

function showPageFromAddress() {
  // Get the page name or "route" from the address bar
  const pageName = location.pathname.substr(1);

  // Highlight the link
  if (pageName) {
    document.querySelectorAll(".middle-sidebar li.active").forEach((li) => {
      li.classList.remove("active");
    });

    const link = document.querySelector(
      `.middle-sidebar [href='#${pageName}']`
    );
    // Add the "active" class to the closest <li> ancestor
    link.closest("li").classList.add("active");
  }

  // Show the page
  const page = document.querySelector(pageName ? `#${pageName}` : `#overview`);

  if (page) {
    document.querySelectorAll(".tab-content.open").forEach((a) => {
      a.classList.remove("open");
    });

    page.classList.add("open");
  }
}
