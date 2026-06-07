// PARTICLE BACKGROUND

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

const particles = [];

for (let i = 0; i < 120; i++) {

    particles.push({

        x: Math.random() * window.innerWidth,

        y: Math.random() * window.innerHeight,

        size: Math.random() * 3 + 1,

        speedX:
            (Math.random() - 0.5) * 0.5,

        speedY:
            (Math.random() - 0.5) * 0.5

    });

}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((particle) => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (
            particle.x < 0 ||
            particle.x > canvas.width
        ) {
            particle.speedX *= -1;
        }

        if (
            particle.y < 0 ||
            particle.y > canvas.height
        ) {
            particle.speedY *= -1;
        }

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(77,163,255,0.7)";

        ctx.fill();
    });

    requestAnimationFrame(
        animateParticles
    );
}

animateParticles();

/* SMOOTH SCROLL */

document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            document
            .querySelector(
                this.getAttribute("href")
            )
            .scrollIntoView({
                behavior:"smooth"
            });

        }
    );

});

/* SCROLL REVEAL */

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"show"
);

}

});

},

{
threshold:0.15
}

);

document
.querySelectorAll(
".card, .section h2"
)
.forEach(el=>{

el.classList.add(
"hidden"
);

observer.observe(el);

});

/* NAVBAR SHRINK */

window.addEventListener(
"scroll",
()=>{

const nav =
document.querySelector(
"nav"
);

if(window.scrollY > 50){

nav.style.padding =
"15px 50px";

}else{

nav.style.padding =
"20px 50px";

}

}
);

/* CURRENT YEAR */

const footer =
document.querySelector(
"footer p"
);

if(footer){

footer.innerHTML =
`© ${new Date().getFullYear()} Lime. All Rights Reserved.`;

}

/* START A PROJECT → PAYMENT LINK */

document.getElementById("startProjectBtn").addEventListener("click", (e) => {
    e.preventDefault();

    // Replace this with your actual payment link
    const paymentLink = "https://your-payment-link-here.com";

    window.open(paymentLink, "_blank");
});


document.getElementById("inquiryForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        alert("Your inquiry has been sent successfully!");
        form.reset();
    } else {
        alert("There was an error sending your inquiry.");
    }
});
