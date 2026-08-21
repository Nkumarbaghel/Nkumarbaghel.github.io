document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Mobile Menu
  // =========================
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    siteNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  // =========================
  // BLOG POSTS
  // =========================
  const postsContainer = document.getElementById("posts");
  const searchInput = document.getElementById("search");
  const categorySelect = document.getElementById("category");

  if (postsContainer && typeof posts !== "undefined") {

    function showPosts() {

      const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

      const selectedCategory = categorySelect
        ? categorySelect.value
        : "all";

      const filteredPosts = posts.filter(post => {

        const matchesSearch =
          post.title.toLowerCase().includes(searchText) ||
          post.excerpt.toLowerCase().includes(searchText) ||
          post.content.toLowerCase().includes(searchText);

        const matchesCategory =
          selectedCategory === "all" ||
          post.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });


      if (filteredPosts.length === 0) {
        postsContainer.innerHTML = `
          <div class="card">
            <h3>कोई लेख नहीं मिला</h3>
            <p>कृपया दूसरा शब्द या श्रेणी चुनकर देखें।</p>
          </div>
        `;
        return;
      }


      postsContainer.innerHTML = filteredPosts.map(post => `
        <article class="card reveal visible">

          <div class="post-meta">
            <span>${post.date}</span>
            <span>${post.category}</span>
          </div>

          <h2>${post.title}</h2>

          <p>${post.excerpt}</p>

          <button class="read-more" data-id="${post.id}">
            पूरा लेख पढ़ें →
          </button>

          <div class="full-content" id="post-${post.id}" style="display:none;">
            ${post.content}
          </div>

        </article>
      `).join("");


      // Read More button
      document.querySelectorAll(".read-more").forEach(button => {

        button.addEventListener("click", () => {

          const id = button.getAttribute("data-id");
          const content = document.getElementById(`post-${id}`);

          if (content.style.display === "none") {
            content.style.display = "block";
            button.textContent = "लेख बंद करें ↑";
          } else {
            content.style.display = "none";
            button.textContent = "पूरा लेख पढ़ें →";
          }

        });

      });

    }

    showPosts();

    if (searchInput) {
      searchInput.addEventListener("input", showPosts);
    }

    if (categorySelect) {
      categorySelect.addEventListener("change", showPosts);
    }

  }


  // =========================
  // Scroll Reveal Animation
  // =========================
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  // =========================
  // Current Year
  // =========================
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // =========================
  // Back To Top Button
  // =========================
  const toTop = document.getElementById("toTop");

  if (toTop) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 500) {
        toTop.classList.add("show");
      } else {
        toTop.classList.remove("show");
      }

    });


    toTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }

});
