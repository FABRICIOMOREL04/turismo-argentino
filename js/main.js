document.addEventListener('DOMContentLoaded', function() {

    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Submenús en móvil
    hasSubmenus.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');

        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                submenu.classList.toggle('active');
            }
        });
    });

    // Cerrar menú al click
    document.querySelectorAll('.nav-menu a:not(.has-submenu > a)').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxTitle = document.querySelector('.lightbox-caption h3');
    const lightboxDesc = document.querySelector('.lightbox-caption p');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    const galleryData = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const title = item.querySelector('h4')?.textContent || '';
        const desc = item.querySelector('p')?.textContent || '';

        galleryData.push({
            src: img.src,
            title: title,
            description: desc
        });

        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        const data = galleryData[currentIndex];
        lightboxImg.src = data.src;
        lightboxTitle.textContent = data.title;
        lightboxDesc.textContent = data.description;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        openLightbox();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryData.length;
        openLightbox();
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) showPrev();
        if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) showNext();
    });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Validación formulario
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.querySelector('.form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nombre = document.getElementById('nombre');
            const nombreGroup = nombre.closest('.form-group');
            if (nombre.value.trim().length < 3) {
                nombreGroup.classList.add('error');
                isValid = false;
            } else {
                nombreGroup.classList.remove('error');
            }

            const email = document.getElementById('email');
            const emailGroup = email.closest('.form-group');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                emailGroup.classList.add('error');
                isValid = false;
            } else {
                emailGroup.classList.remove('error');
            }

            const mensaje = document.getElementById('mensaje');
            const mensajeGroup = mensaje.closest('.form-group');
            if (mensaje.value.trim().length < 10) {
                mensajeGroup.classList.add('error');
                isValid = false;
            } else {
                mensajeGroup.classList.remove('error');
            }

            if (isValid) {
                formSuccess.style.display = 'block';
                contactForm.reset();
                setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
            }
        });

        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.closest('.form-group').classList.remove('error');
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Animaciones al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.destination-card, .culture-grid, .gallery-item, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
