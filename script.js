// Fondo partículas premium
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let width, height, particles = [];
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
function randomColor() {
    const colors = ['#ff1053', '#00f2fe', '#fff', '#ffffffaa'];
    return colors[Math.floor(Math.random() * colors.length)];
}
function createParticles() {
    particles = [];
    const count = Math.floor(width / 32);
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            s: Math.random() * 2.2 + 0.7,
            d: Math.random() * 0.8 + 0.1,
            dx: (Math.random() - 0.5) * 0.7,
            dy: (Math.random() - 0.5) * 0.7,
            c: randomColor(),
            o: Math.random() * 0.5 + 0.25
        });
    }
}
function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 16;
        ctx.fill();
        p.x += p.dx * p.d;
        p.y += p.dy * p.d;
        // rebote en bordes
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
}
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});
resizeCanvas();
createParticles();
drawParticles();

// Animación fade-in/reveal para las secciones al hacer scroll
function revealSections() {
    document.querySelectorAll('.section-reveal').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('DOMContentLoaded', () => {
    revealSections();

    // Navegación suave para anclas del menú
    document.querySelectorAll('nav a, .cta-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href && href.startsWith("#")) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Prevent fake form submit (no backend)
    const form = document.querySelector('.contact form');
    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert("¡Gracias por contactar con SuperCars Gallery!\nNos pondremos en contacto pronto.");
            form.reset();
        });
    }
});
window.addEventListener('scroll', revealSections);
