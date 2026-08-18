/* =====================================================
   AUDITASSURE - COMPLETE BLOG JS
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       PRELOADER
    ================================================= */

    const preloader = document.getElementById("preloader");

    const hidePreloader = () => {

        if (!preloader) return;

        preloader.classList.add("hide");

        document.body.classList.add("page-loaded");

        setTimeout(() => {

            if (preloader && preloader.parentNode) {
                preloader.remove();
            }

        }, 800);
    };

    setTimeout(hidePreloader, 900);


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("mainNav");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            navbar.classList.toggle("active");
            menuBtn.classList.toggle("active");

            const isOpen =
                navbar.classList.contains("active");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* =============================================
           CLOSE MENU WHEN LINK CLICKED
        ============================================= */

        navbar.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

                menuBtn.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        /* =============================================
           CLOSE MENU OUTSIDE
        ============================================= */

        document.addEventListener("click", (event) => {

            if (
                !navbar.contains(event.target) &&
                !menuBtn.contains(event.target) &&
                navbar.classList.contains("active")
            ) {

                navbar.classList.remove("active");

                menuBtn.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });


        /* =============================================
           ESC KEY
        ============================================= */

        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                navbar.classList.contains("active")
            ) {

                navbar.classList.remove("active");

                menuBtn.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        /* =============================================
           CLOSE MENU WHEN SCREEN BECOMES DESKTOP
        ============================================= */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 796) {

                navbar.classList.remove("active");

                menuBtn.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =================================================
       HEADER SCROLL
    ================================================= */

    const header = document.getElementById("header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 40) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        });

    }


    /* =================================================
       ACTIVE PAGE
    ================================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document.querySelectorAll(".nav-link").forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href
                .split("/")
                .pop()
                .split("?")[0]
                .split("#")[0]
                .toLowerCase();

        link.classList.remove("active");

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            obs.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    }


    /* =================================================
       SMOOTH INTERNAL LINKS
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =================================================
       BACK TO TOP
    ================================================= */

    const backTop =
        document.querySelector(".back-top");

    if (backTop) {

        backTop.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backTop.classList.add("show");

            } else {

                backTop.classList.remove("show");

            }

        });

    }


    /* =================================================
       SERVICE ICON ANIMATION
    ================================================= */

    document
        .querySelectorAll(".service-card")
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    const icon =
                        card.querySelector(".service-icon");

                    if (icon) {
                        icon.style.transform =
                            "rotateY(360deg)";
                    }

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    const icon =
                        card.querySelector(".service-icon");

                    if (icon) {
                        icon.style.transform =
                            "rotateY(0deg)";
                    }

                }
            );

        });


    /* =================================================
       PAGE LOADED
    ================================================= */

    document.body.classList.add("page-loaded");

});


/* =====================================================
   INSIDE OUR WORK - SLIDER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const sliderTrack = document.getElementById("sliderTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!sliderTrack || !prevBtn || !nextBtn) return;

    const slides = sliderTrack.querySelectorAll(".slide");

    if (slides.length === 0) return;

    let currentSlide = 0;

    function updateSlider() {

        const slideWidth = slides[0].getBoundingClientRect().width;

        sliderTrack.style.transform =
            `translateX(-${currentSlide * slideWidth}px)`;

        // Disable buttons at beginning/end
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;

    }


    /* NEXT BUTTON */
    nextBtn.addEventListener("click", () => {

        if (currentSlide < slides.length - 1) {

            currentSlide++;

            updateSlider();

        }

    });


    /* PREVIOUS BUTTON */
    prevBtn.addEventListener("click", () => {

        if (currentSlide > 0) {

            currentSlide--;

            updateSlider();

        }

    });


    /* Responsive resize */
    window.addEventListener("resize", () => {

        updateSlider();

    });


    /* Initial position */
    updateSlider();

});
/* =====================================================
   NEWSLETTER FORM VALIDATION
   VALID GMAIL -> 404.HTML
===================================================== */

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");

const newsletterMessage =
    document.getElementById("newsletterMessage");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                newsletterEmail.value.trim();

            /* Gmail validation */
            const gmailPattern =
                /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

            /* Clear previous message */
            newsletterMessage.textContent = "";
            newsletterMessage.className = "";

            newsletterEmail.classList.remove("input-error");


            /* Empty email */
            if (email === "") {

                newsletterMessage.textContent =
                    "Please enter your email address.";

                newsletterMessage.classList.add(
                    "error-message"
                );

                newsletterEmail.classList.add(
                    "input-error"
                );

                return;
            }


            /* Invalid Gmail */
            if (!gmailPattern.test(email)) {

                newsletterMessage.textContent =
                    "Please enter a valid Gmail address.";

                newsletterMessage.classList.add(
                    "error-message"
                );

                newsletterEmail.classList.add(
                    "input-error"
                );

                return;
            }


            /* Valid Gmail */
            newsletterMessage.textContent =
                "Subscription successful!";

            newsletterMessage.classList.add(
                "success-message"
            );


            /* Redirect to 404.html */
            setTimeout(() => {

                window.location.href =
                    "404.html";

            }, 500);

        }
    );

}