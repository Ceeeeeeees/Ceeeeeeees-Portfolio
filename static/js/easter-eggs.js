// Easter Eggs de Cyberpunk Edgerunners

// Paleta de colores de Cyberpunk Edgerunners
const edgerunnersColors = {
    jetBlack: '#26303C',
    mutedTeal: '#A5C3A5',
    blueSlate: '#506272',
    amethyst: '#A589B9',
    mint: '#63C9A4'
};

// Konami Code detector
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;

            if (konamiIndex === konamiCode.length) {
                activateEdgerunnersMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
})();

// Comando en consola
window.choom = function() {
    activateEdgerunnersMode();
    console.log('%c¡CHOOM! Modo Cyberpunk Edgerunners activado 🌃⚡',
        `color: ${edgerunnersColors.mint}; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px ${edgerunnersColors.mint};`);
};

window.edgerunners = function() {
    activateEdgerunnersMode();
};

// Activar modo Edgerunners
function activateEdgerunnersMode() {
    console.log('%c🌃 WELCOME TO NIGHT CITY, CHOOM! 🌃',
        `background: ${edgerunnersColors.jetBlack}; color: ${edgerunnersColors.mint}; font-size: 18px; padding: 10px 20px; border: 2px solid ${edgerunnersColors.mint}; border-radius: 5px;`);

    console.log('%cYou activated the Cyberpunk Edgerunners Easter Egg!',
        `color: ${edgerunnersColors.amethyst}; font-size: 14px; font-style: italic;`);

    console.log('%cStay sharp out there... 🔫',
        `color: ${edgerunnersColors.mutedTeal}; font-size: 12px;`);

    // Crear overlay de glitch
    createGlitchOverlay();

    // Aplicar efectos visuales temporales
    applyEdgerunnersEffects();

    // Crear partículas flotantes
    createCyberpunkParticles();

    // Sonido (opcional - comentado para no molestar al usuario)
    // playEdgerunnersSound();
}

function createGlitchOverlay() {
    // Crear overlay temporal con efecto glitch
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg,
            ${edgerunnersColors.jetBlack}ee 0%,
            ${edgerunnersColors.blueSlate}dd 50%,
            ${edgerunnersColors.amethyst}cc 100%);
        z-index: 99999;
        pointer-events: none;
        animation: glitchFade 3s ease-out forwards;
        mix-blend-mode: multiply;
    `;

    document.body.appendChild(overlay);

    // Remover después de la animación
    setTimeout(() => {
        overlay.remove();
    }, 3000);
}

function applyEdgerunnersEffects() {
    const root = document.documentElement;
    const originalAccent = getComputedStyle(root).getPropertyValue('--accent-color');

    // Cambiar temporalmente los colores del sitio
    root.style.setProperty('--accent-color', edgerunnersColors.mint);
    root.style.setProperty('--secondary-accent', edgerunnersColors.amethyst);

    // Crear mensaje flotante
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🌃</div>
        <div style="font-size: 1.5rem; font-weight: bold; font-family: 'Orbitron', monospace; text-transform: uppercase; letter-spacing: 3px;">NIGHT CITY</div>
        <div style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.8;">Edgerunners Mode Activated</div>
    `;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, ${edgerunnersColors.jetBlack}f5 0%, ${edgerunnersColors.blueSlate}f0 100%);
        color: ${edgerunnersColors.mint};
        padding: 3rem 4rem;
        border-radius: 10px;
        z-index: 100000;
        text-align: center;
        box-shadow: 0 0 50px ${edgerunnersColors.mint}80,
                    0 0 100px ${edgerunnersColors.amethyst}40,
                    inset 0 0 30px ${edgerunnersColors.blueSlate}30;
        border: 2px solid ${edgerunnersColors.mint};
        animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards,
                   popOut 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 2.5s forwards;
        font-family: 'JetBrains Mono', monospace;
    `;

    document.body.appendChild(message);

    // Remover mensaje y restaurar colores
    setTimeout(() => {
        message.remove();
        root.style.setProperty('--accent-color', originalAccent);
        root.style.setProperty('--secondary-accent', '#ff00ff');
    }, 3000);
}

function createCyberpunkParticles() {
    const particlesCount = 30;

    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 3;
        const colors = Object.values(edgerunnersColors);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() - 0.5) * 50;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;

        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${startX}vw;
            bottom: -10px;
            z-index: 99998;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px ${color};
            opacity: 0;
            animation: floatUp ${duration}s ease-out ${delay}s forwards;
        `;

        document.body.appendChild(particle);

        // Remover después de la animación
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }
}

// Añadir animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes glitchFade {
        0% {
            opacity: 1;
            transform: translateX(0);
        }
        10% {
            opacity: 0.8;
            transform: translateX(-5px);
        }
        20% {
            opacity: 1;
            transform: translateX(5px);
        }
        30% {
            opacity: 0.9;
            transform: translateX(-3px);
        }
        50% {
            opacity: 0.7;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes popIn {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }

    @keyframes popOut {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }

    @keyframes floatUp {
        0% {
            bottom: -10px;
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            bottom: 110vh;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mensaje de bienvenida en consola
console.log('%cTip: Type "choom()" or "edgerunners()" in the console or use the Konami Code! 🎮',
    `color: ${edgerunnersColors.mint}; font-size: 12px; font-style: italic;`);
console.log('%cKonami Code: ↑ ↑ ↓ ↓ ← → ← → B A',
    `color: ${edgerunnersColors.amethyst}; font-size: 10px;`);
