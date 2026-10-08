// Header com fundo ao rolar
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.header .nav');

if (toggle && nav) {
    const setMenu = (open) => {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        nav.classList.toggle('open', open);
        header.classList.toggle('menu-open', open);
    };

    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
}

// Animação de entrada ao rolar
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('visible'));
}

// Lightbox da galeria
const lightbox = document.querySelector('.lightbox');

if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    const close = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
    };

    document.querySelectorAll('.gallery-item').forEach((item) => {
        const open = () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
            closeBtn.focus();
        };

        item.addEventListener('click', open);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
            }
        });
    });

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// Ano atual no rodapé
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
