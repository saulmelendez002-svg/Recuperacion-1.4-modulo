document.addEventListener('DOMContentLoaded', () => {
    // 1. Desplazamiento suave para los enlaces de navegación
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Resaltado de la sección activa en el menú durante el scroll
    const sections = document.querySelectorAll('.content-card');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.style.color = 'var(--primary-accent)';
                link.style.fontWeight = 'bold';
            } else {
                link.style.fontWeight = 'normal';
            }
        });
    });

    // 3. Botón flotante para regresar al inicio (Top)
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    
    // Estilos dinámicos para el botón estilo dark/minimal
    Object.assign(scrollTopBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-white)',
        border: '1px solid var(--border-color)',
        fontSize: '18px',
        cursor: 'pointer',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000',
        transition: 'all 0.2s ease'
    });

    document.body.appendChild(scrollTopBtn);

    // Efectos hover en el botón
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.borderColor = 'var(--primary-accent)';
        scrollTopBtn.style.color = 'var(--primary-accent)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.borderColor = 'var(--border-color)';
        scrollTopBtn.style.color = 'var(--text-white)';
    });

    // Mostrar/Ocultar botón según el scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Acción de subir al hacer clic
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});