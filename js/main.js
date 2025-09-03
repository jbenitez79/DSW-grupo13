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