document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Menu Hamburger Toggle Logic Controller ---
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            mobileToggle.classList.toggle("active");
            navMenu.classList.toggle("open");
        });

        // Close mobile overlay window instantly on selecting links items components
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileToggle.classList.remove("active");
                navMenu.classList.remove("open");
            });
        });
    }

    // --- 2. Floating Utilities Back To Top Handling ---
    const backToTopBtn = document.getElementById("backToTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
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

    // --- 3. Scroll Reveal Engine Matrix Observer ---
    const revealItems = document.querySelectorAll(".scroll-reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                
                // If it contains performance stat numeric count items nodes, kick off animation sequence loops
                const targetNum = entry.target.querySelector(".stat-number");
                if (targetNum && !targetNum.classList.contains("counted")) {
                    triggerCountUpAnimation(targetNum);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(item => revealObserver.observe(item));

    // --- 4. Stat Counter Increment Engine Component ---
    function triggerCountUpAnimation(element) {
        element.classList.add("counted");
        const maxLimit = parseInt(element.getAttribute("data-target"), 10);
        let startVal = 0;
        const processDuration = 1500; // Animation running frame clock limits milliseconds tracking
        const stepTime = Math.max(Math.floor(processDuration / maxLimit), 15);

        const counterInterval = setInterval(() => {
            startVal += Math.ceil(maxLimit / 100); // Gradual step distribution increments
            if (startVal >= maxLimit) {
                element.innerText = maxLimit + "+";
                clearInterval(counterInterval);
            } else {
                element.innerText = startVal;
            }
        }, stepTime);
    }

    // --- 5. Interactive Form Handlers Capture Logic Block ---
    const consultationForm = document.getElementById("consultationForm");
    if (consultationForm) {
        consultationForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Stop standard browser page redirection reload sequences

            const studentName = document.getElementById("userName").value;
            const studentEmail = document.getElementById("userEmail").value;
            const chosenCourse = document.getElementById("userCourse").value;

            // Simple student validation confirmation logging notification modal mockup rule
            alert(`Thank you for contacting us, ${studentName}!\nOur career counseling expert will reach out to you at ${studentEmail} regarding the ${chosenCourse} pathway.`);
            
            consultationForm.reset();
        });
    }

    // --- 6. Active Nav Link Scroll Sync Matrix Hook ---
    const sectionBlocks = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let scrollYPos = window.scrollY;

        sectionBlocks.forEach(currentSection => {
            const h = currentSection.offsetHeight;
            const top = currentSection.offsetTop - 90;
            const id = currentSection.getAttribute("id");

            if (scrollYPos > top && scrollYPos <= top + h) {
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