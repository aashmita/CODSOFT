document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Light & Dark Theme Configuration Matrix Engine ---
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector(".theme-icon") : null;
    const currentSavedTheme = localStorage.getItem("workspace-theme") || "dark";

    // Set dynamic baseline configuration setup initially
    document.documentElement.setAttribute("data-theme", currentSavedTheme);
    updateToggleIcon(currentSavedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const activeTheme = document.documentElement.getAttribute("data-theme");
            const nextTargetTheme = activeTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", nextTargetTheme);
            localStorage.setItem("workspace-theme", nextTargetTheme);
            updateToggleIcon(nextTargetTheme);
        });
    }

    function updateToggleIcon(theme) {
        if (!themeIcon) return;
        themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    // --- 2. Mobile Responsive Nav Draw Overlap Logic ---
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            mobileToggle.classList.toggle("active");
            navMenu.classList.toggle("open");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileToggle.classList.remove("active");
                navMenu.classList.remove("open");
            });
        });
    }

    // --- 3. Live Accordion Logic Blueprint Frame ---
    const faqTriggers = document.querySelectorAll(".faq-trigger");
    faqTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            const currentFaqItem = btn.parentElement;
            
            // Close other sibling frames smoothly
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== currentFaqItem) item.classList.remove("active");
            });

            currentFaqItem.classList.toggle("active");
        });
    });

    // --- 4. Real-time Path Finder Recommendation Output System ---
    const databaseMapping = {
        Engineering: {
            courses: "B.Tech Computer Science Engineering, AI & Data Analytics Systems, Cloud Infrastructure Architectures",
            universities: "Medi-Caps University, Chandigarh University, Parul University Portfolio Hubs"
        },
        Management: {
            courses: "Strategic Executive MBA, FinTech Systems Administration, BBA Business Operations",
            universities: "NMIMS Management Suite, Avantika University, Chandigarh University Networks"
        },
        Design: {
            courses: "B.Des Digital Interaction Space (UI/UX), Industrial Architecture Design, Media Arts",
            universities: "Avantika Design Academies, Parul University Systems"
        },
        Medical: {
            courses: "MBBS Global Tracks, Applied Bioinformatics Technology, Biomedical Diagnostics",
            universities: "Medi-Caps Clinical Labs, AISECT Healthcare Division"
        }
    };

    const submitQuizBtn = document.getElementById("submitQuizBtn");
    const quizResultPanel = document.getElementById("quizResultPanel");
    const outCourses = document.getElementById("outCourses");
    const outUniversities = document.getElementById("outUniversities");

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener("click", () => {
            const radioPicked = document.querySelector('input[name="interestGroup"]:checked');
            if (radioPicked) {
                const selectionValue = radioPicked.value;
                const matchData = databaseMapping[selectionValue];

                outCourses.textContent = matchData.courses;
                outUniversities.textContent = matchData.universities;

                quizResultPanel.classList.remove("hidden");
                quizResultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // --- 5. Interactive Form Submission Alerts ---
    const consultationForm = document.getElementById("consultationForm");
    if (consultationForm) {
        consultationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const clientName = document.getElementById("userName").value;
            alert(`Profile Logged Successfully, ${clientName}!\nOur regional desk will process your documentation matrix shortly.`);
            consultationForm.reset();
        });
    }

    // --- 6. Scroll Position Interaction Observables ---
    const backToTopBtn = document.getElementById("backToTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 600) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const revealItems = document.querySelectorAll(".scroll-reveal");
    const structuralObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    }, { threshold: 0.05 });

    revealItems.forEach(i => structuralObserver.observe(i));
});