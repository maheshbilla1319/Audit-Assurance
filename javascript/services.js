/* =========================================================
   AUDITASSURE WEBSITE
   COMPLETE SCRIPT.JS
   Clean + Responsive + Mobile Menu + Animations
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SELECT ELEMENTS
    ===================================================== */

    const preloader = document.getElementById("preloader");
    const header = document.getElementById("header");

    const menuBtn = document.getElementById("menuBtn");

    /*
       Supports either:
       #nav
       OR
       #mainNav
    */
    const nav =
        document.getElementById("nav") ||
        document.getElementById("mainNav");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const loginBtn =
        document.querySelector(".login-btn");

    const revealItems =
        document.querySelectorAll(".reveal");

    const counters =
        document.querySelectorAll(".counter");

    const loginForm =
        document.getElementById("loginForm");

    const loginMessage =
        document.getElementById("loginMessage");

    const year =
        document.getElementById("year");


    /* =====================================================
       PRELOADER
    ===================================================== */

    function hidePreloader() {

        if (!preloader) return;

        preloader.classList.add("hide");

        setTimeout(() => {

            if (preloader) {
                preloader.style.display = "none";
            }

        }, 800);

    }


    window.addEventListener("load", () => {

        setTimeout(() => {
            hidePreloader();
        }, 500);

    });


    /* Safety fallback */

    setTimeout(() => {
        hidePreloader();
    }, 4000);



    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function handleScroll() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();



    /* =====================================================
       MOBILE MENU
       HOME | ABOUT | SERVICES | BLOG | CONTACT | LOGIN
    ===================================================== */

    function openMenu() {

        if (!menuBtn || !nav) return;

        nav.classList.add("open");
        nav.classList.add("active");

        menuBtn.classList.add("active");

        document.body.classList.add("menu-open");

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Close navigation menu"
        );


        /* Hamburger -> X */

        const bars =
            menuBtn.querySelectorAll("span");


        if (bars[0]) {

            bars[0].style.transform =
                "translateY(8px) rotate(45deg)";

        }


        if (bars[1]) {

            bars[1].style.opacity = "0";

        }


        if (bars[2]) {

            bars[2].style.transform =
                "translateY(-8px) rotate(-45deg)";

        }

    }



    /* =====================================================
       CLOSE MENU
    ===================================================== */

    function closeMenu() {

        if (!menuBtn || !nav) return;

        nav.classList.remove("open");
        nav.classList.remove("active");

        menuBtn.classList.remove("active");

        document.body.classList.remove(
            "menu-open"
        );

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        /* X -> Hamburger */

        const bars =
            menuBtn.querySelectorAll("span");


        bars.forEach((bar) => {

            bar.style.transform = "";
            bar.style.opacity = "";

        });

    }



    /* =====================================================
       MENU TOGGLE
    ===================================================== */

    if (menuBtn && nav) {

        menuBtn.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const isOpen =
                    nav.classList.contains("open") ||
                    nav.classList.contains("active");


                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }



    /* =====================================================
       CLOSE MENU AFTER NAV LINK CLICK
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMenu();

            }
        );

    });



    /* =====================================================
       LOGIN BUTTON CLOSE MENU
    ===================================================== */

    if (loginBtn) {

        loginBtn.addEventListener(
            "click",
            () => {

                closeMenu();

            }
        );

    }



    /* =====================================================
       CLICK OUTSIDE MENU
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (!nav || !menuBtn) return;


            const menuIsOpen =
                nav.classList.contains("open") ||
                nav.classList.contains("active");


            if (
                menuIsOpen &&
                !nav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                closeMenu();

            }

        }
    );



    /* =====================================================
       ESC KEY CLOSE
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                nav &&
                (
                    nav.classList.contains("open") ||
                    nav.classList.contains("active")
                )
            ) {

                closeMenu();

            }

        }
    );



    /* =====================================================
       RESIZE
       DESKTOP -> CLOSE MOBILE MENU
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                closeMenu();

            }

        }
    );



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    function setActiveNav() {

        if (!navLinks.length) return;

        let current = "home";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 160;


            if (
                window.scrollY >= sectionTop
            ) {

                current = section.id;

            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");


            /*
               Only activate
               same-page anchor links
            */

            if (
                href &&
                href.startsWith("#")
            ) {

                link.classList.toggle(
                    "active",
                    href === `#${current}`
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        setActiveNav,
        { passive: true }
    );

    setActiveNav();



    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    if (
        revealItems.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealItems.forEach(
            (item, index) => {

                item.style.transitionDelay =
                    `${Math.min(
                        index * 60,
                        360
                    )}ms`;

                revealObserver.observe(item);

            }
        );

    } else {

        revealItems.forEach((item) => {

            item.classList.add("show");

        });

    }



    /* =====================================================
       STAT COUNTERS
    ===================================================== */

    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) return;

        countersStarted = true;


        counters.forEach((counter) => {

            const target =
                Number(
                    counter.dataset.target
                );


            if (!Number.isFinite(target)) {
                return;
            }


            const duration = 1600;

            const startTime =
                performance.now();


            function updateCounter(
                currentTime
            ) {

                const progress =
                    Math.min(
                        (
                            currentTime -
                            startTime
                        ) / duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const currentValue =
                    Math.floor(
                        target * eased
                    );


                counter.textContent =
                    currentValue.toLocaleString();


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target.toLocaleString();

                }

            }


            requestAnimationFrame(
                updateCounter
            );

        });

    }



    /* =====================================================
       STATS OBSERVER
    ===================================================== */

    const statsSection =
        document.querySelector(
            ".stats-wrap"
        );


    if (
        statsSection &&
        "IntersectionObserver" in window
    ) {

        const statsObserver =
            new IntersectionObserver(
                (entries) => {

                    if (
                        entries[0] &&
                        entries[0].isIntersecting
                    ) {

                        animateCounters();

                        statsObserver.disconnect();

                    }

                },
                {
                    threshold: 0.25
                }
            );


        statsObserver.observe(
            statsSection
        );

    }



    /* =====================================================
       ABOUT EXPERIENCE COUNTER
    ===================================================== */

    const aboutCounters =
        document.querySelectorAll(
            ".about-section .counter"
        );


    let aboutCounterStarted = false;


    function startAboutCounters() {

        if (aboutCounterStarted) return;

        aboutCounterStarted = true;


        aboutCounters.forEach(
            (counter) => {

                const target =
                    Number(
                        counter.dataset.target
                    );


                if (
                    !Number.isFinite(target)
                ) {
                    return;
                }


                const duration = 1800;

                const start =
                    performance.now();


                function updateAboutCounter(
                    time
                ) {

                    const progress =
                        Math.min(
                            (
                                time -
                                start
                            ) / duration,
                            1
                        );


                    const ease =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    counter.textContent =
                        Math.floor(
                            target * ease
                        ).toLocaleString();


                    if (
                        progress < 1
                    ) {

                        requestAnimationFrame(
                            updateAboutCounter
                        );

                    } else {

                        counter.textContent =
                            target.toLocaleString();

                    }

                }


                requestAnimationFrame(
                    updateAboutCounter
                );

            }
        );

    }



    /* =====================================================
       ABOUT COUNTER OBSERVER
    ===================================================== */

    const aboutSection =
        document.querySelector(
            ".about-section"
        );


    if (
        aboutSection &&
        aboutCounters.length &&
        "IntersectionObserver" in window
    ) {

        const aboutCounterObserver =
            new IntersectionObserver(
                (entries) => {

                    if (
                        entries[0] &&
                        entries[0].isIntersecting
                    ) {

                        startAboutCounters();

                        aboutCounterObserver.disconnect();

                    }

                },
                {
                    threshold: 0.25
                }
            );


        aboutCounterObserver.observe(
            aboutSection
        );

    }



    /* =====================================================
       ABOUT REVEAL
    ===================================================== */

    const aboutElements =
        document.querySelectorAll(
            ".reveal-left, .reveal-right"
        );


    if (
        aboutElements.length &&
        "IntersectionObserver" in window
    ) {

        const aboutObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "active"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        aboutElements.forEach(
            (element) => {

                aboutObserver.observe(
                    element
                );

            }
        );

    } else {

        aboutElements.forEach(
            (element) => {

                element.classList.add(
                    "active"
                );

            }
        );

    }



    /* =====================================================
       SERVICE INFO SCROLL ANIMATION
    ===================================================== */

    const infoBlocks =
        document.querySelectorAll(
            ".info-block"
        );


    if (
        infoBlocks.length &&
        "IntersectionObserver" in window
    ) {

        const infoObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        infoBlocks.forEach(
            (block) => {

                infoObserver.observe(
                    block
                );

            }
        );

    }



    /* =====================================================
       LOGIN FORM
    ===================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const emailInput =
                    document.getElementById(
                        "email"
                    );


                const passwordInput =
                    document.getElementById(
                        "password"
                    );


                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";


                const password =
                    passwordInput
                        ? passwordInput.value.trim()
                        : "";


                if (
                    !email ||
                    !password
                ) {

                    if (loginMessage) {

                        loginMessage.textContent =
                            "Please enter your email and password.";

                        loginMessage.style.color =
                            "#c62828";

                    }

                    return;

                }


                /* Demo Login */

                if (loginMessage) {

                    loginMessage.textContent =
                        "Login successful! Redirecting...";

                    loginMessage.style.color =
                        "#159447";

                }


                setTimeout(() => {

                    if (loginMessage) {

                        loginMessage.textContent =
                            "Welcome to AuditAssure.";

                    }

                }, 1200);

            }
        );

    }



    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(
            ".hero"
        );


    const heroBg =
        document.querySelector(
            ".hero-bg"
        );


    if (
        hero &&
        heroBg &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    ) * 8;


                const y =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    ) * 5;


                heroBg.style.transform =
                    `scale(1.08) translate(${x}px, ${y}px)`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroBg.style.transform = "";

            }
        );

    }



    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .login-btn"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                function (event) {

                    const ripple =
                        document.createElement(
                            "span"
                        );


                    const rect =
                        this.getBoundingClientRect();


                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );


                    const x =
                        event.clientX -
                        rect.left -
                        size / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        size / 2;


                    ripple.style.position =
                        "absolute";

                    ripple.style.width =
                        `${size}px`;

                    ripple.style.height =
                        `${size}px`;

                    ripple.style.left =
                        `${x}px`;

                    ripple.style.top =
                        `${y}px`;

                    ripple.style.borderRadius =
                        "50%";

                    ripple.style.background =
                        "rgba(255,255,255,0.25)";

                    ripple.style.transform =
                        "scale(0)";

                    ripple.style.pointerEvents =
                        "none";

                    ripple.style.animation =
                        "buttonRipple 0.6s ease-out";


                    this.style.position =
                        "relative";

                    this.style.overflow =
                        "hidden";


                    this.appendChild(
                        ripple
                    );


                    setTimeout(() => {

                        ripple.remove();

                    }, 650);

                }
            );

        }
    );



    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) return;


                        event.preventDefault();


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const targetPosition =
                            target.getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight;


                        window.scrollTo({

                            top:
                                targetPosition,

                            behavior:
                                "smooth"

                        });

                    }
                );

            }
        );



    /* =====================================================
       FAQ PLUS / MINUS
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(
        (item) => {

            const question =
                item.querySelector(
                    ".faq-question"
                );


            const icon =
                item.querySelector(
                    ".faq-icon"
                );


            if (!question) return;


            question.addEventListener(
                "click",
                () => {


                    /* Close other FAQ items */

                    faqItems.forEach(
                        (otherItem) => {

                            if (
                                otherItem !== item
                            ) {

                                otherItem.classList.remove(
                                    "active"
                                );


                                const otherIcon =
                                    otherItem.querySelector(
                                        ".faq-icon"
                                    );


                                if (
                                    otherIcon
                                ) {

                                    otherIcon.textContent =
                                        "+";

                                }

                            }

                        }
                    );


                    /* Toggle current FAQ */

                    item.classList.toggle(
                        "active"
                    );


                    if (icon) {

                        icon.textContent =
                            item.classList.contains(
                                "active"
                            )
                                ? "−"
                                : "+";

                    }

                }
            );

        }
    );



    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletterForm =
        document.getElementById(
            "newsletterForm"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "newsletterEmail"
                    );


                if (
                    email &&
                    email.value.trim()
                ) {

                    alert(
                        "Thank you! You have subscribed successfully."
                    );


                    email.value = "";

                }

            }
        );

    }



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.querySelector(
            ".back-top"
        );


    if (backTop) {

        backTop.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }

});



/* =========================================================
   BUTTON RIPPLE KEYFRAME
========================================================= */

const rippleStyle =
    document.createElement("style");


rippleStyle.textContent = `

@keyframes buttonRipple {

    0% {
        transform: scale(0);
        opacity: 1;
    }

    100% {
        transform: scale(2.5);
        opacity: 0;
    }

}

`;


document.head.appendChild(
    rippleStyle
);