
/* =========================================================
   AUDITASSURE USER DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar =
        document.getElementById("sidebar");

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const profileBtn =
        document.getElementById("profileBtn");

    const profileMenu =
        document.getElementById("profileMenu");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const closeNotifications =
        document.getElementById("closeNotifications");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const menuLogout =
        document.getElementById("menuLogout");


    /* =====================================================
       YEAR
    ===================================================== */

    const year =
        document.getElementById("year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       LOAD USER ACCOUNT
    ===================================================== */

    let account = null;

    try {

        account =
            JSON.parse(
                localStorage.getItem(
                    "auditAssureAccount"
                )
            );

    } catch (error) {

        account = null;

    }


    const userName =
        account?.name || "User";

    const userEmail =
        account?.email ||
        "user@gmail.com";


    /* =====================================================
       INITIAL USER DATA
    ===================================================== */

    const nameElements = [
        document.getElementById("userName"),
        document.getElementById("welcomeName"),
        document.getElementById("sidebarName"),
        document.getElementById("menuName")
    ];

    nameElements.forEach(element => {

        if (element) {
            element.textContent =
                userName;
        }

    });


    const emailElements = [
        document.getElementById("sidebarEmail"),
        document.getElementById("menuEmail")
    ];

    emailElements.forEach(element => {

        if (element) {
            element.textContent =
                userEmail;
        }

    });


    /* =====================================================
       AVATAR
    ===================================================== */

    const firstLetter =
        userName
            .charAt(0)
            .toUpperCase();


    const avatars = [
        "sidebarAvatar",
        "profileAvatar",
        "menuAvatar",
        "settingsAvatar"
    ];


    avatars.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                firstLetter;
        }

    });


    /* =====================================================
       PAGE NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    const pageSections =
        document.querySelectorAll(
            ".page-section"
        );

    const pageTitle =
        document.getElementById(
            "pageTitle"
        );


    function openSection(sectionId) {

        pageSections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        const target =
            document.getElementById(
                sectionId
            );


        if (!target) {
            return;
        }


        target.classList.add(
            "active-section"
        );


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.dataset.section ===
                sectionId
            ) {

                link.classList.add(
                    "active"
                );

            }

        });


        const titles = {

            dashboard: "Dashboard",

            audits: "My Audits",

            reports: "Reports",

            documents: "Documents",

            settings: "Settings",

            support: "Support"

        };


        if (pageTitle) {

            pageTitle.textContent =
                titles[sectionId] ||
                "Dashboard";

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        if (
            window.innerWidth <= 850
        ) {

            sidebar.classList.remove(
                "open"
            );

            sidebarOverlay.classList.remove(
                "show"
            );

        }

    }


    /* NAV LINKS */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const section =
                    link.dataset.section;

                openSection(section);

                history.replaceState(
                    null,
                    "",
                    "#" + section
                );

            }
        );

    });


    /* =====================================================
       ALL DATA-SECTION BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(button => {

            if (
                button.classList.contains(
                    "nav-link"
                )
            ) {
                return;
            }


            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const section =
                        button.dataset.section;

                    openSection(section);

                }
            );

        });


    /* =====================================================
       OPEN SECTION FROM URL
    ===================================================== */

    const hash =
        window.location.hash
            .replace("#", "");


    if (
        hash &&
        document.getElementById(hash)
    ) {

        openSection(hash);

    } else {

        openSection("dashboard");

    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "open"
                );

                sidebarOverlay.classList.toggle(
                    "show"
                );

            }
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            () => {

                sidebar.classList.remove(
                    "open"
                );

                sidebarOverlay.classList.remove(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       PROFILE DROPDOWN
    ===================================================== */

    if (profileBtn) {

        profileBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                profileMenu.classList.toggle(
                    "show"
                );

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (
                profileMenu &&
                profileBtn &&
                !profileMenu.contains(
                    event.target
                ) &&
                !profileBtn.contains(
                    event.target
                )
            ) {

                profileMenu.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                notificationPanel.classList.toggle(
                    "show"
                );

            }
        );

    }


    if (closeNotifications) {

        closeNotifications.addEventListener(
            "click",
            () => {

                notificationPanel.classList.remove(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    function logout() {

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmLogout) {
            return;
        }


        localStorage.removeItem(
            "auditLoggedIn"
        );

        localStorage.removeItem(
            "auditUserRole"
        );


        window.location.href =
            "login.html";

    }


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logout
        );

    }


    if (menuLogout) {

        menuLogout.addEventListener(
            "click",
            logout
        );

    }


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.count
            );

        let current = 0;

        const duration = 1200;

        const increment =
            target /
            (duration / 16);


        function animateCounter() {

            current += increment;


            if (current >= target) {

                current = target;

            }


            counter.textContent =
                Math.floor(current)
                    .toLocaleString();


            if (current < target) {

                requestAnimationFrame(
                    animateCounter
                );

            }

        }


        animateCounter();

    });


    /* =====================================================
       CHART
    ===================================================== */

    const canvas =
        document.getElementById(
            "auditChart"
        );


    let auditChart = null;


    const chartData = {

        monthly: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug"
            ],

            values: [
                4,
                7,
                6,
                9,
                8,
                13,
                11,
                18
            ]

        },


        weekly: {

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            values: [
                2,
                4,
                3,
                6,
                5,
                8,
                7
            ]

        },


        yearly: {

            labels: [
                "2021",
                "2022",
                "2023",
                "2024",
                "2025",
                "2026"
            ],

            values: [
                5,
                8,
                10,
                12,
                15,
                18
            ]

        }

    };


    function createChart(period) {

        if (!canvas) {
            return;
        }


        if (auditChart) {

            auditChart.destroy();

        }


        const data =
            chartData[period];


        auditChart =
            new Chart(
                canvas,
                {

                    type: "line",

                    data: {

                        labels:
                            data.labels,

                        datasets: [

                            {

                                label:
                                    "Audits",

                                data:
                                    data.values,

                                borderColor:
                                    "#22d3ee",

                                backgroundColor:
                                    "rgba(34,211,238,.08)",

                                borderWidth: 2,

                                pointRadius: 4,

                                pointHoverRadius: 7,

                                pointBackgroundColor:
                                    "#f97316",

                                fill: true,

                                tension: .42

                            }

                        ]

                    },


                    options: {

                        responsive: true,

                        maintainAspectRatio:
                            false,

                        plugins: {

                            legend: {
                                display: false
                            }

                        },


                        scales: {

                            x: {

                                grid: {
                                    color:
                                        "rgba(255,255,255,.035)"
                                },

                                ticks: {
                                    color:
                                        "#66747d",

                                    font: {
                                        size: 9
                                    }
                                }

                            },


                            y: {

                                beginAtZero: true,

                                grid: {
                                    color:
                                        "rgba(255,255,255,.035)"
                                },

                                ticks: {
                                    color:
                                        "#66747d",

                                    font: {
                                        size: 9
                                    }
                                }

                            }

                        },


                        animation: {

                            duration: 1200,

                            easing:
                                "easeOutQuart"

                        }

                    }

                }
            );

    }


    createChart("monthly");


    /* =====================================================
       CHART PERIOD
    ===================================================== */

    const chartPeriod =
        document.getElementById(
            "chartPeriod"
        );


    if (chartPeriod) {

        chartPeriod.addEventListener(
            "change",
            () => {

                createChart(
                    chartPeriod.value
                );

            }
        );

    }


    /* =====================================================
       TABLE ACTIONS
    ===================================================== */

    const tableActions =
        document.querySelectorAll(
            ".table-action"
        );


    tableActions.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const row =
                    button.closest("tr");


                const auditId =
                    row
                        .querySelector("td")
                        .textContent
                        .trim();


                alert(
                    `Opening ${auditId} audit details.`
                );

            }
        );

    });


    /* =====================================================
       REQUEST NEW AUDIT
    ===================================================== */

    const newAuditBtn =
        document.getElementById(
            "newAuditBtn"
        );


    if (newAuditBtn) {

        newAuditBtn.addEventListener(
            "click",
            () => {

                alert(
                    "Audit request form will open here."
                );

            }
        );

    }


    /* =====================================================
       REPORT DOWNLOAD
    ===================================================== */

    const downloadReport =
        document.getElementById(
            "downloadReport"
        );


    if (downloadReport) {

        downloadReport.addEventListener(
            "click",
            () => {

                const report =
`AuditAssure User Report

User:
${userName}

Email:
${userEmail}

Generated:
${new Date().toLocaleString()}

Total Audits: 18
Completed Audits: 11
In Progress: 5
Compliance Rate: 94%

AuditAssure Secure Audit & Assurance Platform
`;


                const blob =
                    new Blob(
                        [report],
                        {
                            type:
                                "text/plain"
                        }
                    );


                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href = url;

                link.download =
                    "AuditAssure-User-Report.txt";

                document.body.appendChild(
                    link
                );

                link.click();

                link.remove();

                URL.revokeObjectURL(
                    url
                );


                alert(
                    "Report downloaded successfully."
                );

            }
        );

    }


    /* =====================================================
       REPORT OPEN BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".report-open"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    alert(
                        "Report viewer opened."
                    );

                }
            );

        });


    /* =====================================================
       DOCUMENT BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".document-open"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    alert(
                        "Document preview opened."
                    );

                }
            );

        });


    /* =====================================================
       UPLOAD BUTTON
    ===================================================== */

    const uploadBtn =
        document.getElementById(
            "uploadBtn"
        );


    if (uploadBtn) {

        uploadBtn.addEventListener(
            "click",
            () => {

                const input =
                    document.createElement(
                        "input"
                    );

                input.type = "file";

                input.accept =
                    ".pdf,.doc,.docx,.xls,.xlsx";


                input.click();


                input.addEventListener(
                    "change",
                    () => {

                        if (
                            input.files.length
                        ) {

                            alert(
                                `${input.files[0].name} selected.`
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    const settingsName =
        document.getElementById(
            "settingsName"
        );

    const settingsEmail =
        document.getElementById(
            "settingsEmail"
        );


    if (settingsName) {
        settingsName.value =
            userName;
    }


    if (settingsEmail) {
        settingsEmail.value =
            userEmail;
    }


    const saveSettings =
        document.getElementById(
            "saveSettings"
        );


    if (saveSettings) {

        saveSettings.addEventListener(
            "click",
            () => {

                const newName =
                    settingsName.value.trim();

                const newEmail =
                    settingsEmail.value.trim();


                if (!newName) {

                    alert(
                        "Please enter your name."
                    );

                    return;

                }


                if (!newEmail) {

                    alert(
                        "Please enter your email."
                    );

                    return;

                }


                const updatedAccount = {

                    ...(account || {}),

                    name:
                        newName,

                    email:
                        newEmail,

                    role:
                        "user"

                };


                localStorage.setItem(
                    "auditAssureAccount",
                    JSON.stringify(
                        updatedAccount
                    )
                );


                alert(
                    "Profile updated successfully."
                );


                location.reload();

            }
        );

    }


    /* =====================================================
       SUPPORT BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".support-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    alert(
                        "AuditAssure support module opened."
                    );

                }
            );

        });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                profileMenu?.classList.remove(
                    "show"
                );

                notificationPanel?.classList.remove(
                    "show"
                );

                sidebar?.classList.remove(
                    "open"
                );

                sidebarOverlay?.classList.remove(
                    "show"
                );

            }

        }
    );

});






