// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header con efecto de scroll - mantiene el fondo azul claro
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(147, 197, 253, 0.98) 0%, rgba(96, 165, 250, 0.95) 50%, rgba(147, 197, 253, 0.98) 100%)';
        header.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.3), 0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'linear-gradient(135deg, rgba(147, 197, 253, 0.98) 0%, rgba(96, 165, 250, 0.95) 50%, rgba(147, 197, 253, 0.98) 100%)';
        header.style.boxShadow = '0 8px 32px rgba(37, 99, 235, 0.25), 0 4px 16px rgba(0, 0, 0, 0.15)';
    }
});

// Animación de aparición al hacer scroll
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

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Formulario de contacto (versión básica - será reemplazada por la avanzada)
const contactFormBasic = document.getElementById('contactForm');

if (contactFormBasic) {
    contactFormBasic.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactFormBasic);
        const submitButton = contactFormBasic.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Mostrar estado de carga
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        contactFormBasic.classList.add('loading');
        
        // Simular envío (aquí se conectaría con el backend real)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mostrar mensaje de éxito
            showMessage('¡Consulta enviada con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            contactFormBasic.reset();
            
        } catch (error) {
            showMessage('Hubo un error al enviar la consulta. Por favor, intenta nuevamente.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            contactFormBasic.classList.remove('loading');
        }
    });
}

// Función para mostrar mensajes
function showMessage(message, type) {
    // Remover mensajes anteriores
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.querySelector('.contact-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Contador animado para estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Animar contadores cuando estén visibles
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto parallax suave para el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Validación de formulario en tiempo real
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remover clases de error previas
    field.classList.remove('error');
    
    // Validaciones específicas
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    if (fieldName === 'telefono' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    if (field.required && !value) {
        field.classList.add('error');
        return false;
    }
    
    return true;
}

// Agregar estilos CSS para campos con error
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: var(--danger-color) !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(style);

// Lazy loading para imágenes
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    imageObserver.observe(img);
});

// Tooltip para iconos de servicios
document.querySelectorAll('.service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
});

// Efecto de hover para tarjetas de servicios
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Función para copiar información de contacto
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showMessage('Información copiada al portapapeles', 'success');
    }).catch(() => {
        showMessage('No se pudo copiar la información', 'error');
    });
}

// Agregar funcionalidad de copia a elementos de contacto
document.querySelectorAll('.contact-details p').forEach(element => {
    element.style.cursor = 'pointer';
    element.addEventListener('click', () => {
        copyToClipboard(element.textContent);
    });
});

// Función para mostrar/ocultar información adicional
function toggleInfo(element) {
    const content = element.nextElementSibling;
    if (content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
        element.querySelector('i').style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        element.querySelector('i').style.transform = 'rotate(0deg)';
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('Innovaciones Informáticas - Sitio web cargado correctamente');
    
    // Verificar si hay elementos que necesiten inicialización
    const hasContactForm = document.getElementById('contactForm');
    if (hasContactForm) {
        console.log('Formulario de contacto inicializado');
    }
    
    // Verificar navegación
    const hasNavMenu = document.querySelector('.nav-menu');
    if (hasNavMenu) {
        console.log('Navegación inicializada');
    }
}); 

// Efecto carrusel moderno (loop) para subtítulo del logo
document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('typing-text');
    if (!el) return;

    // Soportamos múltiples frases por si queremos ampliar el carrusel
    const phrases = [
        'Vos soñalo, nosotros lo hacemos realidad'
    ];

    let idx = 0;
    const enterDur = 700; // debe coincidir con CSS
    const displayDur = 2200; // tiempo visible
    const exitDur = 600;

    function showNext() {
        // preparar texto
        el.textContent = phrases[idx];
        el.classList.remove('subtitle-exit');
        void el.offsetWidth; // reflow para reiniciar animación si es necesario
        el.classList.add('subtitle-enter');

        // después de mostrar, esperar y retirar
        setTimeout(() => {
            el.classList.remove('subtitle-enter');
            // mantener visible durante displayDur
            setTimeout(() => {
                el.classList.add('subtitle-exit');
                setTimeout(() => {
                    idx = (idx + 1) % phrases.length;
                    showNext();
                }, exitDur);
            }, displayDur);
        }, enterDur);
    }

    // iniciar con pequeña demora
    setTimeout(showNext, 400);
});

// Funcionalidad para formulario avanzado
document.addEventListener('DOMContentLoaded', () => {
    // Contador de caracteres
    const mensajeTextarea = document.getElementById('mensaje');
    const charCount = document.getElementById('char-count');
    
    if (mensajeTextarea && charCount) {
        mensajeTextarea.addEventListener('input', () => {
            const length = mensajeTextarea.value.length;
            charCount.textContent = length;
            
            if (length > 450) {
                charCount.style.color = '#ef4444';
            } else if (length > 400) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = '#64748b';
            }
        });
    }
    
    // Validación en tiempo real mejorada
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateFieldAdvanced(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateFieldAdvanced(input);
            }
        });
    });
    
    // Validación específica para campos requeridos
    const requiredFields = ['nombre', 'email', 'servicio', 'mensaje'];
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => {
                validateFieldAdvanced(field);
            });
        }
    });
});

function validateFieldAdvanced(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + '-error');
    
    // Remover clases de error previas
    field.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Validaciones específicas
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            if (errorElement) errorElement.textContent = 'Email inválido';
            return false;
        }
    }
    
    if (fieldName === 'telefono' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('error');
            if (errorElement) errorElement.textContent = 'Teléfono inválido';
            return false;
        }
    }
    
    if (fieldName === 'mensaje' && value) {
        if (value.length < 10) {
            field.classList.add('error');
            if (errorElement) errorElement.textContent = 'El mensaje debe tener al menos 10 caracteres';
            return false;
        }
    }
    
    if (field.required && !value) {
        field.classList.add('error');
        if (errorElement) errorElement.textContent = 'Este campo es requerido';
        return false;
    }
    
    // Validación específica para campos requeridos
    if (field.required && !value) {
        field.classList.add('error');
        if (errorElement) errorElement.textContent = 'Este campo es requerido';
        return false;
    }
    
    return true;
}

// Mejorar el formulario de contacto existente
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validar todos los campos
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        formInputs.forEach(input => {
            if (!validateFieldAdvanced(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showMessage('Por favor, corrige los errores en el formulario.', 'error');
            return;
        }
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Mostrar estado de carga
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        contactForm.classList.add('loading');
        
        // Simular envío (aquí se conectaría con el backend real)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mostrar mensaje de éxito
            showMessage('¡Consulta enviada con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            contactForm.reset();
            
            // Resetear contador de caracteres
            const charCount = document.getElementById('char-count');
            if (charCount) charCount.textContent = '0';
            
        } catch (error) {
            showMessage('Hubo un error al enviar la consulta. Por favor, intenta nuevamente.', 'error');
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            contactForm.classList.remove('loading');
        }
    });
} 

// Vibración periódica para el WhatsApp flotante
(function() {
    const float = document.getElementById('whatsappFloat');
    if (!float) return;
    setInterval(() => {
        float.classList.add('vibrate');
        setTimeout(() => float.classList.remove('vibrate'), 400);
    }, 12000);
})(); 