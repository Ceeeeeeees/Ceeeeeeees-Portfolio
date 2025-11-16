// Tour guiado del portfolio (sin dependencias externas)

const tourSteps = [
    {
        element: '#SobreMi',
        title: '¡Bienvenido! 👋',
        content: 'Este es mi portfolio personal. Soy desarrollador web con enfoque en ML y ciberseguridad.',
        position: 'center'
    },
    {
        element: '#TechStack',
        title: 'Stack Tecnológico 💻',
        content: 'Estas son las tecnologías que domino. Puedes hacer hover sobre cada una para ver su nombre.',
        position: 'top'
    },
    {
        element: '#Educacion',
        title: 'Educación 📚',
        content: 'Mi formación académica y cursos especializados.',
        position: 'top'
    },
    {
        element: '#Experiencia',
        title: 'Experiencia Profesional 💼',
        content: 'Aquí puedes ver mi trayectoria profesional y las responsabilidades que he tenido.',
        position: 'top'
    },
    {
        element: '#Intereses',
        title: 'Mis Intereses 🎨',
        content: 'Más allá del código: música, cine, arte y literatura que me inspiran.',
        position: 'top'
    },
    {
        element: '#Proyectos',
        title: 'Proyectos Destacados 🚀',
        content: 'Algunos de mis proyectos más interesantes en ML, NLP y desarrollo web.',
        position: 'top'
    },
    {
        element: '#Certificaciones',
        title: 'Certificaciones 🎓',
        content: 'Cursos y certificaciones que complementan mi formación técnica.',
        position: 'top'
    },
    {
        element: '#Contacto',
        title: 'Conectemos 📬',
        content: '¿Tienes un proyecto o quieres conversar? ¡Escríbeme!',
        position: 'top'
    }
];

let currentStep = 0;
let tourActive = false;
let overlay = null;
let tooltip = null;

function initializeTour() {
    // Crear botón de tour en el hero section
    const heroSection = document.querySelector('#SobreMi .content-overlay .mt-5');
    if (heroSection) {
        const tourButton = document.createElement('a');
        tourButton.href = '#';
        tourButton.className = 'btn-submit tour-button';
        tourButton.innerHTML = '<i class="fas fa-route"></i> Tour del Portfolio';
        tourButton.style.marginLeft = '1rem';
        tourButton.onclick = (e) => {
            e.preventDefault();
            startTour();
        };
        heroSection.appendChild(tourButton);
    }

    // Listener de teclado para cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && tourActive) {
            endTour();
        }
    });
}

function startTour() {
    if (tourActive) return;

    tourActive = true;
    currentStep = 0;

    // Crear overlay
    overlay = document.createElement('div');
    overlay.className = 'tour-overlay';
    overlay.onclick = endTour;
    document.body.appendChild(overlay);

    // Crear tooltip
    tooltip = document.createElement('div');
    tooltip.className = 'tour-tooltip';
    document.body.appendChild(tooltip);

    // Mostrar primer paso
    showStep(currentStep);

    // Forzar el overlay a aparecer
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
}

function showStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= tourSteps.length) {
        endTour();
        return;
    }

    const step = tourSteps[stepIndex];
    const element = document.querySelector(step.element);

    if (!element) {
        console.error('Element not found:', step.element);
        nextStep();
        return;
    }

    // Scroll suave al elemento
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Highlight del elemento
    element.classList.add('tour-highlight');

    // Remover highlight de otros elementos
    document.querySelectorAll('.tour-highlight').forEach(el => {
        if (el !== element) el.classList.remove('tour-highlight');
    });

    // Actualizar contenido del tooltip
    tooltip.innerHTML = `
        <div class="tour-header">
            <h3>${step.title}</h3>
            <button class="tour-close" onclick="endTour()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="tour-body">
            <p>${step.content}</p>
        </div>
        <div class="tour-footer">
            <div class="tour-progress">
                <span>${stepIndex + 1} de ${tourSteps.length}</span>
                <div class="tour-progress-bar">
                    <div class="tour-progress-fill" style="width: ${((stepIndex + 1) / tourSteps.length) * 100}%"></div>
                </div>
            </div>
            <div class="tour-navigation">
                ${stepIndex > 0 ? '<button class="tour-btn tour-btn-prev" onclick="previousStep()"><i class="fas fa-arrow-left"></i> Anterior</button>' : ''}
                ${stepIndex < tourSteps.length - 1 ?
                    '<button class="tour-btn tour-btn-next" onclick="nextStep()">Siguiente <i class="fas fa-arrow-right"></i></button>' :
                    '<button class="tour-btn tour-btn-finish" onclick="endTour()">Finalizar <i class="fas fa-check"></i></button>'}
            </div>
        </div>
    `;

    // Posicionar tooltip
    setTimeout(() => {
        positionTooltip(element, step.position);
        tooltip.classList.add('show');
    }, 500);
}

function positionTooltip(element, position) {
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top, left;

    if (position === 'center') {
        // Centrado en la pantalla
        top = window.innerHeight / 2 - tooltipRect.height / 2;
        left = window.innerWidth / 2 - tooltipRect.width / 2;
    } else if (position === 'top') {
        // Encima del elemento
        top = rect.top + window.scrollY - tooltipRect.height - 20;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    } else if (position === 'bottom') {
        // Debajo del elemento
        top = rect.bottom + window.scrollY + 20;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    }

    // Ajustar si se sale de la pantalla
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}

function nextStep() {
    currentStep++;
    tooltip.classList.remove('show');
    setTimeout(() => {
        showStep(currentStep);
    }, 300);
}

function previousStep() {
    currentStep--;
    tooltip.classList.remove('show');
    setTimeout(() => {
        showStep(currentStep);
    }, 300);
}

function endTour() {
    if (!tourActive) return;

    tourActive = false;

    // Remover highlight
    document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
    });

    // Remover overlay y tooltip
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
            overlay = null;
        }, 300);
    }

    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => {
            tooltip.remove();
            tooltip = null;
        }, 300);
    }

    // Scroll de vuelta al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hacer funciones globales para los onclick del tooltip
window.nextStep = nextStep;
window.previousStep = previousStep;
window.endTour = endTour;

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTour);
} else {
    initializeTour();
}
