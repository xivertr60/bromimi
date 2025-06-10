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
