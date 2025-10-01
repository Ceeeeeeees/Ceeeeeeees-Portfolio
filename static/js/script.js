document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año actual
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Toggle para modo blanco y negro
    initializeColorModeToggle();
    
    // Efecto typing para terminal-text (corrigiendo el bug)
    initializeTypingEffect();

    // Matrix effect
    initializeMatrixEffect();
});

function initializeColorModeToggle() {
    // Obtener el botón que ya existe en el HTML
    const toggleButton = document.getElementById('colorModeToggle');
    if (!toggleButton) {
        console.error('No se encontró el botón de toggle de color');
        return;
    }
    
    // Verificar si hay una preferencia guardada
    const isMonochrome = localStorage.getItem('monochrome-mode') === 'true';
    if (isMonochrome) {
        document.body.classList.add('monochrome-mode');
        updateToggleButton(toggleButton, true);
    }
    
    // Event listener para el toggle
    toggleButton.addEventListener('click', function() {
        const isCurrentlyMonochrome = document.body.classList.contains('monochrome-mode');
        
        if (isCurrentlyMonochrome) {
            document.body.classList.remove('monochrome-mode');
            localStorage.setItem('monochrome-mode', 'false');
            updateToggleButton(toggleButton, false);
        } else {
            document.body.classList.add('monochrome-mode');
            localStorage.setItem('monochrome-mode', 'true');
            updateToggleButton(toggleButton, true);
        }
    });
}

function updateToggleButton(button, isMonochrome) {
    if (isMonochrome) {
        button.innerHTML = '<i class="fas fa-eye"></i>';
        button.title = 'Cambiar a modo color';
    } else {
        button.innerHTML = '<i class="fas fa-palette"></i>';
        button.title = 'Cambiar a modo blanco y negro';
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
        // Semi-transparent black overlay for fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];

            // Draw the phrase
            ctx.font = `${drop.size}px "JetBrains Mono", monospace`;
            ctx.fillStyle = `rgba(0, 255, 140, ${drop.opacity})`;
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