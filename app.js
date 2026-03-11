/**
 * app.js - Lógica de la plantilla NutriPremium
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menú Móvil
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileToggle.querySelector('svg');
            // Cambiar icono simple (esto es demo, en real usaríamos dos SVGs)
        });
    }

    // Cerrar menú al hacer click en un link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // 2. Animación al hacer Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Slider de Testimonios
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-slide');
    const prevBtn = document.querySelector('.prev-slide');
    
    let currentSlide = 0;

    function updateSlider() {
        if (!track) return;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });

        // Auto-play opcional
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 8000);
    }

    // 4. Toggle de Precios (Online vs Presencial)
    const pricingToggle = document.querySelector('.pricing-toggle .toggle-switch');
    const prices = document.querySelectorAll('.price-amount');
    
    // Valores demo: [Inicio, Seguimiento, Premium]
    const onlinePrices = [59, 149, 299];
    const presencialPrices = [75, 185, 350];

    if (pricingToggle) {
        pricingToggle.addEventListener('click', () => {
            pricingToggle.classList.toggle('active');
            const isPresencial = pricingToggle.classList.contains('active');
            
            prices.forEach((priceEl, index) => {
                const amount = isPresencial ? presencialPrices[index] : onlinePrices[index];
                priceEl.innerHTML = `${amount}€<span>/mes</span>`;
            });
        });
    }

    // 5. FAQ Acordeón
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Cerrar otros
            faqItems.forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 6. Banner de Cookies
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    if (cookieBanner && !localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 2000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            cookieBanner.style.display = 'none';
        });
    }

    // 7. Validación de Formularios y Modales
    const contactForm = document.getElementById('contact-form');
    const leadForm = document.getElementById('lead-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');

    function showSuccess(message) {
        if (successModal) {
            successModal.querySelector('p').textContent = message;
            successModal.style.display = 'flex';
        }
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulación de envío
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                showSuccess('¡Gracias! He recibido tu solicitud. Me pondré en contacto contigo en menos de 24h.');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = leadForm.querySelector('button');
            btn.textContent = 'Preparando descarga...';
            
            setTimeout(() => {
                showSuccess('¡Guía enviada! Revisa tu bandeja de entrada (y la carpeta de spam por si acaso).');
                leadForm.reset();
                btn.textContent = 'Descargar Guía Gratis';
            }, 1500);
        });
    }

    // 8. Pre-selección de plan desde botones de precios
    document.querySelectorAll('.btn-select-plan').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = e.target.closest('.price-card').querySelector('h3').textContent;
            const selectPlan = document.getElementById('plan');
            if (selectPlan) {
                selectPlan.value = plan;
                // Scroll suave al formulario
                document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 9. Modal para enlaces legales (Demo)
    document.querySelectorAll('a[href^="#legal-"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSuccess('Aquí se mostraría el texto legal completo de ' + e.target.textContent + '. Esta es una sección obligatoria para el RGPD.');
        });
    });
});
