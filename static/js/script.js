document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año actual
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Detectar cuando las fuentes se han cargado
    detectFontsLoaded();

    // Toggle para modo de tema (claro/oscuro) en nav
    initializeLightDarkToggle();

    // Toggle para modo monocromo (botón flotante)
    initializeMonochromeToggle();

    // Efecto typing para terminal-text
    initializeTypingEffect();

    // Matrix effect
    initializeMatrixEffect();

    // Funcionalidad de descarga de CV
    initializeDownloadCV();

    // Animaciones al hacer scroll
    initializeScrollAnimations();

    // Banner de cookies
    initializeCookieBanner();

    // Mejorar animación del menú hamburguesa
    initializeHamburgerAnimation();
});

function detectFontsLoaded() {
    // Detectar cuando las fuentes de Google se han cargado
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('1em JetBrains Mono'),
            document.fonts.load('1em Space Grotesk'),
            document.fonts.load('1em Orbitron')
        ]).then(() => {
            document.documentElement.classList.add('fonts-loaded');
        }).catch(() => {
            // Si falla, usar fuentes del sistema
            console.log('Usando fuentes del sistema');
        });
    } else {
        // Navegador antiguo, asumir carga después de un tiempo
        setTimeout(() => {
            document.documentElement.classList.add('fonts-loaded');
        }, 1000);
    }
}

function initializeLightDarkToggle() {
    // Obtener el botón en el nav
    const toggleButton = document.getElementById('lightDarkToggle');
    if (!toggleButton) {
        console.error('No se encontró el botón de light/dark toggle');
        return;
    }

    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('light-dark-mode') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateLightDarkButton(toggleButton, true);
    }

    // Event listener para el toggle
    toggleButton.addEventListener('click', function() {
        const isCurrentlyLight = document.body.classList.contains('light-mode');

        if (isCurrentlyLight) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('light-dark-mode', 'dark');
            updateLightDarkButton(toggleButton, false);
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('light-dark-mode', 'light');
            updateLightDarkButton(toggleButton, true);
        }

        // Actualizar el botón de monocromo también
        const monochromeButton = document.getElementById('monochromeToggle');
        if (monochromeButton) {
            const isMonochrome = document.body.classList.contains('monochrome-mode');
            updateMonochromeButton(monochromeButton, isMonochrome);
        }
    });
}

function updateLightDarkButton(button, isLight) {
    if (isLight) {
        button.innerHTML = '<i class="fas fa-sun"></i>';
        button.title = 'Cambiar a tema oscuro';
        button.setAttribute('aria-label', 'Cambiar a tema oscuro');
    } else {
        button.innerHTML = '<i class="fas fa-moon"></i>';
        button.title = 'Cambiar a tema claro';
        button.setAttribute('aria-label', 'Cambiar a tema claro');
    }
}

function initializeMonochromeToggle() {
    // Obtener el botón flotante
    const toggleButton = document.getElementById('monochromeToggle');
    if (!toggleButton) {
        console.error('No se encontró el botón de monochrome toggle');
        return;
    }

    // Verificar si hay una preferencia guardada
    const savedMode = localStorage.getItem('monochrome-mode') || 'color';
    if (savedMode === 'monochrome') {
        document.body.classList.add('monochrome-mode');
        updateMonochromeButton(toggleButton, true);
    }

    // Event listener para el toggle
    toggleButton.addEventListener('click', function() {
        const isCurrentlyMonochrome = document.body.classList.contains('monochrome-mode');

        if (isCurrentlyMonochrome) {
            document.body.classList.remove('monochrome-mode');
            localStorage.setItem('monochrome-mode', 'color');
            updateMonochromeButton(toggleButton, false);
        } else {
            document.body.classList.add('monochrome-mode');
            localStorage.setItem('monochrome-mode', 'monochrome');
            updateMonochromeButton(toggleButton, true);
        }
    });
}

