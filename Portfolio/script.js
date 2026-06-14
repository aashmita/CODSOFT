/* ==========================================
   THEME SWITCHER CONFIGURATION (LIGHT/DARK)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const toggleIcon = themeToggleBtn.querySelector('i');
    const htmlElement = document.documentElement;

    // Read stored client settings or fall back safely to light mode default configuration
    const activeTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    // Process default application state lifecycle
    htmlElement.setAttribute('data-theme', activeTheme);
    refreshToggleIconStyle(activeTheme);

    // Event Registration for Theme Shifts
    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);
        refreshToggleIconStyle(nextTheme);
    });

    // Helper handler to correctly swap active Icon States
    function refreshToggleIconStyle(theme) {
        if (theme === 'dark') {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        } else {
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        }
    }
});


/* ==========================================
   TYPING EFFECT FOR HERO ROLE PRESENTATION
   ========================================== */
const roles = [
    "Software Developer",
    "Web Developer",
    "Problem Solver",
    "CSE Undergraduate"
];

let roleIndex = 0;
let charIndex = 0;
let currentRole = "";
let isDeleting = false;

// Targeted matching class from html modifications
const typingElement = document.querySelector(".role-typing-box");

function typeEffect() {
    if (!typingElement) return;

    currentRole = roles[roleIndex];

    if (!isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1800); // Wait status at full text output
            return;
        }
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 90);
}

window.addEventListener("load", typeEffect);


/* ==========================================
   DYNAMIC INTERSECTION SCROLL LINK ACTIVATOR
   ========================================== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* ==========================================
   INTERSECTION OBSERVATION LOOKUP FOR REVEALS
   ========================================== */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.08
    }
);

const hiddenElements = document.querySelectorAll(
    ".project-card, .skill-box, .tech-card, .experience-card, .leadership-card, .contact-card, .about-text, .robotics-content"
);

hiddenElements.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
});


/* ==========================================
   SMOOTH BOUNDARY SCROLL ANIMATION
   ========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetAttr = this.getAttribute("href");
        if(targetAttr === "#") return;
        
        const target = document.querySelector(targetAttr);
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});