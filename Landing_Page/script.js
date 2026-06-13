// ==========================
// DARK / LIGHT MODE
// ==========================

const themeToggle =
document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon =
    themeToggle.querySelector("i");

    if(document.body.classList.contains("dark")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem(
            "theme",
            "dark"
        );

    }else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem(
            "theme",
            "light"
        );
    }

});

// Load Saved Theme

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

    const icon =
    document.querySelector("#theme-toggle i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
}

// ==========================
// MOBILE MENU
// ==========================

const menuBtn =
document.getElementById("menu-btn");

const navLinks =
document.getElementById("navLinks");

menuBtn.addEventListener("click",()=>{

    navLinks.classList.toggle("active");

});

document
.querySelectorAll(".nav-links a")
.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });

});

// ==========================
// COUNTER ANIMATION
// ==========================

const counters =
document.querySelectorAll(".counter");

let counterStarted = false;

function startCounter(){

    counters.forEach(counter=>{

        const target =
        +counter.dataset.target;

        const updateCounter = () => {

            const current =
            +counter.innerText;

            const increment =
            target / 100;

            if(current < target){

                counter.innerText =
                Math.ceil(
                    current + increment
                );

                setTimeout(
                    updateCounter,
                    20
                );

            }else{

                counter.innerText =
                target + "+";
            }
        };

        updateCounter();

    });

}

window.addEventListener("scroll",()=>{

    const statsSection =
    document.querySelector(".stats");

    const trigger =
    statsSection.offsetTop - 400;

    if(
        window.scrollY > trigger &&
        !counterStarted
    ){

        startCounter();

        counterStarted = true;
    }

});

// ==========================
// SCROLL REVEAL
// ==========================

const revealElements =
document.querySelectorAll(

".service-card,\
.flip-card,\
.uni-card,\
.timeline-item,\
.gallery-card,\
.testimonial-card,\
.contact-info,\
.contact-form"

);

function revealOnScroll(){

    revealElements.forEach(el=>{

        const elementTop =
        el.getBoundingClientRect().top;

        const windowHeight =
        window.innerHeight;

        if(elementTop < windowHeight - 100){

            el.classList.add("show");
        }

    });

}

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();

// ==========================
// CONTACT FORM
// ==========================

const form =
document.querySelector(".contact-form");

const successBox =
document.getElementById("successMessage");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
    document.getElementById("studentName").value.trim();

    const phone =
    document.getElementById("phoneNumber").value.trim();

    const message =
    document.getElementById("studentMessage").value.trim();

    if(!name || !phone || !message){

        successBox.innerHTML =
        "⚠️ Please fill all fields.";

        successBox.style.color =
        "#ff4444";

        return;
    }

    if(phone.length < 10){

        successBox.innerHTML =
        "⚠️ Please enter a valid phone number.";

        successBox.style.color =
        "#ff4444";

        return;
    }

    successBox.innerHTML =
    `✅ Thank you <strong>${name}</strong> for contacting Career Crafters Global. Our team will connect with you shortly.`;

    successBox.style.color =
    "#22c55e";

    form.reset();

});

// ==========================
// ACTIVE NAV LINK
// ==========================

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(
".nav-links a"
);

window.addEventListener(
"scroll",
()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop =
        section.offsetTop;

        if(
        pageYOffset >=
        sectionTop - 200
        ){

            current =
            section.getAttribute("id");
        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(
        link.getAttribute("href")
        ===
        "#" + current
        ){

            link.classList.add("active");
        }

    });

});

// ==========================
// BACK TO TOP BUTTON
// ==========================

const topBtn =
document.createElement("button");

topBtn.innerHTML =
'<i class="fas fa-arrow-up"></i>';

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener(
"scroll",
()=>{

if(window.scrollY > 500){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener(
"click",
()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// ==========================
// NAVBAR SHADOW
// ==========================

const header =
document.querySelector(".header");

window.addEventListener(
"scroll",
()=>{

if(window.scrollY > 50){

header.style.boxShadow =
"0 10px 25px rgba(0,0,0,.15)";

}else{

header.style.boxShadow =
"none";

}

});

// ==========================
// FLOATING PARTICLES
// ==========================

for(let i=0;i<20;i++){

const particle =
document.createElement("span");

particle.classList.add(
"particle"
);

particle.style.left =
Math.random()*100 + "%";

particle.style.animationDelay =
Math.random()*10 + "s";

document.body.appendChild(
particle
);

}