function updateMonochromeButton(button, isMonochrome) {
    const isLightMode = document.body.classList.contains('light-mode');

    if (isMonochrome) {
        button.innerHTML = '<i class="fas fa-palette"></i>';
        if (isLightMode) {
            button.title = 'Volver a colores verde';
            button.setAttribute('aria-label', 'Volver a colores verde');
        } else {
            button.title = 'Volver a modo color';
            button.setAttribute('aria-label', 'Volver a modo color');
        }
    } else {
        button.innerHTML = '<i class="fas fa-adjust"></i>';
        if (isLightMode) {
            button.title = 'Cambiar a colores azules';
            button.setAttribute('aria-label', 'Cambiar a colores azules');
        } else {
            button.title = 'Cambiar a modo monocromo';
            button.setAttribute('aria-label', 'Cambiar a modo monocromo');
        }
    }
}

function initializeTypingEffect() {
    const texts = [
        "Desarrollador web.",
        "Entusiasta de la ciberseguridad.",
        "Amante de la música.",
        "Creador de soluciones."
    ];

    const terminalText = document.querySelector('.terminal-text');
    if (!terminalText) {
        console.log('No se encontró el elemento .terminal-text');
        return;
    }

    let currentIndex = 0;
    let isTyping = false;
    
    // Asegurar que el elemento sea visible inicialmente
    terminalText.style.display = 'inline-block';
    terminalText.textContent = '';
    
    function typeText(text, callback) {
        if (isTyping) return;
        isTyping = true;
        
        let charIndex = 0;
        const typingSpeed = 80; // ms por carácter
        const pauseBeforeErase = 2500; // pausa antes de borrar
        const eraseSpeed = 40; // ms por carácter al borrar
        
        function typeChar() {
            if (charIndex < text.length) {
                terminalText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            } else {
                // Texto completo, pausar y luego borrar
                setTimeout(eraseText, pauseBeforeErase);
            }
        }
        
        function eraseText() {
            if (terminalText.textContent.length > 0) {
                terminalText.textContent = terminalText.textContent.slice(0, -1);
                setTimeout(eraseText, eraseSpeed);
            } else {
                isTyping = false;
                if (callback) callback();
            }
        }
        
        // Limpiar texto actual y empezar a escribir
        terminalText.textContent = '';
        typeChar();
    }
    
    function startTypingCycle() {
        typeText(texts[currentIndex], function() {
            currentIndex = (currentIndex + 1) % texts.length;
            setTimeout(startTypingCycle, 800); // pausa entre textos
        });
    }
    
    // Iniciar el ciclo de escritura después de un pequeño delay
    setTimeout(startTypingCycle, 1000);
}

