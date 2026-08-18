/* =====================================================
   AUDITASSURE LOGIN JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const roles =
        document.querySelectorAll(".role");

    const selectedRole =
        document.getElementById("selectedRole");

    const loginForm =
        document.getElementById("loginForm");

    const password =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("passwordToggle");


    /* =================================================
       ROLE SELECTION
    ================================================= */

    roles.forEach(role => {

        role.addEventListener("click", () => {

            roles.forEach(item => {
                item.classList.remove("active");
            });

            role.classList.add("active");

            const roleName =
                role.dataset.role;

            selectedRole.value =
                roleName;

        });

    });


    /* =================================================
       PASSWORD SHOW / HIDE
    ================================================= */

    passwordToggle.addEventListener(
        "click",
        () => {

            if (password.type === "password") {

                password.type = "text";

                passwordToggle.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                password.type = "password";

                passwordToggle.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        }
    );


    /* =================================================
       LOGIN
    ================================================= */

    loginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim()
                    .toLowerCase();


            const pass =
                password.value;


            const role =
                selectedRole.value;


            /* =============================================
               VALIDATION
            ============================================= */

            if (!email || !pass) {

                alert(
                    "Please enter email and password."
                );

                return;
            }


            /* =============================================
               REMOVE PASSWORD FROM LOCALSTORAGE
               PASSWORD WILL NEVER BE STORED
            ============================================= */

            localStorage.removeItem("password");
            localStorage.removeItem("userPassword");
            localStorage.removeItem("auditAssurePassword");


            /* =============================================
               SAVE ONLY NON-SENSITIVE LOGIN DETAILS
            ============================================= */

            localStorage.setItem(
                "auditUserEmail",
                email
            );


            localStorage.setItem(
                "auditUserRole",
                role
            );


            localStorage.setItem(
                "auditLoggedIn",
                "true"
            );


            /* =============================================
               DO NOT SAVE PASSWORD
            ============================================= */

            // ❌ DO NOT USE:
            // localStorage.setItem("password", pass);
            // localStorage.setItem("userPassword", pass);


            /* =============================================
               REDIRECT
            ============================================= */

            if (role === "admin") {

                window.location.href =
                    "admin.html";

            } else {

                window.location.href =
                    "user.html";

            }

        }
    );


    /* =================================================
       GOOGLE STYLE BUTTON
    ================================================= */

    const googleBtn =
        document.querySelector(".google-btn");


    if (googleBtn) {

        googleBtn.addEventListener(
            "click",
            () => {

                alert(
                    "Google authentication can be connected here."
                );

            }
        );

    }

});