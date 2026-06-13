document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Menu Hamburger Overlap Logic ---
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

    // --- 2. Floating Action Back To Top Controller ---
    const backToTopBtn = document.getElementById("backToTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
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

    // --- 3. Intersection Observer Scroll Reveal Engine ---
    const revealItems = document.querySelectorAll(".scroll-reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    revealItems.forEach(item => revealObserver.observe(item));

    // --- 4. NEW: DYNAMIC PATH RECOMENDATION ENGINE (QUIZ LOGIC) ---
    const quizDatabase = {
        Engineering: {
            courses: "B.Tech CSE, Artificial Intelligence & Machine Learning, Data Science Infrastructure, Cyber Security",
            universities: "Medi-Caps University, Chandigarh University, Parul University"
        },
        Management: {
            courses: "Global Strategic MBA, BBA Core Excellence, FinTech Operations, Business Analytics systems",
            universities: "NMIMS University, Avantika University, Chandigarh University"
        },
        Design: {
            courses: "B.Des User Interface (UI/UX), Communication Design, Product Architecture Portfolio",
            universities: "Avantika University, Parul University"
        },
        Medical: {
            courses: "MBBS, Allied Health Sciences, Genetics Research Frameworks, Hospital Administration",
            universities: "Medi-Caps University, AISECT University, LNCT University"
        }
    };

    const submitQuizBtn = document.getElementById("submitQuizBtn");
    const quizResultPanel = document.getElementById("quizResultPanel");
    const outCourses = document.getElementById("outCourses");
    const outUniversities = document.getElementById("outUniversities");

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener("click", () => {
            // Find selected radio value
            const selectedInterest = document.querySelector('input[name="interestGroup"]:checked');
            
            if (selectedInterest) {
                const choice = selectedInterest.value;
                const recommendation = quizDatabase[choice];

                // Inject text elements data
                outCourses.textContent = recommendation.courses;
                outUniversities.textContent = recommendation.universities;

                // Smoothly unhide dashboard visualization item
                quizResultPanel.classList.remove("hidden");
                
                // Auto scroll down inside element metrics slightly for structural emphasis
                quizResultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // --- 5. Interactive Form Submission Handlers ---
    const consultationForm = document.getElementById("consultationForm");
    if (consultationForm) {
        consultationForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const studentName = document.getElementById("userName").value;
            const chosenCourse = document.getElementById("userCourse").value;

            alert(`Thank you for contacting us, ${studentName}!\nOur senior career counselor will call you shortly regarding your choice in the "${chosenCourse}" pathway.`);
            consultationForm.reset();
        });
    }

    // --- 6. Active Nav Link Intersection Observer Sync ---
    const sectionBlocks = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let currentScroll = window.scrollY;

        sectionBlocks.forEach(currentSection => {
            const h = currentSection.offsetHeight;
            const top = currentSection.offsetTop - 120;
            const id = currentSection.getAttribute("id");

            if (currentScroll > top && currentScroll <= top + h) {
                document.querySelectorAll(".nav-menu a").forEach(node => {
                    node.classList.remove("active");
                    if (node.getAttribute("href") === `#${id}`) {
                        node.classList.add("active");
                    }
                });
            }
        });
    });
});