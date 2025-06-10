// Efecto de resplandor al hacer scroll y animación de entrada
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
        }, 300 + i * 200);
    });

    // Botón de scroll suave a galería
    document.querySelectorAll('a[href="#gallery"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('gallery').scrollIntoView({ behavior: "smooth" });
        });
    });
});
