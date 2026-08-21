document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector("#nav");
  const menu = document.querySelector("#menu");

  menu?.addEventListener("click", () => {
    nav?.classList.toggle("open");
  });

  const box = document.querySelector("#posts");
  const detail = document.querySelector("#detail");

  if (!box || typeof posts === "undefined") return;

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
  if (cat) {
    cat.innerHTML = `<option value="all">सभी श्रेणियाँ</option>`;

    posts.forEach(p => {
      cat.insertAdjacentHTML(
        "beforeend",
        `<option value="${esc(p.category)}">${esc(p.category)}</option>`
      );
    });
  }

  // Blog Card — फोटो पूरी तरह हटाई गई है
  function card(p) {
    return `
      <article class="card blog-card">

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

  // Blog List
  function render() {

    const q = search ? (search.value || "").toLowerCase().trim() : "";
    const c = cat ? cat.value : "all";

    const filtered = posts.filter(p =>
      (c === "all" || p.category === c) &&
      (
        !q ||
        (p.title + " " + p.excerpt + " " + p.content)
          .toLowerCase()
          .includes(q)
      )
    );

    box.innerHTML =
      filtered.map(card).join("") ||
      "<div class='card'>कोई लेख नहीं मिला।</div>";
  }

  search?.addEventListener("input", render);
  cat?.addEventListener("change", render);

  // Single Article
  const id = new URLSearchParams(location.search).get("post");

  if (id) {

    const p = posts.find(x => x.id === id);

    if (p) {

      box.style.display = "none";

      const tools = document.querySelector(".tools");
      if (tools) tools.style.display = "none";

      // Article — फोटो पूरी तरह हटाई गई है
      detail.innerHTML = `
        <a href="blog.html">← सभी लेख</a>

        <small>
          ${esc(p.category)} • ${date(p.date)}
        </small>

        <h1>${esc(p.title)}</h1>

        <div class="article">
          ${p.content}
        </div>
      `;

      detail.style.display = "block";

    } else {

      detail.innerHTML = `
        <div class="card">
          <h2>लेख नहीं मिला</h2>
          <a href="blog.html">← सभी लेखों पर वापस जाएँ</a>
        </div>
      `;

      detail.style.display = "block";
    }

  } else {

    detail.style.display = "none";
    render();

  }

});
