
/* ==========================
   TYPING EFFECT
========================== */

const roles = [
    "Software Developer",
    "Web Developer",
    "IoT Enthusiast",
    "Problem Solver",
    "CSE Undergraduate"
];

let roleIndex = 0;
let charIndex = 0;
let currentRole = "";
let isDeleting = false;

const typingElement = document.querySelector(".home-content h3");

function typeEffect() {

    currentRole = roles[roleIndex];

    if (!isDeleting) {

        typingElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);
}

window.addEventListener("load", typeEffect);


/* ==========================
   ACTIVE NAVBAR
========================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === "#" + current
        ) {
            link.classList.add("active");
        }
    });

});


/* ==========================
   SCROLL REVEAL ANIMATION
========================== */

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }
        });

    },

    {
        threshold: 0.15
    }

);

const hiddenElements =
    document.querySelectorAll(
        ".project-card, .skill-box, .experience-card, .leadership-card, .contact-card, .about-text, .robotics-content"
    );

hiddenElements.forEach((el) => {

    el.classList.add("hidden");

    observer.observe(el);

});


/* ==========================
   SMOOTH SCROLL
========================== */

document.querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


/* ==========================
   IMAGE HOVER GLOW
========================== */

const images = document.querySelectorAll(
    ".project-card img, .certificate-gallery img, .hackathon-gallery img"
);

images.forEach((image) => {

    image.addEventListener("mouseenter", () => {

        image.style.boxShadow =
            "0 0 25px rgba(56,189,248,0.5)";

    });

    image.addEventListener("mouseleave", () => {

        image.style.boxShadow = "none";

    });

});

