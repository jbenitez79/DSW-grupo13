
// Funcionalidades específicas de Marcos

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Inicializando página de Marcos - Scout Regiment');
    
    // Inicializar todas las funcionalidades
    initFlipCard();
    initHoverEffects();
    initResponsiveFeatures();
    initKeyboardNavigation();
    initLoadingAnimations();
    
    console.log('⚔️ Marcos.js cargado completamente - "Dedicad vuestros corazones"');
});

/**
 * Función principal para la card interactiva con flip
 * Maneja el volteo de la card al hacer click
 */
function flipCard() {
    const marcosCard = document.getElementById('marcosCard');
    
    if (marcosCard) {
        marcosCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
            
            // Analytics del flip
            console.log('🔄 Card volteada:', this.classList.contains('flipped') ? 'Reverso' : 'Frente');
            
            // Agregar efecto de sonido (opcional)
            playFlipSound();
        });
        
        console.log('✅ Sistema de flip inicializado');
    }
}

/**
 * Inicializar la funcionalidad de flip de la card
 * Configuración principal del sistema de volteo
 */
function initFlipCard() {
    flipCard();
    
    // Agregar indicador visual de interactividad
    const marcosCard = document.getElementById('marcosCard');
    if (marcosCard) {
        marcosCard.style.cursor = 'pointer';
        
        // Agregar hint visual
        addFlipHint();
    }
}

/**
 * Efectos de hover dinámicos
 * Cambio de imagen y escalado de la card
 */
function initHoverEffects() {
    const marcosCard = document.getElementById('marcosCard');
    const cardImage = document.querySelector('.card-image');
    
    if (marcosCard && cardImage) {
        marcosCard.addEventListener('mouseenter', function() {
            // Escalado suave solo si no está volteada
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'scale(1.02)';
                
                // Cambiar imagen al hacer hover
                cardImage.style.backgroundImage = 'url("img/marcos2.jpeg")';
                
                console.log('🎯 Hover activado en card de Marcos');
            }
        });
        
        marcosCard.addEventListener('mouseleave', function() {
            // Resetear transformación si no está volteada
            if (!this.classList.contains('flipped')) {
                this.style.transform = '';
                
                // Volver a imagen original
                cardImage.style.backgroundImage = 'url("img/marcos1.jpeg")';
            }
        });
        
        console.log('✅ Efectos hover inicializados');
    }
}

/**
 * Características responsive específicas de Marcos
 * Ajustes dinámicos según el tamaño de pantalla
 */
function initResponsiveFeatures() {
    // Detectar cambios en el tamaño de ventana
    window.addEventListener('resize', handleResize);
    
    // Configuración inicial
    handleResize();
    
    function handleResize() {
        const screenWidth = window.innerWidth;
        const marcosCard = document.getElementById('marcosCard');
        
        if (marcosCard) {
            // Ajustes específicos por breakpoint
            if (screenWidth <= 400) {
                // Móviles pequeños
                marcosCard.style.margin = '20px auto 40px auto';
                console.log('📱 Modo móvil pequeño activado');
                
            } else if (screenWidth <= 900) {
                // Móviles y tablets
                marcosCard.style.margin = '30px auto 50px auto';
                console.log('📱 Modo móvil/tablet activado');
                
            } else if (screenWidth <= 1199) {
                // Tablets grandes
                marcosCard.style.margin = '40px auto 70px auto';
                console.log('💻 Modo tablet grande activado');
                
            } else {
                // Desktop
                marcosCard.style.margin = '50px auto 100px auto';
                console.log('🖥️ Modo desktop activado');
            }
        }
    }
    
    console.log('✅ Características responsive inicializadas');
}

/**
 * Navegación por teclado para accesibilidad
 * Soporte para usuarios que navegan con teclado
 */
function initKeyboardNavigation() {
    const marcosCard = document.getElementById('marcosCard');
    
    if (marcosCard) {
        // Hacer la card focuseable
        marcosCard.setAttribute('tabindex', '0');
        marcosCard.setAttribute('role', 'button');
        marcosCard.setAttribute('aria-label', 'Voltear card de Marcos para ver más información');
        
        // Eventos de teclado
        marcosCard.addEventListener('keydown', function(e) {
            // Espaciador o Enter para voltear
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.click();
                console.log('⌨️ Card volteada via teclado');
            }
            
            // Escape para volver al frente
            if (e.key === 'Escape' && this.classList.contains('flipped')) {
                this.classList.remove('flipped');
                console.log('⌨️ Card vuelta al frente via ESC');
            }
        });
        
        // Efectos visuales de focus
        marcosCard.addEventListener('focus', function() {
            this.style.outline = '3px solid #FFD700';
            this.style.outlineOffset = '3px';
        });
        
        marcosCard.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        console.log('✅ Navegación por teclado configurada');
    }
}

