// =========================
// FLOATING BALL BACKGROUND
// =========================

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 8 + 2;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// =========================
// SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});


// =========================
// SCROLL REVEAL
// =========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.15 });

document.querySelectorAll(".card, .section h2").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});


// =========================
// NAVBAR SHRINK
// =========================

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    nav.style.padding = window.scrollY > 50 ? "15px 50px" : "20px 50px";
});


// =========================
// FOOTER YEAR
// =========================

const footer = document.querySelector("footer p");
if (footer) {
    footer.innerHTML = `© ${new Date().getFullYear()} Lime. All Rights Reserved.`;
}


// =========================
// START PROJECT BUTTON
// =========================

document.getElementById("startProjectBtn").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "get-started.html";
});


// =========================
// INQUIRY FORM
// =========================

document.getElementById("inquiryForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    alert(response.ok ? "Your inquiry has been sent successfully!" : "There was an error sending your inquiry.");
    if (response.ok) form.reset();
});


// =========================
// CURRENCY CONVERTER
// =========================

const pricesGBP = {
    trial: 0,
    cmMonthly: 9.99,
    cmYearly: 99.99,
    ccmMonthly: 7.99,
    ccmYearly: 79.99,
    portfolio: 11.99,
    wiki: 26.99
};

async function convertCurrency() {
    try {
        const res = await fetch("https://api.exchangerate.host/latest?base=GBP");
        const data = await res.json();

        const locale = Intl.DateTimeFormat().resolvedOptions().locale;
        const userCurrency = locale.split("-")[1] || "GBP";

        const rate = data.rates[userCurrency] || 1;

        document.querySelectorAll("[data-price]").forEach(el => {
            const gbpValue = parseFloat(el.getAttribute("data-price"));
            const converted = (gbpValue * rate).toFixed(2);

            el.innerText = `${converted} ${userCurrency}`;
        });

    } catch (err) {
        console.log("Currency conversion failed.");
    }
}

convertCurrency();
