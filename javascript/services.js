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

    /* Supports both HTML versions */
    const nav =
        document.getElementById("nav") ||
        document.getElementById("mainNav");

    const navLinks =
        document.querySelectorAll(".nav-link");

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

    let preloaderHidden = false;

    function hidePreloader() {

        if (!preloader || preloaderHidden) {
            return;
        }

        preloaderHidden = true;

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

        if (!header) {
            return;
        }

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
    ===================================================== */

    function openMenu() {

        if (!menuBtn || !nav) {
            return;
        }

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
       CLOSE MOBILE MENU
    ===================================================== */

    function closeMenu() {

        if (!menuBtn || !nav) {
            return;
        }

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
       MOBILE MENU TOGGLE
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
       NAVIGATION LINKS
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

            if (!nav || !menuBtn) {
                return;
            }

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

        if (!navLinks.length) {
            return;
        }

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

    if (
        revealItems.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

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

        if (countersStarted) {
            return;
        }

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

        if (aboutCounterStarted) {
            return;
        }

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
       SERVICE INFO ANIMATION
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


                /* Empty fields */

                if (!email || !password) {

                    if (loginMessage) {

                        loginMessage.textContent =
                            "Please enter your email and password.";

                        loginMessage.style.color =
                            "#c62828";

                    }

                    return;

                }


                /* Invalid email */

                if (
                    emailInput &&
                    !emailInput.checkValidity()
                ) {

                    if (loginMessage) {

                        loginMessage.textContent =
                            "Please enter a valid email address.";

                        loginMessage.style.color =
                            "#c62828";

                    }

                    return;

                }


                /* Success */

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
       CONTACT FORM VALIDATION
       NAME + EMAIL + MESSAGE REQUIRED
       COMPANY OPTIONAL
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const formMessage =
        document.getElementById(
            "formMessage"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const name =
                    contactForm.querySelector(
                        '[name="name"]'
                    );

                const email =
                    contactForm.querySelector(
                        '[name="email"]'
                    );

                const message =
                    contactForm.querySelector(
                        '[name="message"]'
                    );

                let isValid = true;


                /* Remove old errors */

                contactForm
                    .querySelectorAll(
                        ".input-group"
                    )
                    .forEach(
                        (group) => {

                            group.classList.remove(
                                "error"
                            );

                        }
                    );


                if (formMessage) {

                    formMessage.textContent = "";

                    formMessage.className =
                        "form-message";

                }


                /* NAME */

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


                /* EMAIL */

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


                /* MESSAGE */

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


                /* INVALID */

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


                /* SUCCESS */

                if (formMessage) {

                    formMessage.textContent =
                        "Form submitted successfully!";

                    formMessage.classList.add(
                        "success-message"
                    );

                }


                /* Redirect after valid form */

                setTimeout(() => {

                    window.location.href =
                        "404.html";

                }, 500);

            }
        );

    }


    /* =====================================================
       NEWSLETTER FORM
       EMAIL REQUIRED
       REDIRECT TO 404.HTML
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


                /* Clear previous message */

                if (message) {

                    message.textContent = "";

                    message.className = "";

                }


                /* Email element missing */

                if (!email) {
                    return;
                }


                /* Empty email */

                if (
                    email.value.trim() === ""
                ) {

                    if (message) {

                        message.textContent =
                            "Please enter your email address.";

                        message.classList.add(
                            "error"
                        );

                    }

                    email.focus();

                    return;

                }


                /* Invalid email */

                if (!email.checkValidity()) {

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


                /* Redirect */

                setTimeout(() => {

                    window.location.href =
                        "404.html";

                }, 1000);

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
       BUTTON RIPPLE
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .login-btn, .submit-btn"
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

                        if (!target) {
                            return;
                        }

                        event.preventDefault();

                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;

                        const targetPosition =
                            target
                                .getBoundingClientRect()
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

            if (!question) {
                return;
            }

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

                                if (
                                    otherIcon
                                ) {

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

        }
    );


    /* =====================================================
       AUDIT SEARCH
    ===================================================== */

    const auditSearch =
        document.querySelector(
            ".audit-search"
        );

    if (auditSearch) {

        auditSearch.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const input =
                    this.querySelector(
                        'input[type="text"]'
                    );

                if (!input) {
                    return;
                }

                const searchValue =
                    input.value.trim();


                /* Empty */

                if (!searchValue) {

                    input.focus();

                    input.classList.add(
                        "search-error"
                    );

                    setTimeout(() => {

                        input.classList.remove(
                            "search-error"
                        );

                    }, 1200);

                    return;

                }


                /* Search button */

                const button =
                    this.querySelector(
                        "button"
                    );

                if (!button) {
                    return;
                }

                const originalText =
                    button.innerHTML;

                button.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Searching...
                `;

                button.disabled = true;


                setTimeout(() => {

                    button.innerHTML =
                        originalText;

                    button.disabled = false;

                    console.log(
                        "Audit Search:",
                        searchValue
                    );

                }, 1000);

            }
        );

    }


    /* =====================================================
       FEATURE CARD MOUSE EFFECT
    ===================================================== */

    const featureCards =
        document.querySelectorAll(
            ".audit-feature-card"
        );

    featureCards.forEach(
        (card) => {

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

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        (
                            (y - centerY) /
                            centerY
                        ) * -3;

                    const rotateY =
                        (
                            (x - centerX) /
                            centerX
                        ) * 3;

                    card.style.transform = `
                        translateY(-8px)
                        perspective(700px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                    `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        }
    );


    /* =====================================================
       COUNT CARD MOUSE EFFECT
    ===================================================== */

    const countCard =
        document.querySelector(
            ".audit-count-card"
        );

    if (countCard) {

        countCard.addEventListener(
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
                    countCard.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    (
                        (x - rect.width / 2) /
                        rect.width
                    ) * 4;

                const rotateX =
                    (
                        (y - rect.height / 2) /
                        rect.height
                    ) * -4;

                countCard.style.transform = `
                    translateY(-6px)
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;

            }
        );


        countCard.addEventListener(
            "mouseleave",
            () => {

                countCard.style.transform = "";

            }
        );

    }


    /* =====================================================
       SEARCH CARD MOUSE EFFECT
    ===================================================== */

    const searchCard =
        document.querySelector(
            ".audit-search-card"
        );

    if (searchCard) {

        searchCard.addEventListener(
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
                    searchCard.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    (
                        (x - rect.width / 2) /
                        rect.width
                    ) * 3;

                const rotateX =
                    (
                        (y - rect.height / 2) /
                        rect.height
                    ) * -3;

                searchCard.style.transform = `
                    translateY(-6px)
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;

            }
        );


        searchCard.addEventListener(
            "mouseleave",
            () => {

                searchCard.style.transform = "";

            }
        );

    }


    /* =====================================================
       SEARCH INPUT FOCUS
    ===================================================== */

    const searchInput =
        document.querySelector(
            ".search-input input"
        );

    if (searchInput) {

        searchInput.addEventListener(
            "focus",
            () => {

                if (searchInput.parentElement) {

                    searchInput.parentElement.classList.add(
                        "input-focused"
                    );

                }

            }
        );


        searchInput.addEventListener(
            "blur",
            () => {

                if (searchInput.parentElement) {

                    searchInput.parentElement.classList.remove(
                        "input-focused"
                    );

                }

            }
        );

    }


    /* =====================================================
       ABOUT PARALLAX BACKGROUND
    ===================================================== */

    const auditAbout =
        document.querySelector(
            ".audit-about"
        );

    const aboutBackground =
        document.querySelector(
            ".about-bg-image"
        );

    if (
        auditAbout &&
        aboutBackground
    ) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.innerWidth <= 600
                ) {
                    return;
                }

                const rect =
                    auditAbout.getBoundingClientRect();

                const windowHeight =
                    window.innerHeight;

                if (
                    rect.bottom < 0 ||
                    rect.top > windowHeight
                ) {
                    return;
                }

                const progress =
                    (
                        windowHeight -
                        rect.top
                    ) /
                    (
                        windowHeight +
                        rect.height
                    );

                const move =
                    (
                        progress - 0.5
                    ) * 30;

                aboutBackground.style.transform = `
                    scale(1.08)
                    translate3d(0, ${move}px, 0)
                `;

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       SEARCH ERROR + BUTTON DISABLED CSS
    ===================================================== */

    const style =
        document.createElement(
            "style"
        );

    style.textContent = `

        .search-error {
            animation: auditSearchShake 0.35s ease;
            border-color: #e30613 !important;
        }

        @keyframes auditSearchShake {

            0% {
                transform: translateX(0);
            }

            25% {
                transform: translateX(-6px);
            }

            50% {
                transform: translateX(6px);
            }

            75% {
                transform: translateX(-4px);
            }

            100% {
                transform: translateX(0);
            }

        }

        .audit-search button:disabled {
            opacity: 0.75;
            cursor: wait;
        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       RESET CARD TRANSFORM ON MOBILE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth <= 796) {

                featureCards.forEach(
                    (card) => {

                        card.style.transform = "";

                    }
                );

                if (countCard) {
                    countCard.style.transform = "";
                }

                if (searchCard) {
                    searchCard.style.transform = "";
                }

            }

        }
    );


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