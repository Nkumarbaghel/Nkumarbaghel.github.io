document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const nav = document.querySelector("#nav");
    const menu = document.querySelector("#menu");

    if (menu && nav) {

        menu.addEventListener("click", () => {
            nav.classList.toggle("open");
        });

        // Menu link पर क्लिक करने के बाद menu बंद
        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                nav.classList.remove("open");
            });

        });

    }


    /* =====================================================
       BLOG ELEMENTS
    ===================================================== */

    const box = document.querySelector("#posts");
    const detail = document.querySelector("#detail");

    // posts.js उपलब्ध नहीं है तो आगे कुछ न करें
    if (!box || typeof posts === "undefined") {
        return;
    }

    const search = document.querySelector("#search");
    const cat = document.querySelector("#cat");


    /* =====================================================
       DATE FORMAT
    ===================================================== */

    const date = (s) => {

        return new Date(s + "T00:00:00").toLocaleDateString(
            "hi-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    };


    /* =====================================================
       HTML ESCAPE
    ===================================================== */

    const esc = (s) => {

        return String(s ?? "").replace(/[&<>"]/g, c => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;"

        }[c]));

    };


    /* =====================================================
       CATEGORIES
    ===================================================== */

    if (cat) {

        const categories = [
            ...new Set(
                posts
                    .map(p => p.category)
                    .filter(Boolean)
            )
        ];

        cat.innerHTML = `
            <option value="all">
                सभी श्रेणियाँ
            </option>
        `;

        categories.forEach(category => {

            cat.insertAdjacentHTML(
                "beforeend",
                `
                <option value="${esc(category)}">
                    ${esc(category)}
                </option>
                `
            );

        });

    }


    /* =====================================================
       BLOG CARD
    ===================================================== */

    function card(p) {

        return `
            <article class="card blog-card">

                <div class="post-info">

                    <small>
                        ${esc(p.category || "सामान्य")}
                        •
                        ${date(p.date)}
                    </small>

                    <h2>
                        ${esc(p.title)}
                    </h2>

                    <p>
                        ${esc(p.excerpt || "")}
                    </p>

                    <a
                        href="blog.html?post=${encodeURIComponent(p.id)}"
                    >
                        पूरा लेख पढ़ें →
                    </a>

                </div>

            </article>
        `;

    }


    /* =====================================================
       BLOG LIST RENDER
    ===================================================== */

    function render() {

        const q = search
            ? (search.value || "").toLowerCase().trim()
            : "";

        const c = cat
            ? cat.value
            : "all";


        const filtered = posts.filter(p => {

            const categoryMatch =
                c === "all" ||
                p.category === c;


            const text = (
                (p.title || "") +
                " " +
                (p.excerpt || "") +
                " " +
                (p.content || "")
            ).toLowerCase();


            const searchMatch =
                !q ||
                text.includes(q);


            return categoryMatch && searchMatch;

        });


        box.innerHTML = filtered.length

            ? filtered.map(card).join("")

            : `
                <div class="card no-posts">
                    <h2>कोई लेख नहीं मिला।</h2>

                    <p>
                        कृपया दूसरा शब्द या श्रेणी चुनकर फिर से खोजें।
                    </p>
                </div>
            `;

    }


    /* =====================================================
       SEARCH & CATEGORY
    ===================================================== */

    if (search) {
        search.addEventListener("input", render);
    }

    if (cat) {
        cat.addEventListener("change", render);
    }


    /* =====================================================
       SINGLE ARTICLE
    ===================================================== */

    const id =
        new URLSearchParams(location.search).get("post");


    if (id) {

        const p = posts.find(x => String(x.id) === String(id));


        if (p) {

            /* Blog list hide */
            box.style.display = "none";


            /* Search / category tools hide */
            const tools =
                document.querySelector(".blog-tools");

            if (tools) {
                tools.style.display = "none";
            }


            /* Blog Hero hide */
            const hero =
                document.querySelector(".blog-hero");

            if (hero) {
                hero.style.display = "none";
            }


            /* Article show */
            detail.innerHTML = `

                <article class="article-page">

                    <a
                        href="blog.html"
                        class="back-link"
                    >
                        ← सभी लेख
                    </a>


                    <small class="article-meta">

                        ${esc(p.category || "सामान्य")}
                        •
                        ${date(p.date)}

                    </small>


                    <h1>
                        ${esc(p.title)}
                    </h1>


                    ${
                        p.excerpt
                        ? `
                            <p class="article-excerpt">
                                ${esc(p.excerpt)}
                            </p>
                          `
                        : ""
                    }


                    <div class="article">

                        ${p.content || ""}

                    </div>

                </article>

            `;


            detail.style.display = "block";


        } else {

            /* =================================================
               ARTICLE NOT FOUND
            ================================================= */

            box.style.display = "none";

            const tools =
                document.querySelector(".blog-tools");

            if (tools) {
                tools.style.display = "none";
            }


            detail.innerHTML = `

                <div class="card">

                    <h2>
                        लेख नहीं मिला
                    </h2>

                    <p>
                        जिस लेख को आप खोलना चाहते हैं,
                        वह उपलब्ध नहीं है।
                    </p>

                    <a href="blog.html">
                        ← सभी लेखों पर वापस जाएँ
                    </a>

                </div>

            `;


            detail.style.display = "block";

        }


    } else {

        /* =================================================
           NORMAL BLOG PAGE
        ================================================= */

        detail.style.display = "none";

        box.style.display = "";

        const hero =
            document.querySelector(".blog-hero");

        if (hero) {
            hero.style.display = "";
        }

        const tools =
            document.querySelector(".blog-tools");

        if (tools) {
            tools.style.display = "";
        }

        render();

    }

});
