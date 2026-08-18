/* =========================================================
   AUDITASSURE 404 JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       GO BACK BUTTON
    ===================================================== */

    const goBackBtn = document.getElementById("goBackBtn");

    if (goBackBtn) {

        goBackBtn.addEventListener("click", () => {

            /*
             * Check browser history.
             */

            if (window.history.length > 1) {

                window.history.back();

            } else {

                window.location.href = "index.html";

            }

        });

    }


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {

        button.addEventListener("click", function (event) {

            const ripple = document.createElement("span");

            ripple.classList.add("ripple");

            const rect = this.getBoundingClientRect();

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* =====================================================
       MOUSE PARALLAX BACKGROUND
    ===================================================== */

    const background = document.querySelector(".background");

    document.addEventListener("mousemove", (event) => {

        if (!background) return;

        const x =
            (event.clientX / window.innerWidth - 0.5) * 15;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 15;

        background.style.transform =
            `translate(${x}px, ${y}px)`;

    });


    /* =====================================================
       RANDOM DOT ANIMATION
    ===================================================== */

    const dots = document.querySelectorAll(".dot");

    dots.forEach(dot => {

        const randomX =
            Math.random() * 30 - 15;

        const randomY =
            Math.random() * 30 - 15;

        dot.style.marginLeft = `${randomX}px`;
        dot.style.marginTop = `${randomY}px`;

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (window.history.length > 1) {

                window.history.back();

            } else {

                window.location.href = "index.html";

            }

        }

    });

});