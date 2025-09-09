// Attack on Titan Team - JavaScript Principal
// Funciones globales y navegación general del sitio

document.addEventListener('DOMContentLoaded', function() {
    console.log('🛡️ Inicializando Scout Regiment Site - JavaScript Global');
    
    // Inicializar funciones globales
    initGlobalNavigation();
    initLoadingEffects();
    initGlobalAnimations();
    initAccessibilityFeatures();
    
    console.log('⚔️ Main.js cargado - "Dedicad vuestros corazones"');
});

/**
 * Navegación interactiva global
 * Efectos hover y transiciones suaves en el menú
 */
function initGlobalNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // Efectos hover mejorados
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            console.log('🔗 Hover en enlace:', this.textContent);
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Efectos de click
        link.addEventListener('click', function(e) {
            // Agregar clase de loading si es navegación interna
            if (this.hostname === window.location.hostname) {
                showPageTransition();
            }
        });
    });
    
    // Indicador de página activa
    highlightActivePage();
    
    console.log('✅ Navegación global inicializada');
}

/**
 * Transiciones suaves entre páginas
 */
function showPageTransition() {
    const body = document.body;
    
    // Crear overlay de transición
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a0f08, #2c1810);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    
    body.appendChild(overlay);
    
    // Mostrar overlay
    setTimeout(() => {
        overlay.style.opacity = '0.8';
    }, 10);
    
    // Remover después de la transición
    setTimeout(() => {
        body.removeChild(overlay);
    }, 500);
}

/**
 * Destacar página activa en la navegación
 */
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
           (currentPage === '' && linkPage === 'index.html')) {
            link.style.background = 'linear-gradient(135deg, #ffd700, #ffb347)';
            link.style.color = '#1a0f08';
            link.style.fontWeight = 'bold';
        }
    });
}

/**
 * Efectos de loading globales
 * Animaciones durante la carga del contenido
 */
function initLoadingEffects() {
    // Animación de entrada para el header
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            header.style.transition = 'all 0.6s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animación de entrada para el footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.opacity = '0';
        
        setTimeout(() => {
            footer.style.transition = 'opacity 0.6s ease';
            footer.style.opacity = '1';
        }, 400);
    }
    
    console.log('✅ Efectos de loading inicializados');
}

/**
 * Animaciones globales del sitio
 * Cards que aparecen progresivamente al cargar la página
 */
function initGlobalAnimations() {
    // Animación para cards en la página principal
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 200 + (index * 150));
    });
    
    // Efectos de scroll (Intersection Observer)
    initScrollAnimations();
    
    console.log('✅ Animaciones globales configuradas');
}

/**
 * Animaciones basadas en scroll
 */
function initScrollAnimations() {
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
    
    // Observar elementos con clase 'animate-on-scroll'
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Características de accesibilidad globales
 */
function initAccessibilityFeatures() {
    // Navegación por teclado mejorada
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #FFD700';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Shortcuts de teclado
    document.addEventListener('keydown', function(e) {
        // Alt + H para ir a Home
        if (e.altKey && e.key === 'h') {
            window.location.href = 'index.html';
        }
        
        // Alt + M para ir a Marcos
        if (e.altKey && e.key === 'm') {
            window.location.href = 'marcos.html';
        }
        
        // Escape para cerrar modales/overlays
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    console.log('✅ Características de accesibilidad configuradas');
}

/**
 * Cerrar todos los modales abiertos
 */
function closeAllModals() {
    const modals = document.querySelectorAll('.modal, .overlay, .popup');
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('active', 'visible');
    });
}

/**
 * Gestión de eventos globales
 * Listeners para interacciones del usuario
 */
function initEventListeners() {
    // Redimensión de ventana
    window.addEventListener('resize', debounce(handleWindowResize, 250));
    
    // Scroll global
    window.addEventListener('scroll', throttle(handleGlobalScroll, 16));
    
    // Cambio de visibilidad de la página
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

/**
 * Manejar redimensión de ventana
 */
function handleWindowResize() {
    console.log('📐 Ventana redimensionada:', window.innerWidth + 'x' + window.innerHeight);
    
    // Ajustar elementos según nuevo tamaño
    const currentBreakpoint = getCurrentBreakpoint();
    document.body.setAttribute('data-breakpoint', currentBreakpoint);
}

/**
 * Obtener breakpoint actual
 */
function getCurrentBreakpoint() {
    const width = window.innerWidth;
    
    if (width <= 400) return 'mobile-small';
    if (width <= 900) return 'mobile-tablet';
    if (width <= 1199) return 'tablet-large';
    return 'desktop';
}

/**
 * Manejar scroll global
 */
function handleGlobalScroll() {
    const scrollY = window.scrollY;
    const header = document.querySelector('header');
    
    // Efecto de header al hacer scroll
    if (header) {
        if (scrollY > 100) {
            header.style.background = 'rgba(139, 69, 19, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(139, 69, 19, 0.9)';
            header.style.backdropFilter = 'none';
        }
    }
}

/**
 * Manejar cambio de visibilidad de página
 */
function handleVisibilityChange() {
    if (document.hidden) {
        console.log('📴 Página oculta');
        // Pausar animaciones costosas
    } else {
        console.log('📱 Página visible');
        // Reanudar animaciones
    }
}

/**
 * Funciones de utilidad
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Inicializar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initEventListeners);

// Exportar funciones globales
window.ScoutRegimentGlobal = {
    showPageTransition,
    getCurrentBreakpoint,
    closeAllModals
};

// Attack on Titan Card Effects Marcos
document.addEventListener('DOMContentLoaded', function() {
    const marcosCard = document.getElementById('marcosCard');
    
    if (marcosCard) {
        // Efecto de flip al hacer click
        marcosCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });

        // Efecto hover solo cuando no está volteada
        marcosCard.addEventListener('mouseenter', function() {
            if (!this.classList.contains('flipped')) {
                this.classList.add('titan-hover');
                this.style.transform = 'scale(1.02) rotateY(2deg)';
            }
        });

        marcosCard.addEventListener('mouseleave', function() {
            this.classList.remove('titan-hover');
            if (!this.classList.contains('flipped')) {
                this.style.transform = '';
            }
        });

        // Efecto de pulsación
        marcosCard.addEventListener('mousedown', function() {
            this.style.transform = this.classList.contains('flipped') ? 
                'rotateY(180deg) scale(0.98)' : 'scale(0.98)';
        });

        marcosCard.addEventListener('mouseup', function() {
            setTimeout(() => {
                this.style.transform = this.classList.contains('flipped') ? 
                    'rotateY(180deg)' : '';
            }, 100);
        });
    }

    // Animaciones CSS adicionales
    const style = document.createElement('style');
    style.textContent = `
        @keyframes titanPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        .titan-hover {
            box-shadow: 0 20px 50px rgba(255, 215, 0, 0.3) !important;
        }
        
        /* Efecto de partículas en hover */
        .card-front::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(255, 215, 0, 0.05) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .titan-card:hover .card-front::after {
            opacity: 1;
        }

        /* Animación de entrada */
        .titan-card {
            animation: cardEntrance 0.8s ease-out;
        }

        @keyframes cardEntrance {
            from { 
                opacity: 0; 
                transform: translateY(50px) rotateX(20deg); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0) rotateX(0); 
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎯 Attack on Titan card initialized - "Dedicad vuestros corazones"');
});