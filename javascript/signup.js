/* =========================================================
   AUDITASSURE SIGNUP JS
   COMPLETE FUNCTIONAL VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const signupForm =
        document.getElementById("signupForm");

    const roleCards =
        document.querySelectorAll(".role-card");

    const accountRole =
        document.getElementById("accountRole");

    const password =
        document.getElementById("password");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const strengthBar =
        document.getElementById("strengthBar");

    const strengthText =
        document.getElementById("strengthText");

    const googleSignup =
        document.getElementById("googleSignup");

    const year =
        document.getElementById("year");


    /* =====================================================
       YEAR
    ===================================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       ROLE SELECTION
    ===================================================== */

    roleCards.forEach(card => {

        card.addEventListener("click", () => {

            roleCards.forEach(item => {

                item.classList.remove("active");

            });

            card.classList.add("active");

            const selectedRole =
                card.dataset.role;

            accountRole.value =
                selectedRole;

        });

    });


    /* =====================================================
       SHOW / HIDE PASSWORD
    ===================================================== */

    const eyeButtons =
        document.querySelectorAll(".eye-btn");

    eyeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetId =
                button.dataset.target;

            const input =
                document.getElementById(targetId);

            const icon =
                button.querySelector("i");


            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove(
                    "fa-eye"
                );

                icon.classList.add(
                    "fa-eye-slash"
                );

                button.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                input.type = "password";

                icon.classList.remove(
                    "fa-eye-slash"
                );

                icon.classList.add(
                    "fa-eye"
                );

                button.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        });

    });


    /* =====================================================
       PASSWORD STRENGTH
    ===================================================== */

    password.addEventListener(
        "input",
        updatePasswordStrength
    );


    function updatePasswordStrength() {

        const value =
            password.value;

        let score = 0;


        if (value.length >= 8) {

            score++;

        }


        if (/[A-Z]/.test(value)) {

            score++;

        }


        if (/[a-z]/.test(value)) {

            score++;

        }


        if (/[0-9]/.test(value)) {

            score++;

        }


        if (/[^A-Za-z0-9]/.test(value)) {

            score++;

        }


        if (value.length === 0) {

            strengthBar.style.width =
                "0%";

            strengthBar.style.background =
                "var(--cyan)";

            strengthText.textContent =
                "Password strength";

            return;

        }


        if (score <= 2) {

            strengthBar.style.width =
                "30%";

            strengthBar.style.background =
                "#ef4444";

            strengthText.textContent =
                "Weak password";

        }

        else if (score === 3) {

            strengthBar.style.width =
                "55%";

            strengthBar.style.background =
                "#f59e0b";

            strengthText.textContent =
                "Medium password";

        }

        else if (score === 4) {

            strengthBar.style.width =
                "80%";

            strengthBar.style.background =
                "#22c55e";

            strengthText.textContent =
                "Good password";

        }

        else {

            strengthBar.style.width =
                "100%";

            strengthBar.style.background =
                "#06b6d4";

            strengthText.textContent =
                "Strong password";

        }

    }


    /* =====================================================
       CONFIRM PASSWORD LIVE CHECK
    ===================================================== */

    confirmPassword.addEventListener(
        "input",
        () => {

            if (
                confirmPassword.value &&
                password.value !==
                confirmPassword.value
            ) {

                confirmPassword
                    .closest(".input-wrapper")
                    .classList.add("input-error");

            } else {

                confirmPassword
                    .closest(".input-wrapper")
                    .classList.remove("input-error");

            }

        }
    );


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    signupForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim()
                    .toLowerCase();


            const pass =
                password.value;


            const confirm =
                confirmPassword.value;


            const terms =
                document.getElementById("terms");


            const role =
                accountRole.value;


            /* =============================================
               VALIDATION
            ============================================= */

            if (fullName.length < 3) {

                showMessage(
                    "Please enter your full name.",
                    "error"
                );

                return;

            }


            if (!isValidEmail(email)) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            if (pass.length < 8) {

                showMessage(
                    "Password must contain at least 8 characters.",
                    "error"
                );

                return;

            }


            if (pass !== confirm) {

                showMessage(
                    "Password and Confirm Password do not match.",
                    "error"
                );

                return;

            }


            if (!terms.checked) {

                showMessage(
                    "Please accept the Terms and Privacy Policy.",
                    "error"
                );

                return;

            }


            /* =============================================
               CREATE ACCOUNT OBJECT
               PASSWORD IS NOT STORED
            ============================================= */

            const account = {

                name: fullName,

                email: email,

                role: role,

                createdAt:
                    new Date().toISOString()

            };


            /* =============================================
               REMOVE ANY OLD PASSWORD DATA
            ============================================= */

            localStorage.removeItem(
                "password"
            );

            localStorage.removeItem(
                "userPassword"
            );

            localStorage.removeItem(
                "auditAssurePassword"
            );


            /* =============================================
               SAVE ACCOUNT
            ============================================= */

            localStorage.setItem(
                "auditAssureAccount",
                JSON.stringify(account)
            );


            /* =============================================
               SAVE USER DETAILS
            ============================================= */

            localStorage.setItem(
                "auditUserName",
                fullName
            );


            localStorage.setItem(
                "auditUserEmail",
                email
            );


            localStorage.setItem(
                "auditUserRole",
                role
            );


            /*
               IMPORTANT:
               Do NOT set auditLoggedIn = true here.

               User must login first.
            */

            localStorage.removeItem(
                "auditLoggedIn"
            );


            /* =============================================
               SUCCESS BUTTON
            ============================================= */

            const createBtn =
                document.getElementById("createBtn");


            if (createBtn) {

                createBtn.classList.add(
                    "success-animation"
                );


                createBtn.innerHTML = `
                    <span>Account Created</span>
                    <i class="fa-solid fa-check"></i>
                `;

                createBtn.disabled = true;

            }


            /* =============================================
               REDIRECT TO LOGIN
            ============================================= */

            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 900);

        }
    );


    /* =====================================================
       GOOGLE SIGNUP
    ===================================================== */

    if (googleSignup) {

        googleSignup.addEventListener(
            "click",
            () => {

                showMessage(
                    "Google Sign Up requires Google OAuth/Firebase configuration.",
                    "info"
                );

            }
        );

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    /* =====================================================
       MESSAGE
    ===================================================== */

    function showMessage(message, type) {

        let oldMessage =
            document.querySelector(
                ".signup-message"
            );


        if (oldMessage) {

            oldMessage.remove();

        }


        const messageBox =
            document.createElement("div");


        messageBox.className =
            "signup-message";


        if (type === "error") {

            messageBox.style.borderColor =
                "rgba(239,68,68,.4)";

            messageBox.style.color =
                "#fca5a5";

        } else {

            messageBox.style.borderColor =
                "rgba(34,211,238,.4)";

            messageBox.style.color =
                "#67e8f9";

        }


        messageBox.innerHTML = `
            <i class="fa-solid fa-circle-info"></i>
            <span>${message}</span>
        `;


        signupForm.parentElement.insertBefore(
            messageBox,
            signupForm
        );


        setTimeout(() => {

            if (messageBox) {

                messageBox.remove();

            }

        }, 3500);

    }


    /* =====================================================
       PREVENT DOUBLE SUBMIT
    ===================================================== */

    signupForm.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                event.target.tagName !== "BUTTON"
            ) {

                // Browser handles normal form submit.

            }

        }
    );


    /* =====================================================
       GOOGLE BUTTON HOVER
    ===================================================== */

    if (googleSignup) {

        googleSignup.addEventListener(
            "mouseenter",
            () => {

                googleSignup.style.transform =
                    "translateY(-3px)";

            }
        );


        googleSignup.addEventListener(
            "mouseleave",
            () => {

                googleSignup.style.transform =
                    "translateY(0)";

            }
        );

    }

});