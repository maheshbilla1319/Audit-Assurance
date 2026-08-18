/* =========================================================
   AUDITASSURE ADMIN DASHBOARD
   COMPLETE NAVIGATION + MOBILE SIDEBAR
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");

    const sidebarLogout = document.getElementById("sidebarLogout");
    const menuLogout = document.getElementById("menuLogout");

    const adminName = document.getElementById("adminName");
    const adminEmail = document.getElementById("adminEmail");

    const welcomeName = document.getElementById("welcomeName");
    const menuName = document.getElementById("menuName");
    const menuEmail = document.getElementById("menuEmail");

    const navLinks = document.querySelectorAll(".nav-link");


    /* =====================================================
       YEAR
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       LOAD ADMIN DATA
    ===================================================== */

    let account = null;

    try {

        account = JSON.parse(
            localStorage.getItem("auditAssureAccount")
        );

    } catch (error) {

        console.error("Account data error:", error);

    }


    if (account) {

        const name = account.name || "Admin";

        const email =
            account.email ||
            "admin@auditassure.com";


        if (adminName) {
            adminName.textContent = name;
        }

        if (adminEmail) {
            adminEmail.textContent = email;
        }

        if (welcomeName) {
            welcomeName.textContent = name;
        }

        if (menuName) {
            menuName.textContent = name;
        }

        if (menuEmail) {
            menuEmail.textContent = email;
        }

    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("show");
        }

        document.body.classList.add("sidebar-open");

        /* Change hamburger to X */

        if (menuBtn) {

            menuBtn.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

            menuBtn.setAttribute(
                "aria-label",
                "Close menu"
            );

        }

    }


    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("show");
        }

        document.body.classList.remove("sidebar-open");

        /* Change X back to hamburger */

        if (menuBtn) {

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            menuBtn.setAttribute(
                "aria-label",
                "Open menu"
            );

        }

    }


    function toggleSidebar() {

        if (!sidebar) return;

        if (sidebar.classList.contains("open")) {

            closeSidebar();

        } else {

            openSidebar();

        }

    }


    /* Hamburger */

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            toggleSidebar
        );

    }


    /* X button */

    if (sidebarClose) {

        sidebarClose.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* Overlay */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const page =
                    this.dataset.page ||
                    this.dataset.section ||
                    this.getAttribute("href");


                if (!page) {
                    return;
                }


                navLinks.forEach(item => {

                    item.classList.remove("active");

                });


                this.classList.add("active");


                openDashboardPage(page);


                /* Close mobile sidebar */

                if (window.innerWidth <= 850) {

                    closeSidebar();

                }

            }
        );

    });


    /* =====================================================
       OPEN DASHBOARD PAGE
    ===================================================== */

    function openDashboardPage(page) {

        if (!page) return;


        const cleanPage =
            page
                .toString()
                .replace("#", "")
                .replace(".html", "")
                .toLowerCase()
                .trim();


        switch (cleanPage) {

            case "dashboard":
            case "home":
            case "index":

                showSection("dashboardSection");

                updatePageTitle(
                    "Stackly Admin Dashboard",
                    "Overview of your AuditAssure platform"
                );

                break;


            case "audits":
            case "audit":

                showSection("auditsSection");

                updatePageTitle(
                    "Audit Management",
                    "Manage and monitor all audit activities"
                );

                break;


            case "analytics":
            case "analytic":

                showSection("analyticsSection");

                updatePageTitle(
                    "Analytics",
                    "View audit performance and compliance analytics"
                );

                break;


            case "reports":
            case "report":

                showSection("reportsSection");

                updatePageTitle(
                    "Reports",
                    "View and download audit reports"
                );

                break;


            case "users":
            case "user":

                showSection("usersSection");

                updatePageTitle(
                    "User Management",
                    "Manage AuditAssure users and permissions"
                );

                break;


            case "settings":
            case "setting":

                showSection("settingsSection");

                updatePageTitle(
                    "Settings",
                    "Manage your account and dashboard preferences"
                );

                break;


            case "support":
            case "help":

                showSection("supportSection");

                updatePageTitle(
                    "Support",
                    "Get help and contact AuditAssure support"
                );

                break;


            default:

                showSection("dashboardSection");

        }

    }


    /* =====================================================
       SHOW SECTION
    ===================================================== */

    function showSection(sectionId) {

        const sections =
            document.querySelectorAll(
                ".dashboard-section, .page-section, .admin-section"
            );


        let selectedSection = null;


        sections.forEach(section => {

            if (section.id === sectionId) {

                selectedSection = section;

                section.style.display = "block";

                section.classList.add(
                    "section-active"
                );

            } else {

                section.style.display = "none";

                section.classList.remove(
                    "section-active"
                );

            }

        });


        if (selectedSection) {

            setTimeout(() => {

                selectedSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 50);

        } else {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }


    /* =====================================================
       UPDATE PAGE TITLE
    ===================================================== */

    function updatePageTitle(title, subtitle) {

        const titleElements =
            document.querySelectorAll(
                "#pageTitle, .page-title"
            );


        titleElements.forEach(element => {

            element.textContent = title;

        });


        const subtitleElement =
            document.getElementById("pageSubtitle");


        if (subtitleElement) {

            subtitleElement.textContent =
                subtitle;

        }


        const mainHeading =
            document.querySelector(
                ".topbar h1"
            );


        if (mainHeading) {

            mainHeading.textContent = title;

        }

    }


    /* =====================================================
       PROFILE DROPDOWN
    ===================================================== */

    if (profileBtn && profileMenu) {

        profileBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                profileMenu.classList.toggle("show");

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (
                profileMenu &&
                profileBtn &&
                !profileMenu.contains(event.target) &&
                !profileBtn.contains(event.target)
            ) {

                profileMenu.classList.remove("show");

            }

        }
    );


    /* =====================================================
       LOGOUT
    ===================================================== */

    function logout() {

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmLogout) return;


        localStorage.removeItem("auditLoggedIn");
        localStorage.removeItem("auditUserRole");
        localStorage.removeItem("auditAssureAccount");


        window.location.href = "login.html";

    }


    if (sidebarLogout) {

        sidebarLogout.addEventListener(
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
        document.querySelectorAll("[data-count]");


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.count);


        let current = 0;

        const duration = 1400;

        const increment =
            Math.max(
                1,
                Math.ceil(
                    target / (duration / 16)
                )
            );


        function animateCounter() {

            current += increment;


            if (current >= target) {

                current = target;

            }


            counter.textContent =
                current.toLocaleString();


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
        document.getElementById("auditChart");


    let auditChart = null;


    const monthlyData = {

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
            90,
            120,
            105,
            150,
            135,
            180,
            165,
            210
        ]

    };


    const weeklyData = {

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
            22,
            35,
            28,
            42,
            38,
            51,
            45
        ]

    };


    const yearlyData = {

        labels: [
            "2021",
            "2022",
            "2023",
            "2024",
            "2025",
            "2026"
        ],

        values: [
            520,
            650,
            780,
            910,
            1080,
            1248
        ]

    };


    function createChart(labels, values) {

        if (!canvas) return;


        if (typeof Chart === "undefined") {

            console.warn(
                "Chart.js is not loaded."
            );

            return;

        }


        if (auditChart) {

            auditChart.destroy();

        }


        auditChart =
            new Chart(
                canvas,
                {

                    type: "line",

                    data: {

                        labels: labels,

                        datasets: [

                            {

                                label: "Audits",

                                data: values,

                                borderColor:
                                    "#22d3ee",

                                backgroundColor:
                                    "rgba(34,211,238,.08)",

                                borderWidth: 2,

                                pointRadius: 3,

                                pointHoverRadius: 7,

                                pointBackgroundColor:
                                    "#22d3ee",

                                fill: true,

                                tension: .4

                            }

                        ]

                    },


                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        interaction: {

                            intersect: false,

                            mode: "index"

                        },


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
                                        "#617079"

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
                                        "#617079"

                                }

                            }

                        },


                        animation: {

                            duration: 1400,

                            easing:
                                "easeOutQuart"

                        }

                    }

                }
            );

    }


    if (canvas) {

        createChart(
            monthlyData.labels,
            monthlyData.values
        );

    }


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

                const value =
                    chartPeriod.value;


                if (value === "weekly") {

                    createChart(
                        weeklyData.labels,
                        weeklyData.values
                    );

                } else if (value === "yearly") {

                    createChart(
                        yearlyData.labels,
                        yearlyData.values
                    );

                } else {

                    createChart(
                        monthlyData.labels,
                        monthlyData.values
                    );

                }

            }
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const search =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const rows =
                    document.querySelectorAll(
                        "#auditTable tbody tr"
                    );


                rows.forEach(row => {

                    const text =
                        row.textContent
                            .toLowerCase();


                    row.style.display =
                        text.includes(search)
                            ? ""
                            : "none";

                });

            }
        );

    }


    /* =====================================================
       NEW AUDIT
    ===================================================== */

    const newAuditBtn =
        document.getElementById(
            "newAuditBtn"
        );


    if (newAuditBtn) {

        newAuditBtn.addEventListener(
            "click",
            () => {

                openDashboardPage("audits");


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );

                });


                const auditLink =
                    document.querySelector(
                        '.nav-link[data-page="audits"]'
                    );


                if (auditLink) {

                    auditLink.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       REPORT DOWNLOAD
    ===================================================== */

    const reportBtn =
        document.getElementById(
            "reportBtn"
        );


    if (reportBtn) {

        reportBtn.addEventListener(
            "click",
            () => {

                const report =
`AuditAssure Admin Report

Generated:
${new Date().toLocaleString()}

Total Audits: 1,248
Active Users: 842
Compliance Rate: 94%
Completed Audits: 976
Pending Audits: 272
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
                    "AuditAssure-Report.txt";


                document.body.appendChild(
                    link
                );


                link.click();

                link.remove();


                URL.revokeObjectURL(
                    url
                );

            }
        );

    }


    /* =====================================================
       TABLE ACTIONS
    ===================================================== */

    document
        .querySelectorAll(".table-action")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const row =
                        button.closest("tr");


                    if (!row) return;


                    const firstCell =
                        row.querySelector("td");


                    const auditId =
                        firstCell
                            ? firstCell.textContent.trim()
                            : "Audit";


                    alert(
                        `Opening ${auditId}`
                    );

                }
            );

        });


    /* =====================================================
       QUICK ACTIONS
    ===================================================== */

    document
        .querySelectorAll(".quick-grid button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const span =
                        button.querySelector(
                            "span"
                        );


                    const action =
                        span
                            ? span.textContent.trim()
                            : "Action";


                    alert(
                        `${action} selected`
                    );

                }
            );

        });


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notification =
        document.querySelector(
            ".notification"
        );


    if (notification) {

        notification.addEventListener(
            "click",
            () => {

                alert(
                    "You have 4 new notifications."
                );

            }
        );

    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    document
        .querySelectorAll("[data-settings]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openDashboardPage(
                        "settings"
                    );

                }
            );

        });


    /* =====================================================
       USERS
    ===================================================== */

    document
        .querySelectorAll("[data-users]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openDashboardPage(
                        "users"
                    );

                }
            );

        });


    /* =====================================================
       REPORT LINKS
    ===================================================== */

    document
        .querySelectorAll("[data-reports]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openDashboardPage(
                        "reports"
                    );

                }
            );

        });


    /* =====================================================
       PROFILE PAGE LINKS
    ===================================================== */

    document
        .querySelectorAll("[data-profile-page]")
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const page =
                        link.dataset.profilePage;


                    if (page) {

                        openDashboardPage(page);

                    }


                    if (profileMenu) {

                        profileMenu.classList.remove(
                            "show"
                        );

                    }

                }
            );

        });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (profileMenu) {

                    profileMenu.classList.remove(
                        "show"
                    );

                }


                closeSidebar();

            }

        }
    );


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 850) {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       INITIAL DASHBOARD
    ===================================================== */

    showSection(
        "dashboardSection"
    );


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );

    });


    const dashboardLink =
        document.querySelector(
            '.nav-link[data-page="dashboard"]'
        );


    if (dashboardLink) {

        dashboardLink.classList.add(
            "active"
        );

    }

});