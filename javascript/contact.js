/* =========================================================
   AUDITASSURE WEBSITE
   MOBILE MENU TOGGLE + HAMBURGER TO X
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav-link");

    /* -----------------------------------------
       MENU TOGGLE
    ----------------------------------------- */

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", function () {

            menuBtn.classList.toggle("active");
            nav.classList.toggle("active");
            document.body.classList.toggle("menu-open");

        });

    }


    /* -----------------------------------------
       CLOSE MENU WHEN NAV LINK IS CLICKED
    ----------------------------------------- */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            menuBtn.classList.remove("active");
            nav.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    });


    /* -----------------------------------------
       CLOSE MENU WHEN CLICKING OUTSIDE
    ----------------------------------------- */

    document.addEventListener("click", function (event) {

        if (!menuBtn || !nav) return;

        const clickedInsideMenu =
            nav.contains(event.target);

        const clickedMenuButton =
            menuBtn.contains(event.target);

        if (
            nav.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            menuBtn.classList.remove("active");
            nav.classList.remove("active");
            document.body.classList.remove("menu-open");

        }

    });


    /* -----------------------------------------
       CLOSE MENU WITH ESC KEY
    ----------------------------------------- */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            menuBtn.classList.remove("active");
            nav.classList.remove("active");
            document.body.classList.remove("menu-open");

        }

    });


    /* -----------------------------------------
       RESET MENU WHEN SCREEN BECOMES DESKTOP
    ----------------------------------------- */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

            menuBtn.classList.remove("active");
            nav.classList.remove("active");
            document.body.classList.remove("menu-open");

        }

    });


    /* -----------------------------------------
       HEADER SCROLL EFFECT
    ----------------------------------------- */

    const header = document.querySelector(".header");

    if (header) {

        function handleScroll() {

            if (window.scrollY > 50) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        }

        window.addEventListener("scroll", handleScroll);

        handleScroll();

    }


    /* -----------------------------------------
       ACTIVE NAV LINK
    ----------------------------------------- */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    /* -----------------------------------------
       PRELOADER
    ----------------------------------------- */

    const preloader =
        document.querySelector(".preloader");

    if (preloader) {

        window.addEventListener("load", function () {

            setTimeout(function () {

                preloader.classList.add("hide");

            }, 500);

        });

    }


    /* -----------------------------------------
       BACK TO TOP
    ----------------------------------------- */

    const backTop =
        document.querySelector(".back-top");

    if (backTop) {

        backTop.addEventListener("click", function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* -----------------------------------------
       NEWSLETTER FORM
    ----------------------------------------- */

    const newsletterForm =
        document.querySelector(".newsletter-form");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const input =
                newsletterForm.querySelector("input");

            if (input && input.value.trim() !== "") {

                alert("Thank you for subscribing!");

                input.value = "";

            }

        });

    }

});