/* =========================================================
   AUDITASSURE WEBSITE
   COMPLETE SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     SELECT ELEMENTS
  ======================================================= */

  const preloader = document.getElementById("preloader");
  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  const navLinks = document.querySelectorAll(".nav-link");
  const revealItems = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".counter");

  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  const year = document.getElementById("year");


  /* =======================================================
     PRELOADER
  ======================================================= */

  function hidePreloader() {

    if (!preloader) return;

    preloader.classList.add("hide");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 800);

  }


  /*
    Normal page loading
  */

  window.addEventListener("load", () => {

    setTimeout(() => {
      hidePreloader();
    }, 600);

  });


  /*
    Safety fallback

    Even if an image/video takes too long,
    the Home page will still become visible.
  */

  setTimeout(() => {
    hidePreloader();
  }, 4000);



  
  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

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


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

      const isOpen =
        nav.classList.toggle("open");


      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );


      menuBtn.setAttribute(
        "aria-label",
        isOpen
          ? "Close menu"
          : "Open menu"
      );


      const bars =
        menuBtn.querySelectorAll("span");


      if (isOpen) {

        if (bars[0]) {
          bars[0].style.transform =
            "translateY(7px) rotate(45deg)";
        }

        if (bars[1]) {
          bars[1].style.opacity = "0";
        }

        if (bars[2]) {
          bars[2].style.transform =
            "translateY(-7px) rotate(-45deg)";
        }

      } else {

        bars.forEach((bar) => {

          bar.style.transform = "";
          bar.style.opacity = "";

        });

      }

    });

  }


  /* =======================================================
     CLOSE MOBILE MENU AFTER CLICK
  ======================================================= */

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      if (!nav || !menuBtn) return;


      nav.classList.remove("open");


      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );


      menuBtn.setAttribute(
        "aria-label",
        "Open menu"
      );


      menuBtn
        .querySelectorAll("span")
        .forEach((bar) => {

          bar.style.transform = "";
          bar.style.opacity = "";

        });

    });

  });


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  function setActiveNav() {

    let current = "home";


    sections.forEach((section) => {

      const top =
        section.offsetTop - 160;


      if (window.scrollY >= top) {

        current = section.id;

      }

    });


    navLinks.forEach((link) => {

      const href =
        link.getAttribute("href");


      /*
        Only activate same-page anchor links.

        Example:
        #home
        #services
        #contact

        Do not remove active state from
        links such as about.html.
      */

      if (href && href.startsWith("#")) {

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


  /* =======================================================
     SCROLL REVEAL ANIMATION
  ======================================================= */

  if (
    revealItems.length &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add("show");

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


    revealItems.forEach((item, index) => {

      item.style.transitionDelay =
        `${Math.min(index * 60, 360)}ms`;

      revealObserver.observe(item);

    });

  } else {

    revealItems.forEach((item) => {
      item.classList.add("show");
    });

  }


  /* =======================================================
     ANIMATED STAT COUNTERS
  ======================================================= */

  let countersStarted = false;


  function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;


    counters.forEach((counter) => {

      const target =
        Number(counter.dataset.target);


      if (Number.isNaN(target)) return;


      const duration = 1600;

      const startTime =
        performance.now();


      function updateCounter(currentTime) {

        const progress =
          Math.min(
            (currentTime - startTime) /
            duration,
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


  /* =======================================================
     COUNTER OBSERVER
  ======================================================= */

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


  /* =======================================================
     LOGIN FORM
  ======================================================= */

  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const emailInput =
          document.getElementById("email");


        const passwordInput =
          document.getElementById("password");


        const email =
          emailInput
            ? emailInput.value.trim()
            : "";


        const password =
          passwordInput
            ? passwordInput.value.trim()
            : "";


        if (!email || !password) {

          if (loginMessage) {

            loginMessage.textContent =
              "Please enter your email and password.";

            loginMessage.style.color =
              "#c62828";

          }

          return;

        }


        /*
          Demo login.
          Replace this section with
          backend authentication later.
        */

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


  /* =======================================================
     FOOTER YEAR
  ======================================================= */

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const hero =
    document.querySelector(".hero");


  const heroBg =
    document.querySelector(".hero-bg");


  if (
    hero &&
    heroBg &&
    window.matchMedia("(pointer: fine)").matches
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


  /* =======================================================
     BUTTON RIPPLE EFFECT
  ======================================================= */

  const buttons =
    document.querySelectorAll(
      ".btn, .login-btn"
    );


  buttons.forEach((button) => {

    button.addEventListener(
      "click",
      function (event) {

        const ripple =
          document.createElement("span");


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


  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");


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
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;


          window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

          });

        }
      );

    });


  /* =======================================================
     ESC KEY - CLOSE MOBILE MENU
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        nav &&
        nav.classList.contains("open")
      ) {

        nav.classList.remove(
          "open"
        );


        if (menuBtn) {

          menuBtn.setAttribute(
            "aria-expanded",
            "false"
          );


          menuBtn.setAttribute(
            "aria-label",
            "Open menu"
          );


          menuBtn
            .querySelectorAll("span")
            .forEach((bar) => {

              bar.style.transform = "";
              bar.style.opacity = "";

            });

        }

      }

    }
  );


  /* =======================================================
     RESIZE HANDLER
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      /*
        Close mobile navigation
        when returning to desktop.
      */

      if (
        window.innerWidth > 900 &&
        nav
      ) {

        nav.classList.remove(
          "open"
        );


        if (menuBtn) {

          menuBtn.setAttribute(
            "aria-expanded",
            "false"
          );


          menuBtn.setAttribute(
            "aria-label",
            "Open menu"
          );


          menuBtn
            .querySelectorAll("span")
            .forEach((bar) => {

              bar.style.transform = "";
              bar.style.opacity = "";

            });

        }

      }

    }
  );


  /* =======================================================
     ABOUT SECTION ANIMATION
  ======================================================= */

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

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

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
          threshold: 0.15
        }
      );


    aboutElements.forEach((element) => {

      aboutObserver.observe(
        element
      );

    });

  } else {

    aboutElements.forEach((element) => {

      element.classList.add(
        "active"
      );

    });

  }


  /* =======================================================
     ABOUT EXPERIENCE COUNTER
  ======================================================= */

  const aboutCounters =
    document.querySelectorAll(
      ".about-section .counter"
    );


  let aboutCounterStarted =
    false;


  function startAboutCounters() {

    if (aboutCounterStarted) return;

    aboutCounterStarted = true;


    aboutCounters.forEach((counter) => {

      const target =
        Number(
          counter.dataset.target
        );


      if (Number.isNaN(target)) return;


      const duration = 1800;

      const start =
        performance.now();


      function updateCounter(time) {

        const progress =
          Math.min(
            (time - start) /
            duration,
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


  /* =======================================================
     ABOUT COUNTER OBSERVER
  ======================================================= */

  const aboutSection =
    document.querySelector(
      ".about-section"
    );


  if (
    aboutSection &&
    aboutCounters.length &&
    "IntersectionObserver" in window
  ) {

    const counterObserver =
      new IntersectionObserver(
        (entries) => {

          if (
            entries[0] &&
            entries[0].isIntersecting
          ) {

            startAboutCounters();

            counterObserver.disconnect();

          }

        },
        {
          threshold: 0.25
        }
      );


    counterObserver.observe(
      aboutSection
    );

  }


  /* =======================================================
     FAQ PLUS / MINUS
  ======================================================= */

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


              if (otherIcon) {

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
            item.classList.contains("active")
              ? "−"
              : "+";

        }

      }
    );

  });


  /* =======================================================
     BUTTON RIPPLE KEYFRAME
  ======================================================= */

  const rippleStyle =
    document.createElement(
      "style"
    );


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


});



    /* =====================================================
       MOBILE MENU
       HAMBURGER → X
    ===================================================== */

    function openMenu() {

        if (!menuBtn || !mainNav) return;

        mainNav.classList.add("open");
        mainNav.classList.add("active");

        menuBtn.classList.add("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");
    }


    function closeMenu() {

        if (!menuBtn || !mainNav) return;

        mainNav.classList.remove("open");
        mainNav.classList.remove("active");

        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");
    }


    function toggleMenu() {

        if (!mainNav) return;

        if (
            mainNav.classList.contains("open") ||
            mainNav.classList.contains("active")
        ) {

            closeMenu();

        } else {

            openMenu();

        }
    }


    /* Menu button */

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleMenu();

            }
        );

    }



    /* =====================================================
       CLOSE MENU AFTER NAV LINK CLICK
    ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );

    });
