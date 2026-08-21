document.addEventListener("DOMContentLoaded", () => {

    // Mobile Menu
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

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");

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

    // Current Year
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Back To Top Button
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
