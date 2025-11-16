// Validación en tiempo real del formulario de contacto

function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const motivo = document.getElementById('motivo');
    const mensaje = document.getElementById('mensaje');
    const submitBtn = document.getElementById('submitBtn');
    const charCount = document.getElementById('char-count');

    // Validación de nombre
    nombre.addEventListener('blur', () => validateNombre());
    nombre.addEventListener('input', () => {
        if (nombre.classList.contains('invalid')) validateNombre();
    });

    // Validación de email
    email.addEventListener('blur', () => validateEmail());
    email.addEventListener('input', () => {
        if (email.classList.contains('invalid')) validateEmail();
    });

    // Validación de motivo
    motivo.addEventListener('change', () => validateMotivo());

    // Validación de mensaje y contador de caracteres
    mensaje.addEventListener('input', () => {
        updateCharCount();
        if (mensaje.classList.contains('invalid')) validateMensaje();
    });
    mensaje.addEventListener('blur', () => validateMensaje());

    // Prevenir envío si hay errores
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isValid = validateAll();

        if (isValid) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            // Enviar el formulario
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showSuccess();
                    form.reset();
                    updateCharCount();
                    clearValidationClasses();
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar mensaje';
            });
        }
    });

    function validateNombre() {
        const value = nombre.value.trim();
        const errorEl = document.getElementById('nombre-error');

        if (value.length === 0) {
            showError(nombre, errorEl, 'El nombre es requerido');
            return false;
        } else if (value.length < 3) {
            showError(nombre, errorEl, 'El nombre debe tener al menos 3 caracteres');
            return false;
        } else {
            showValid(nombre, errorEl);
            return true;
        }
    }

    function validateEmail() {
        const value = email.value.trim();
        const errorEl = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value.length === 0) {
            showError(email, errorEl, 'El email es requerido');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(email, errorEl, 'El email no es válido');
            return false;
        } else {
            showValid(email, errorEl);
            return true;
        }
    }

    function validateMotivo() {
        const value = motivo.value;
        const errorEl = document.getElementById('motivo-error');

        if (value === '') {
            showError(motivo, errorEl, 'Por favor selecciona un motivo');
            return false;
        } else {
            showValid(motivo, errorEl);
            return true;
        }
    }

    function validateMensaje() {
        const value = mensaje.value.trim();
        const errorEl = document.getElementById('mensaje-error');

        if (value.length === 0) {
            showError(mensaje, errorEl, 'El mensaje es requerido');
            return false;
        } else if (value.length < 20) {
            showError(mensaje, errorEl, `El mensaje debe tener al menos 20 caracteres (${value.length}/20)`);
            return false;
        } else if (value.length > 500) {
            showError(mensaje, errorEl, 'El mensaje no puede exceder 500 caracteres');
            return false;
        } else {
            showValid(mensaje, errorEl);
            return true;
        }
    }

    function validateAll() {
        const validNombre = validateNombre();
        const validEmail = validateEmail();
        const validMotivo = validateMotivo();
        const validMensaje = validateMensaje();

        return validNombre && validEmail && validMotivo && validMensaje;
    }

    function showError(input, errorEl, message) {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }

    function showValid(input, errorEl) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorEl.textContent = '';
        errorEl.classList.remove('show');
    }

    function clearValidationClasses() {
        [nombre, email, motivo, mensaje].forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        document.querySelectorAll('.form-error').forEach(el => {
            el.textContent = '';
            el.classList.remove('show');
        });
    }

    function updateCharCount() {
        const count = mensaje.value.length;
        charCount.textContent = count;

        if (count > 500) {
            charCount.parentElement.style.color = '#ff4444';
        } else if (count > 400) {
            charCount.parentElement.style.color = '#ffaa00';
        } else {
            charCount.parentElement.style.color = '';
        }
    }

    function showSuccess() {
        const successEl = document.getElementById('form-success');
        successEl.style.display = 'block';

        setTimeout(() => {
            successEl.style.display = 'none';
        }, 5000);
    }

    // Inicializar contador
    updateCharCount();
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFormValidation);
} else {
    initializeFormValidation();
}
