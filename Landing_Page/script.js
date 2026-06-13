document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Clean Theme Toggler Logic ---
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector(".theme-icon") : null;
    const initialTheme = localStorage.getItem("student-theme") || "light";

    document.documentElement.setAttribute("data-theme", initialTheme);
    if(themeIcon) themeIcon.textContent = initialTheme === "dark" ? "☀️" : "🌙";

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const targetTheme = currentTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", targetTheme);
            localStorage.setItem("student-theme", targetTheme);
            if(themeIcon) themeIcon.textContent = targetTheme === "dark" ? "☀️" : "🌙";
        });
    }

    // --- 2. Mobile Nav Drawer Control ---
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
        
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => navMenu.classList.remove("open"));
        });
    }

    // --- 3. Clean Standard FAQ Accordion Handling ---
    const accordionHeaders = document.querySelectorAll(".accordion-title");
    accordionHeaders.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const currentItem = trigger.parentElement;
            
            document.querySelectorAll(".accordion-item").forEach(item => {
                if(item !== currentItem) item.classList.remove("active");
            });

            currentItem.classList.toggle("active");
        });
    });

    // --- 4. Interactive Quiz Option Selection Mapping ---
    const pathMatrix = {
        Engineering: {
            courses: "B.Tech Computer Science, Artificial Intelligence, Data Science Infrastructure, Cyber Security Engineering.",
            universities: "Medi-Caps University, Chandigarh University, Parul University Systems Hubs."
        },
        Management: {
            courses: "Global Executive MBA, Strategic Marketing Management, FinTech & Business Systems Administration.",
            universities: "NMIMS Management Suite, Avantika University, Chandigarh University Networks."
        },
        Design: {
            courses: "B.Des Communication Design, User Experience Design (UI/UX), Industrial Product Design Architecture.",
            universities: "Avantika Design Academies, Parul University Interaction Suites."
        },
        Medical: {
            courses: "MBBS International Tracks, Clinical Research Bioinformatics, Hospital & Healthcare Administration.",
            universities: "Medi-Caps Research Divisions, AISECT Health Science Wings."
        }
    };

    const submitQuizBtn = document.getElementById("submitQuizBtn");
    const quizResultPanel = document.getElementById("quizResultPanel");
    const outCourses = document.getElementById("outCourses");
    const outUniversities = document.getElementById("outUniversities");

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener("click", () => {
            const selectedOption = document.querySelector('input[name="interestGroup"]:checked');
            if (selectedOption) {
                const choice = selectedOption.value;
                const match = pathMatrix[choice];

                outCourses.textContent = match.courses;
                outUniversities.textContent = match.universities;
                quizResultPanel.classList.remove("hidden");
            }
        });
    }

    // --- 5. Navigation Scroll Indicator Highlight Loop ---
    const navigationLinks = document.querySelectorAll(".nav-link");
    const contentSections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        contentSections.forEach(section => {
            const sectionTopPos = section.offsetTop;
            if (window.scrollY >= sectionTopPos - 120) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navigationLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });

        // Back to top indicator visual control toggle
        const backToTopBtn = document.getElementById("backToTopBtn");
        if(backToTopBtn) {
            backToTopBtn.style.display = window.scrollY > 500 ? "flex" : "none";
        }
    });

    const backToTopBtn = document.getElementById("backToTopBtn");
    if(backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- 6. Consultation Form Submission Listener Mock ---
    const consultationForm = document.getElementById("consultationForm");
    if(consultationForm) {
        consultationForm.addEventListener("submit", (e) => {
            // Checked against custom option inputs natively
            if(!consultationForm.hasAttribute('action')) {
                e.preventDefault();
                const userName = document.getElementById("userName").value;
                alert(`Thank you, ${userName}! Your consultation profile request has been logged locally.`);
                consultationForm.reset();
            }
        });
    }
});