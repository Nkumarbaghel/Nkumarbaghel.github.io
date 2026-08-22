document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("#nav");
  const menu = document.querySelector("#menu");
  if (menu && nav) {
    menu.onclick = () => nav.classList.toggle("open");
    nav.querySelectorAll("a").forEach(a => a.onclick = () => nav.classList.remove("open"));
  }

  const box = document.querySelector("#posts");
  const detail = document.querySelector("#detail");
  if (!box || typeof posts === "undefined") return;

  // Remove duplicate articles even when the same post was saved with
  // different IDs. Title + date is treated as the canonical identity.
  const normalize = value => String(value ?? "")
    .toLowerCase()
    .replace(/[“”\"'‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const uniquePosts = Array.from(new Map(
    posts.map(p => [
      `${normalize(p.title)}|${String(p.date || "").trim()}`,
      p
    ])
  ).values());

  const search = document.querySelector("#search");
  const cat = document.querySelector("#cat");
  const sort = document.querySelector("#sort");
  const count = document.querySelector("#resultCount");
  const clear = document.querySelector("#clearFilters");

  const esc = s => String(s ?? "").replace(/[&<>\"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  }[c]));

  const date = s => {
    const d = new Date((s || "") + "T00:00:00");
    return isNaN(d) ? "" : d.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const readTime = p => {
    const text = String(p.content || "").replace(/<[^>]+>/g, " ");
    const words = text.trim()
      ? text.trim().split(/\s+/).length
      : Math.max(1, String(p.excerpt || "").split(/\s+/).length);
    return Math.max(1, Math.ceil(words / 180));
  };

  const categories = [...new Set(uniquePosts.map(p => p.category).filter(Boolean))];
  if (cat) categories.forEach(c => cat.insertAdjacentHTML("beforeend", `<option value="${esc(c)}">${esc(c)}</option>`));

  function sorted(list) {
    const a = [...list];
    const mode = sort?.value || "newest";
    if (mode === "oldest") a.sort((x, y) => String(x.date).localeCompare(String(y.date)));
    else if (mode === "az") a.sort((x, y) => String(x.title).localeCompare(String(y.title), "hi"));
    else a.sort((x, y) => String(y.date).localeCompare(String(x.date)));
    return a;
  }

  function card(p) {
    return `<article class="card blog-card"><div class="post-info"><small>${esc(p.category || "सामान्य")} • ${date(p.date)}</small><div class="post-meta-row"><span class="meta-pill">⏱️ ${readTime(p)} मिनट पढ़ने का समय</span><span class="meta-pill">📖 लेख</span></div><h2>${esc(p.title)}</h2><p>${esc(p.excerpt || "")}</p><a href="blog.html?post=${encodeURIComponent(p.id)}">पूरा लेख पढ़ें →</a></div></article>`;
  }

  function render() {
    const q = (search?.value || "").toLowerCase().trim();
    const c = cat?.value || "all";
    let filtered = uniquePosts.filter(p => {
      const cm = c === "all" || p.category === c;
      const text = ((p.title || "") + " " + (p.excerpt || "") + " " + (p.content || "")).toLowerCase();
      return cm && (!q || text.includes(q));
    });
    filtered = sorted(filtered);
    if (count) count.textContent = `${filtered.length} लेख मिले`;
    box.innerHTML = filtered.length
      ? filtered.map(card).join("")
      : `<div class="card no-posts"><h2>कोई लेख नहीं मिला।</h2><p>दूसरा शब्द या श्रेणी चुनकर फिर से खोजें।</p></div>`;
  }

  if (search) search.oninput = render;
  if (cat) cat.onchange = render;
  if (sort) sort.onchange = render;
  if (clear) clear.onclick = () => {
    if (search) search.value = "";
    if (cat) cat.value = "all";
    if (sort) sort.value = "newest";
    render();
  };

  const id = new URLSearchParams(location.search).get("post");
  if (id) {
    const p = uniquePosts.find(x => String(x.id) === String(id));
    box.style.display = "none";
    document.querySelector(".blog-tools")?.style.setProperty("display", "none", "important");
    document.querySelector(".blog-hero")?.style.setProperty("display", "none", "important");
    detail.style.display = "block";

    if (p) {
      const viewsKey = "cgneel-views-" + p.id;
      const views = Number(localStorage.getItem(viewsKey) || 0) + 1;
      localStorage.setItem(viewsKey, String(views));
      const related = uniquePosts.filter(x => x.id !== p.id && x.category === p.category).slice(0, 3);

      detail.innerHTML = `<article class="article-page"><a href="blog.html" class="back-link">← सभी लेख</a><small class="article-meta">${esc(p.category || "सामान्य")} • ${date(p.date)} • ⏱️ ${readTime(p)} मिनट</small><h1>${esc(p.title)}</h1>${p.image ? `<img class="article-image" src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">` : ""}${p.excerpt ? `<p class="article-excerpt">${esc(p.excerpt)}</p>` : ""}<div class="article-actions"><button id="shareBtn">📤 शेयर करें</button><button id="copyBtn">🔗 लिंक कॉपी करें</button><button onclick="window.print()">🖨️ Print</button></div><div class="article">${p.content || ""}</div><div class="article-actions"><span class="meta-pill">👁️ इस डिवाइस पर views: ${views}</span></div>${related.length ? `<div class="related"><h2>आपको ये भी पसंद आ सकता है</h2><div class="related-grid">${related.map(x => `<div class="related-card"><small>${esc(x.category || "सामान्य")} • ${date(x.date)}</small><a href="blog.html?post=${encodeURIComponent(x.id)}">${esc(x.title)}</a></div>`).join("")}</div></div>` : ""}</article>`;

      const share = async () => {
        try {
          if (navigator.share) await navigator.share({ title: p.title, text: p.excerpt || "CG Neel Baghel Blog", url: location.href });
          else {
            await navigator.clipboard.writeText(location.href);
            alert("लिंक कॉपी हो गया।");
          }
        } catch (e) {}
      };
      document.querySelector("#shareBtn")?.addEventListener("click", share);
      document.querySelector("#copyBtn")?.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(location.href);
          alert("लिंक कॉपी हो गया।");
        } catch (e) {
          prompt("लिंक कॉपी करें:", location.href);
        }
      });
    } else {
      detail.innerHTML = `<div class="card"><h2>लेख नहीं मिला</h2><p>जिस लेख को आप खोलना चाहते हैं, वह उपलब्ध नहीं है।</p><a href="blog.html">← सभी लेखों पर वापस जाएँ</a></div>`;
    }
  } else {
    detail.style.display = "none";
    box.style.display = "";
    document.querySelector(".blog-hero")?.style.removeProperty("display");
    document.querySelector(".blog-tools")?.style.removeProperty("display");
    render();
  }
});