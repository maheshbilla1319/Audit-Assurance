/* =========================================================
   AUDITASSURE WEBSITE
   COMPLETE SCRIPT.JS
   Clean + Responsive + Mobile Menu + Validation + Animation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SELECT ELEMENTS
    ===================================================== */

    const preloader =
        document.getElementById("preloader");

    const header =
        document.getElementById("header");

    const menuBtn =
        document.getElementById("menuBtn") ||
        document.querySelector(".menu-btn");

    const nav =
        document.getElementById("nav") ||
        document.getElementById("mainNav") ||
        document.querySelector(".nav");

    const navLinks =
        document.querySelectorAll(".nav-link");

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
       HAMBURGER → X
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


        /* Hamburger bars */

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
       CLICK OUTSIDE MENU
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (!menuBtn || !nav) return;

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
       ESC KEY
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
            "main section[id], section[id]"
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
       SCROLL REVEAL
    ===================================================== */

    const revealItems =
        document.querySelectorAll(
            ".reveal, .reveal-about, .reveal-card, .reveal-left, .reveal-right, .info-block"
        );


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

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
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
            item.classList.add("active");

        });

    }


    /* =====================================================
       STAT COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

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


                const value =
                    Math.floor(
                        target * eased
                    );


                counter.textContent =
                    value.toLocaleString();


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
       ABOUT COUNTERS
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


                if (!Number.isFinite(target)) {
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


                    if (progress < 1) {

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


    const aboutSection =
        document.querySelector(
            ".about-section"
        );


    if (
        aboutSection &&
        aboutCounters.length &&
        "IntersectionObserver" in window
    ) {

        const aboutObserver =
            new IntersectionObserver(
                (entries) => {

                    if (
                        entries[0] &&
                        entries[0].isIntersecting
                    ) {

                        startAboutCounters();

                        aboutObserver.disconnect();

                    }

                },
                {
                    threshold: 0.25
                }
            );


        aboutObserver.observe(
            aboutSection
        );

    }


    /* =====================================================
       CONTACT FORM VALIDATION
       NAME + EMAIL + SERVICE + MESSAGE + PRIVACY
       PHONE IS OPTIONAL
       SUCCESS → 404.HTML
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const formMessage =
        document.getElementById(
            "formMessage"
        );

    const submitBtn =
        document.getElementById(
            "submitBtn"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                /* =================================================
                   GET INPUTS
                ================================================= */

                const name =
                    document.getElementById(
                        "name"
                    );

                const email =
                    document.getElementById(
                        "email"
                    );

                const phone =
                    document.getElementById(
                        "phone"
                    );

                const service =
                    document.getElementById(
                        "service"
                    );

                const message =
                    document.getElementById(
                        "message"
                    );

                const privacy =
                    document.getElementById(
                        "privacy"
                    );


                /* =================================================
                   CLEAR OLD ERRORS
                ================================================= */

                contactForm
                    .querySelectorAll(
                        ".input-group"
                    )
                    .forEach((group) => {

                        group.classList.remove(
                            "error"
                        );

                    });


                if (formMessage) {

                    formMessage.textContent = "";

                    formMessage.className =
                        "form-message";

                }


                let isValid = true;


                /* =================================================
                   NAME VALIDATION
                ================================================= */

                if (
                    !name ||
                    name.value.trim() === ""
                ) {

                    if (name) {

                        const group =
                            name.closest(
                                ".input-group"
                            );

                        if (group) {
                            group.classList.add(
                                "error"
                            );
                        }

                    }

                    isValid = false;

                }


                /* =================================================
                   EMAIL VALIDATION
                ================================================= */

                if (
                    !email ||
                    email.value.trim() === ""
                ) {

                    if (email) {

                        const group =
                            email.closest(
                                ".input-group"
                            );

                        if (group) {
                            group.classList.add(
                                "error"
                            );
                        }

                    }

                    isValid = false;

                } else if (
                    !email.checkValidity()
                ) {

                    const group =
                        email.closest(
                            ".input-group"
                        );

                    if (group) {
                        group.classList.add(
                            "error"
                        );
                    }

                    isValid = false;

                }


                /* =================================================
                   PHONE
                   OPTIONAL
                ================================================= */

                if (
                    phone &&
                    phone.value.trim() !== ""
                ) {

                    const phonePattern =
                        /^[0-9+\-\s()]{7,20}$/;


                    if (
                        !phonePattern.test(
                            phone.value.trim()
                        )
                    ) {

                        const group =
                            phone.closest(
                                ".input-group"
                            );

                        if (group) {
                            group.classList.add(
                                "error"
                            );
                        }

                        isValid = false;

                    }

                }


                /* =================================================
                   SERVICE VALIDATION
                ================================================= */

                if (
                    !service ||
                    service.value === ""
                ) {

                    if (service) {

                        const group =
                            service.closest(
                                ".input-group"
                            );

                        if (group) {
                            group.classList.add(
                                "error"
                            );
                        }

                    }

                    isValid = false;

                }


                /* =================================================
                   MESSAGE VALIDATION
                ================================================= */

                if (
                    !message ||
                    message.value.trim() === ""
                ) {

                    if (message) {

                        const group =
                            message.closest(
                                ".input-group"
                            );

                        if (group) {
                            group.classList.add(
                                "error"
                            );
                        }

                    }

                    isValid = false;

                }


                /* =================================================
                   PRIVACY CHECKBOX
                ================================================= */

                if (
                    !privacy ||
                    !privacy.checked
                ) {

                    isValid = false;

                }


                /* =================================================
                   INVALID FORM
                ================================================= */

                if (!isValid) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please fill in all required fields correctly.";

                        formMessage.classList.add(
                            "error-message"
                        );

                    }

                    return;

                }


                /* =================================================
                   VALID FORM
                ================================================= */

                if (formMessage) {

                    formMessage.textContent =
                        "Enquiry submitted successfully!";

                    formMessage.classList.add(
                        "success-message"
                    );

                }


                /* Disable button */

                if (submitBtn) {

                    submitBtn.disabled = true;

                    const buttonText =
                        submitBtn.querySelector(
                            "span"
                        );

                    if (buttonText) {

                        buttonText.textContent =
                            "Submitting...";

                    }

                }


                /* =================================================
                   REDIRECT TO 404.HTML
                ================================================= */

                setTimeout(() => {

                    window.location.href =
                        "404.html";

                }, 1000);

            }
        );

    }


    /* =====================================================
       NEWSLETTER FORM
       VALID EMAIL → 404.HTML
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

                const message =
                    document.getElementById(
                        "newsletterMessage"
                    );


                if (message) {

                    message.textContent = "";

                    message.className = "";

                }


                /* Empty */

                if (
                    !email ||
                    email.value.trim() === ""
                ) {

                    if (message) {

                        message.textContent =
                            "Please enter your email address.";

                        message.classList.add(
                            "error"
                        );

                    }

                    if (email) {
                        email.focus();
                    }

                    return;

                }


                /* Invalid */

                if (
                    !email.checkValidity()
                ) {

                    if (message) {

                        message.textContent =
                            "Please enter a valid email address.";

                        message.classList.add(
                            "error"
                        );

                    }

                    email.focus();

                    return;

                }


                /* Success */

                if (message) {

                    message.textContent =
                        "Subscribed successfully!";

                    message.classList.add(
                        "success"
                    );

                }


                setTimeout(() => {

                    window.location.href =
                        "404.html";

                }, 1000);

            }
        );

    }


    /* =====================================================
       LOGIN FORM
    ===================================================== */

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    const loginMessage =
        document.getElementById(
            "loginMessage"
        );


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


                if (loginMessage) {

                    loginMessage.textContent =
                        "Login successful!";

                    loginMessage.style.color =
                        "#159447";

                }

            }
        );

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
       FEATURE CARD EFFECT
    ===================================================== */

    const featureCards =
        document.querySelectorAll(
            ".audit-feature-card"
        );


    featureCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.matchMedia(
                        "(hover: none)"
                    ).matches
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y - rect.height / 2) /
                        (rect.height / 2)) *
                    -3;


                const rotateY =
                    ((x - rect.width / 2) /
                        (rect.width / 2)) *
                    3;


                card.style.transform =
                    `translateY(-8px) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

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

        });


    /* =====================================================
       FAQ
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach((item) => {

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


                            if (otherIcon) {

                                otherIcon.textContent =
                                    "+";

                            }

                        }

                    }
                );


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

    });


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


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .login-btn, .submit-btn"
        );


    buttons.forEach((button) => {

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

    });

});


/* =========================================================
   BUTTON RIPPLE ANIMATION
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