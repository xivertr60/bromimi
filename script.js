// Fade-in para cards al aparecer y scroll suave
window.addEventListener('DOMContentLoaded', () => {
    // Fade-in para cards al aparecer
    const cards = document.querySelectorAll('.car-card');
    cards.forEach((card, i) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(80px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 300 + i * 170);
    });

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

    // Hero image carousel automático
    const carouselImages = document.querySelectorAll('.hero-carousel img');
    let current = 0;
    setInterval(() => {
        carouselImages[current].classList.remove('active');
        current = (current + 1) % carouselImages.length;
        carouselImages[current].classList.add('active');
    }, 3100);

    // Prevent fake form submit (no backend here)
    const form = document.querySelector('.contact form');
    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert("¡Gracias por contactar con SuperCars Gallery!\nNos pondremos en contacto pronto.");
            form.reset();
        });
    }
});