/**
 * Animaciones de carga de la página
 * Efectos visuales al cargar la página de Marcos
 */
function initLoadingAnimations() {
    const marcosCard = document.getElementById('marcosCard');
    
    if (marcosCard) {
        // Animación de entrada
        marcosCard.style.opacity = '0';
        marcosCard.style.transform = 'translateY(30px) scale(0.95)';
        
        // Mostrar con animación después de un breve delay
        setTimeout(() => {
            marcosCard.style.transition = 'all 0.8s ease-out';
            marcosCard.style.opacity = '1';
            marcosCard.style.transform = 'translateY(0) scale(1)';
            
            console.log('✨ Animación de entrada completada');
        }, 200);
        
        // Animación de las secciones del reverso
        initBackCardAnimations();
    }
}

/**
 * Animaciones específicas del reverso de la card
 */
function initBackCardAnimations() {
    const backSections = document.querySelectorAll('.back-section');
    
    backSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    // Observer para animar cuando la card se voltea
    const marcosCard = document.getElementById('marcosCard');
    if (marcosCard) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const isFlipped = marcosCard.classList.contains('flipped');
                    
                    if (isFlipped) {
                        // Animar secciones del reverso
                        setTimeout(() => {
                            backSections.forEach(section => {
                                section.style.opacity = '1';
                                section.style.transform = 'translateY(0)';
                            });
                        }, 300);
                    } else {
                        // Resetear animaciones
                        backSections.forEach(section => {
                            section.style.opacity = '0';
                            section.style.transform = 'translateY(20px)';
                        });
                    }
                }
            });
        });
        
        observer.observe(marcosCard, { attributes: true });
    }
    
    console.log('✅ Animaciones del reverso configuradas');
}

/**
 * Agregar hint visual para indicar interactividad
 */
function addFlipHint() {
    const marcosCard = document.getElementById('marcosCard');
    
    if (marcosCard && !document.querySelector('.flip-hint')) {
        const hint = document.createElement('div');
        hint.className = 'flip-hint';
        hint.textContent = 'Click para más info';
        hint.style.cssText = `
            position: absolute;
            bottom: 8px;
            right: 12px;
            background: rgba(0, 0, 0, 0.7);
            color: #FFD700;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            opacity: 0.8;
            z-index: 10;
            pointer-events: none;
            animation: hintPulse 2s infinite ease-in-out;
        `;
        
        marcosCard.appendChild(hint);
        
        // Agregar animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes hintPulse {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.05); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        console.log('💡 Hint visual agregado');
    }
}

/**
 * Efecto de sonido para el flip (opcional)
 */
function playFlipSound() {
    // Simulación de sonido con Web Audio API (opcional)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        
    } catch (error) {
        // Fallar silenciosamente si no hay soporte de audio
        console.log('🔇 Audio no disponible');
    }
}

/**
 * Funciones de utilidad específicas para Marcos
 */
const MarcosUtils = {
    /**
     * Obtener información del estado actual de la card
     */
    getCardState: function() {
        const marcosCard = document.getElementById('marcosCard');
        return {
            isFlipped: marcosCard ? marcosCard.classList.contains('flipped') : false,
            isVisible: marcosCard ? marcosCard.offsetParent !== null : false,
            currentTransform: marcosCard ? window.getComputedStyle(marcosCard).transform : 'none'
        };
    },
    
    /**
     * Forzar volteo de la card programáticamente
     */
    forceFlip: function(toBack = true) {
        const marcosCard = document.getElementById('marcosCard');
        if (marcosCard) {
            if (toBack) {
                marcosCard.classList.add('flipped');
            } else {
                marcosCard.classList.remove('flipped');
            }
            console.log('🔄 Flip forzado:', toBack ? 'al reverso' : 'al frente');
        }
    },
    
    /**
     * Resetear todas las animaciones
     */
    resetAnimations: function() {
        const marcosCard = document.getElementById('marcosCard');
        if (marcosCard) {
            marcosCard.style.transform = '';
            marcosCard.classList.remove('flipped');
            console.log('🔄 Animaciones reseteadas');
        }
    }
};

// Exportar funciones para uso global (si es necesario)
window.MarcosPageFunctions = {
    flipCard,
    initHoverEffects,
    initResponsiveFeatures,
    MarcosUtils
};