function initializeMatrixEffect() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Setting canvas dimensions to match section size
    function resizeCanvas() {
        const sobreMiSection = document.getElementById('SobreMi');
        if (!sobreMiSection) return;
        
        canvas.width = sobreMiSection.offsetWidth;
        canvas.height = sobreMiSection.offsetHeight;
        // Reinitialize drops on resize
        initializeDrops();
    }

    window.addEventListener('resize', resizeCanvas);

    // Characters for matrix effect
    const pythonSyntax = [
        "def", "class", "import", "from", "if", "elif", "else", "for", "while",
        "return", "try:", "except:", "finally:", "with", "as", "lambda", "yield",
        "True", "False", "None", "self", "__init__"
    ];

    const hackerTerms = [
        "hack", "exploit", "breach", "payload", "backdoor", "buffer", "overflow",
        "sql", "injection", "xss", "firewall", "cipher", "encrypt", "decrypt",
        "DDoS", "keylogger", "phishing", "rootkit", "trojan", "malware",
        "zero-day"
    ];

    const musicRefs = [
        "Kanye", "Taylor", "Frank", "Ocean", "Swift", "West", "808s", "Blonde",
        "Zoé", "Memo Rex", "Programaton"
    ];

    const movieRefs = [
        "Memento", "Nolan", "Before Sunrise", "Ex-Machina", "Se7en", "Fincher", 
        "Before Sunrise", "Before Sunset", "Tenet"
    ];

    const bookRefs = [
        "Murakami", "Camus", "extranjero", "ángeles", "Sputnik", "Mundo feliz",
        "Levedad", "Peso", "Ser"
    ];

    // All phrases combined
    const allPhrases = [...pythonSyntax, ...hackerTerms, ...musicRefs, ...movieRefs, ...bookRefs];

    // Matrix character columns
    let drops = [];

    // Initialize columns
    function initializeDrops() {
        drops = [];
        const columnCount = Math.floor(canvas.width / 20); // Column width

        for (let i = 0; i < columnCount; i++) {
            drops.push({
                x: i * 20,
                y: Math.random() * -500, // Random starting position above canvas
                speed: Math.random() * 3 + 1, // Random speed
                phrase: allPhrases[Math.floor(Math.random() * allPhrases.length)],
                opacity: Math.random() * 0.5 + 0.3, // Random opacity
                size: Math.random() * 6 + 12 // Random font size
            });
        }
    }

    // Drawing function
    function draw() {
        // Detectar si estamos en modo claro y/o monocromo
        const isLightMode = document.body.classList.contains('light-mode');
        const isMonochrome = document.body.classList.contains('monochrome-mode');

        // Semi-transparent overlay for fade effect (diferente según el modo)
        if (isLightMode) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        } else {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];

            // Draw the phrase con color según el modo
            ctx.font = `${drop.size}px "JetBrains Mono", monospace`;

            // Determinar el color según el modo
            if (isLightMode && isMonochrome) {
                // Modo claro + monocromo: usar azul
                ctx.fillStyle = `rgba(37, 99, 235, ${drop.opacity})`;
            } else if (isLightMode) {
                // Modo claro normal: usar verde oscuro
                ctx.fillStyle = `rgba(0, 150, 80, ${drop.opacity})`;
            } else {
                // Modo oscuro: usar verde neón
                ctx.fillStyle = `rgba(0, 255, 140, ${drop.opacity})`;
            }

            ctx.fillText(drop.phrase, drop.x, drop.y);

            // Move the phrase down
            drop.y += drop.speed;

            // Reset when phrase goes off canvas with a new random phrase
            if (drop.y > canvas.height + 20) {
                drop.y = Math.random() * -200;
                drop.phrase = allPhrases[Math.floor(Math.random() * allPhrases.length)];
                drop.opacity = Math.random() * 0.5 + 0.3;
            }
        }

        // Loop animation
        requestAnimationFrame(draw);
    }

    // Call resize to set canvas dimensions and initialize drops
    resizeCanvas();

    // Start animation
    draw();
}

function initializeDownloadCV() {
    const downloadButton = document.getElementById('downloadCV');
    if (!downloadButton) {
        console.error('No se encontró el botón de descarga de CV');
        return;
    }

    downloadButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Ruta al archivo CV (debe estar en la carpeta static)
        const cvPath = './static/CV_Cesar_Saucedo.pdf';

        // Intentar descargar el archivo
        fetch(cvPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // El archivo existe, iniciar descarga
                    const link = document.createElement('a');
                    link.href = cvPath;
                    link.download = 'CV_Cesar_Saucedo.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    // El archivo no existe, mostrar mensaje
                    showCVNotification();
                }
            })
            .catch(() => {
                // Error al verificar el archivo, mostrar mensaje
                showCVNotification();
            });
    });
}

