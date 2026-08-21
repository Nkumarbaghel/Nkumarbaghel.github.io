document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector("#nav");
  const menu = document.querySelector("#menu");

  menu?.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  const box = document.querySelector("#posts");
  const detail = document.querySelector("#detail");

  if (!box) return;

  const search = document.querySelector("#search");
  const cat = document.querySelector("#cat");

  const date = s =>
    new Date(s + "T00:00:00").toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

  const esc = s =>
    String(s).replace(/[&<>"]/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    }[c]));

  // Categories
  posts.forEach(p => {
    cat.insertAdjacentHTML(
      "beforeend",
      `<option value="${esc(p.category)}">${esc(p.category)}</option>`
    );
  });

  // Blog card
  function card(p) {

    const image = p.image
      ? `<img src="${esc(p.image)}"
              alt="${esc(p.title)}"
              class="post-image">`
      : "";

    return `
      <article class="card blog-card">

        ${image}

        <div class="post-info">

          <small>
            ${esc(p.category)} • ${date(p.date)}
          </small>

          <h2>${esc(p.title)}</h2>

          <p>${esc(p.excerpt)}</p>

          <a href="blog.html?post=${encodeURIComponent(p.id)}">
            पूरा लेख पढ़ें →
          </a>

        </div>

      </article>
    `;
  }

  // Blog list
  function render() {

    const q = (search.value || "").toLowerCase();
    const c = cat.value;

    box.innerHTML =
      posts
        .filter(
          p =>
            (c === "all" || p.category === c) &&
            (!q ||
              (p.title + p.excerpt)
                .toLowerCase()
                .includes(q))
        )
        .map(card)
        .join("") ||
      "<div class='card'>कोई लेख नहीं मिला।</div>";
  }

  search.addEventListener("input", render);
  cat.addEventListener("change", render);

  // Open single article
  const id = new URLSearchParams(location.search).get("post");

  if (id) {

    const p = posts.find(x => x.id === id);

    if (p) {

      box.style.display = "none";
      document.querySelector(".tools").style.display = "none";

      const image = p.image
        ? `
          <img
            src="${esc(p.image)}"
            alt="${esc(p.title)}"
            class="article-image"
          >
        `
        : "";

      detail.innerHTML = `
        <a href="blog.html">← सभी लेख</a>

        <small>
          ${esc(p.category)} • ${date(p.date)}
        </small>

        <h1>${esc(p.title)}</h1>

        ${image}

        <div class="article">
          ${p.content}
        </div>
      `;

    } else {

      detail.style.display = "none";

    }

  } else {

    detail.style.display = "none";
    render();

  }

});
