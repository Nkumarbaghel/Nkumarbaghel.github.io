document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Mobile Menu
  // =========================
  const menu = document.querySelector("#menu");
  const nav = document.querySelector("#nav");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // =========================
  // BLOG
  // =========================
  const box = document.querySelector("#posts");
  const detail = document.querySelector("#detail");

  if (!box) return;

  const search = document.querySelector("#search");
  const cat = document.querySelector("#cat");

  // Posts from posts.js
  const blogPosts = window.posts || [];

  // =========================
  // Escape HTML
  // =========================
  function esc(value) {
    return String(value).replace(/[&<>"]/g, function (char) {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
      };

      return map[char];
    });
  }

  // =========================
  // Date Format
  // =========================
  function formatDate(dateString) {
    return new Date(dateString + "T00:00:00").toLocaleDateString(
      "hi-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );
  }

  // =========================
  // Category Options
  // =========================
  if (cat) {
    const categories = [...new Set(
      blogPosts.map(post => post.category)
    )];

    categories.forEach(category => {
      cat.insertAdjacentHTML(
        "beforeend",
        `<option value="${esc(category)}">${esc(category)}</option>`
      );
    });
  }

  // =========================
  // Blog Card
  // =========================
  function card(post) {
    return `
      <article class="card">
        <small>
          ${esc(post.category)} • ${formatDate(post.date)}
        </small>

        <h2>${esc(post.title)}</h2>

        <p>${esc(post.excerpt)}</p>

        <a href="blog.html?post=${encodeURIComponent(post.id)}">
          पूरा लेख पढ़ें →
        </a>
      </article>
    `;
  }

  // =========================
  // Render Posts
  // =========================
  function render() {

    const query = search
      ? (search.value || "").toLowerCase().trim()
      : "";

    const category = cat
      ? cat.value
      : "all";

    const filtered = blogPosts.filter(post => {

      const matchesCategory =
        category === "all" ||
        post.category === category;

      const text =
        `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();

      const matchesSearch =
        !query || text.includes(query);

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      box.innerHTML = `
        <div class="card">
          <h3>कोई लेख नहीं मिला।</h3>
          <p>कृपया दूसरा शब्द या श्रेणी चुनकर देखें।</p>
        </div>
      `;
      return;
    }

    box.innerHTML = filtered.map(card).join("");
  }

  // =========================
  // Search
  // =========================
  if (search) {
    search.addEventListener("input", render);
  }

  // =========================
  // Category Filter
  // =========================
  if (cat) {
    cat.addEventListener("change", render);
  }

  // =========================
  // Open Single Blog Post
  // =========================
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("post");

  if (postId) {

    const post = blogPosts.find(
      item => item.id === postId
    );

    if (post) {

      box.style.display = "none";

      const tools = document.querySelector(".tools");
      if (tools) {
        tools.style.display = "none";
      }

      if (detail) {
        detail.style.display = "block";

        detail.innerHTML = `
          <a href="blog.html">← सभी लेख</a>

          <small>
            ${esc(post.category)} • ${formatDate(post.date)}
          </small>

          <h1>${esc(post.title)}</h1>

          <div class="article">
            ${post.content}
          </div>
        `;
      }

    } else {

      if (detail) {
        detail.style.display = "none";
      }

      render();
    }

  } else {

    if (detail) {
      detail.style.display = "none";
    }

    render();
  }

});