function showCVNotification() {
    // Crear overlay oscuro
    const overlay = document.createElement('div');
    overlay.className = 'cv-overlay';
    overlay.id = 'cvOverlay';

    // Crear modal con Bob Constructor
    const notification = document.createElement('div');
    notification.className = 'cv-notification';
    notification.id = 'cvNotification';
    notification.innerHTML = `
        <button class="cv-notification-close" id="closeCVModal" aria-label="Cerrar">
            <i class="fas fa-times"></i>
        </button>
        <div class="cv-notification-content">
            <div class="bob-constructor">👷‍♂️</div>
            <h3 class="cv-notification-title">¡En Construcción!</h3>
            <p class="cv-notification-text">
                Estoy trabajando en mi CV profesional.<br>
                Mientras tanto, ¡explora mi portafolio!
            </p>
            <div class="cv-notification-tools">
                <span>🔨</span>
                <span>🚧</span>
                <span>⚙️</span>
            </div>
        </div>
    `;

    // Añadir al DOM
    document.body.appendChild(overlay);
    document.body.appendChild(notification);

    // Función para cerrar el modal
    const closeModal = () => {
        notification.classList.remove('show');
        overlay.classList.remove('show');

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 400);
    };

    // Event listeners para cerrar
    const closeButton = document.getElementById('closeCVModal');
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Cerrar con tecla ESC
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Mostrar modal con animación
    setTimeout(() => {
        overlay.classList.add('show');
        notification.classList.add('show');
    }, 50);

    // Auto-cerrar después de 6 segundos (opcional)
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeModal();
        }
    }, 6000);
}

function initializeScrollAnimations() {
    // Respetar preferencia de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        return; // No aplicar animaciones si el usuario prefiere movimiento reducido
    }

    // Detectar si estamos en móvil
    const isMobile = window.innerWidth <= 768;

    // Configuración adaptativa según el dispositivo
    const observerOptions = {
        root: null,
        rootMargin: isMobile ? '-20px 0px -20px 0px' : '-80px 0px -80px 0px', // Menos agresivo en móvil
        threshold: isMobile ? [0, 0.1, 0.2] : [0, 0.05, 0.1, 0.15, 0.2, 0.25] // Menos thresholds en móvil
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Animaciones bidireccionales tanto en móvil como en desktop
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, observerOptions);

    // Arrays de efectos variados para rotación
    const slideEffects = ['scroll-slide-left', 'scroll-slide-right', 'scroll-diagonal-left', 'scroll-diagonal-right'];
    const scaleEffects = ['scroll-scale', 'scroll-blur'];

    // Añadir clases de animación a las secciones con efectos rotatorios
    const sections = document.querySelectorAll('section:not(#SobreMi)');
    sections.forEach((section, index) => {
        // Alternar entre diferentes efectos
        if (index % 3 === 0) {
            section.classList.add('scroll-reveal');
        } else if (index % 3 === 1) {
            section.classList.add('scroll-blur');
        } else {
            section.classList.add('scroll-rotate-up');
        }
        observer.observe(section);
    });

    // Añadir animaciones ULTRA VARIADAS a las tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        // Ciclo de 4 efectos diferentes
        const effectIndex = index % 4;
        card.classList.add(slideEffects[effectIndex]);
        card.style.transitionDelay = isMobile ? `${index * 0.05}s` : `${index * 0.1}s`;
        observer.observe(card);
    });

    // Añadir animaciones variadas a las tarjetas de intereses
    const interestCards = document.querySelectorAll('.interest-card');
    interestCards.forEach((card, index) => {
        // Alternar entre scale y blur
        if (index % 2 === 0) {
            card.classList.add('scroll-scale');
        } else {
            card.classList.add('scroll-blur');
        }
        card.style.transitionDelay = isMobile ? `${index * 0.08}s` : `${index * 0.15}s`;
        observer.observe(card);
    });

    // Añadir animaciones a los items tecnológicos con fade ultra suave
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.classList.add('scroll-fade-in');
        item.style.transitionDelay = isMobile ? `${index * 0.01}s` : `${index * 0.02}s`;
        observer.observe(item);
    });

    // Añadir animaciones variadas a los items de educación
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach((item, index) => {
        // Alternar entre diferentes efectos de slide
        if (index % 2 === 0) {
            item.classList.add('scroll-diagonal-left');
        } else {
            item.classList.add('scroll-slide-left');
        }
        item.style.transitionDelay = isMobile ? `${index * 0.08}s` : `${index * 0.15}s`;
        observer.observe(item);
    });

    // Añadir animación especial a los títulos de cada sección
    const sectionHeaders = document.querySelectorAll('section h2');
    sectionHeaders.forEach((header, index) => {
        header.classList.add('scroll-rotate-up');
        header.style.transitionDelay = isMobile ? '0.1s' : '0.2s';
        observer.observe(header);
    });

    // Añadir animaciones a los íconos del arte
    const artItems = document.querySelectorAll('.art-item');
    artItems.forEach((item, index) => {
        item.classList.add('scroll-scale');
        item.style.transitionDelay = isMobile ? `${index * 0.05}s` : `${index * 0.1}s`;
        observer.observe(item);
    });

    // Añadir animaciones a los links sociales
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.classList.add('scroll-scale');
        link.style.transitionDelay = isMobile ? `${index * 0.05}s` : `${index * 0.1}s`;
        observer.observe(link);
    });

    // Animación inicial suave del hero overlay
    const heroOverlay = document.querySelector('#SobreMi .content-overlay');
    if (heroOverlay) {
        heroOverlay.style.opacity = '0';
        heroOverlay.style.transform = 'translateY(40px) scale(0.95)';
        heroOverlay.style.filter = 'blur(5px)';
        heroOverlay.style.transition = 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), filter 1.5s cubic-bezier(0.16, 1, 0.3, 1)';

        setTimeout(() => {
            heroOverlay.style.opacity = '1';
            heroOverlay.style.transform = 'translateY(0) scale(1)';
            heroOverlay.style.filter = 'blur(0px)';
        }, 400);
    }

    // Añadir efecto suave al navbar al cargar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-20px)';
        navbar.style.transition = 'opacity 1s ease-out, transform 1s ease-out';

        setTimeout(() => {
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
        }, 200);
    }
}

