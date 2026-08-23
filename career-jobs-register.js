// Register Career / Jobs articles with the main blog post collection.
(function () {
  if (!Array.isArray(window.careerJobsPosts)) return;
  window.posts = Array.isArray(window.posts) ? window.posts : [];
  const existing = new Set(window.posts.map(p => `${String(p.id || "")}|${String(p.date || "")}`));
  window.careerJobsPosts.forEach(post => {
    const key = `${String(post.id || "")}|${String(post.date || "")}`;
    if (!existing.has(key)) {
      window.posts.push(post);
      existing.add(key);
    }
  });
})();