function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptButton = document.getElementById('acceptCookies');
    const declineButton = document.getElementById('declineCookies');

    if (!cookieBanner || !acceptButton || !declineButton) {
        console.error('No se encontraron los elementos del banner de cookies');
        return;
    }

    // Verificar si el usuario ya respondió sobre las cookies
    const cookieConsent = localStorage.getItem('cookie-consent');

    if (!cookieConsent) {
        // Mostrar banner después de 1 segundo
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    } else if (cookieConsent === 'accepted') {
        enableGoogleAnalytics();
    }

    // Aceptar cookies
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'accepted');
        cookieBanner.classList.remove('show');
        enableGoogleAnalytics();
    });

    // Rechazar cookies
    declineButton.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'declined');
        cookieBanner.classList.remove('show');
        disableGoogleAnalytics();
    });
}

function enableGoogleAnalytics() {
    // Habilitar Google Analytics solo en producción
    var isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.protocol === "file:";

    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted'
        });

        if (!isLocalhost) {
            console.log('Google Analytics habilitado');
        }
    }
}

function disableGoogleAnalytics() {
    // Deshabilitar Google Analytics
    var isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.protocol === "file:";

    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });

        if (!isLocalhost) {
            console.log('Google Analytics deshabilitado');
        }
    }

    // Eliminar cookies de Google Analytics si existen (solo en producción)
    if (!isLocalhost) {
        document.cookie.split(";").forEach(function(c) {
            if (c.trim().startsWith('_ga')) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            }
        });
    }
}

function initializeHamburgerAnimation() {
    // Asegurar que el botón hamburguesa tenga la clase "collapsed" inicialmente
    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbar-toggler');

    if (!toggleButton || !navbarCollapse) return;

    // Inicializar con clase collapsed
    toggleButton.classList.add('collapsed');

    // Escuchar eventos de Bootstrap para sincronizar la animación
    navbarCollapse.addEventListener('show.bs.collapse', function() {
        toggleButton.classList.remove('collapsed');
    });

    navbarCollapse.addEventListener('hide.bs.collapse', function() {
        toggleButton.classList.add('collapsed');
    });
}