/**
 * EPSL ECC USAC - Enterprise Level JavaScript
 * Advanced functionality and interactions
 * Version: 2.0
 */

(function() {
    'use strict';

    // ========================================
    // UTILITIES
    // ========================================

    const utils = {
        // Debounce function
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Check if element is in viewport
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Animate number counter
        animateNumber(element, start, end, duration) {
            const range = end - start;
            const increment = range / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                    current = end;
                    clearInterval(timer);
                }
                element.textContent = Math.round(current).toLocaleString();
            }, 16);
        },

        // Format date
        formatDate(date) {
            return new Intl.DateTimeFormat('es-GT', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        }
    };

    // ========================================
    // ENHANCED NAVIGATION
    // ========================================

    class Navigation {
        constructor() {
            this.navbar = document.querySelector('.navbar');
            this.init();
        }

        init() {
            this.handleScroll();
            this.handleActiveLinks();
            this.handleSmoothScroll();
        }

        handleScroll() {
            let lastScroll = 0;
            window.addEventListener('scroll', utils.throttle(() => {
                const currentScroll = window.pageYOffset;

                // Add/remove scrolled class
                if (currentScroll > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }

                // Hide/show navbar on scroll
                if (currentScroll > lastScroll && currentScroll > 500) {
                    this.navbar.style.transform = 'translateY(-100%)';
                } else {
                    this.navbar.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
            }, 100));
        }

        handleActiveLinks() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            window.addEventListener('scroll', utils.throttle(() => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }, 100));
        }

        handleSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href !== '#!') {
                        const target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });
        }
    }

    // ========================================
    // SEARCH FUNCTIONALITY
    // ========================================

    class SearchSystem {
        constructor() {
            this.searchData = this.initSearchData();
            this.init();
        }

        initSearchData() {
            return [
                { title: 'Requisitos de Inscripción', url: 'requisitos-inscripcion-eps-ecc-usac.html', category: 'Requisitos' },
                { title: 'Charla Informativa', url: 'charla-informativa.html', category: 'Proceso' },
                { title: 'Fase 1 - Diagnóstico', url: 'fase1.html', category: 'Fases' },
                { title: 'Fase 2 - Plan de Comunicación', url: 'fase2.html', category: 'Fases' },
                { title: 'Fase 3 - Ejecución', url: 'fase3.html', category: 'Fases' },
                { title: 'Propedéutico Diagnóstico', url: 'propedeutico-diagnostico.html', category: 'Fases' },
                { title: 'Propedéutico Plan de Comunicación', url: 'propedeutico-plan-comunicacion.html', category: 'Fases' },
                { title: 'Equipo EPSL ECC', url: 'equipo-epsl-ecc.html', category: 'Información' },
                { title: 'Contacto', url: 'contact.html', category: 'Información' },
                { title: 'Preguntas Frecuentes', url: 'faqs.html', category: 'Ayuda' },
                { title: 'Guía del Documento', url: 'guia-doc.html', category: 'Recursos' }
            ];
        }

        init() {
            this.createSearchBar();
        }

        createSearchBar() {
            const searchHTML = `
                <div class="search-container mb-5">
                    <i class="bi bi-search search-icon"></i>
                    <input type="text" class="search-input" placeholder="Buscar información sobre el EPSL..." id="siteSearch">
                    <div class="search-results" id="searchResults"></div>
                </div>
            `;

            // Insert search bar after hero section
            const heroSection = document.querySelector('section');
            if (heroSection && heroSection.nextElementSibling) {
                const searchContainer = document.createElement('div');
                searchContainer.className = 'container my-5';
                searchContainer.innerHTML = searchHTML;
                heroSection.parentNode.insertBefore(searchContainer, heroSection.nextElementSibling);

                // Setup search functionality
                const searchInput = document.getElementById('siteSearch');
                const searchResults = document.getElementById('searchResults');

                searchInput.addEventListener('input', utils.debounce((e) => {
                    this.handleSearch(e.target.value, searchResults);
                }, 300));

                // Close results when clicking outside
                document.addEventListener('click', (e) => {
                    if (!searchContainer.contains(e.target)) {
                        searchResults.classList.remove('active');
                    }
                });
            }
        }

        handleSearch(query, resultsContainer) {
            if (query.length < 2) {
                resultsContainer.classList.remove('active');
                return;
            }

            const results = this.searchData.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
            );

            if (results.length > 0) {
                resultsContainer.innerHTML = results.map(item => `
                    <div class="search-result-item" onclick="window.location.href='${item.url}'">
                        <div class="fw-bold">${item.title}</div>
                        <small class="text-muted">${item.category}</small>
                    </div>
                `).join('');
                resultsContainer.classList.add('active');
            } else {
                resultsContainer.innerHTML = `
                    <div class="search-result-item">
                        <div class="text-muted">No se encontraron resultados</div>
                    </div>
                `;
                resultsContainer.classList.add('active');
            }
        }
    }

    // ========================================
    // STATISTICS COUNTER
    // ========================================

    class StatsCounter {
        constructor() {
            this.init();
        }

        init() {
            this.createStatsSection();
        }

        createStatsSection() {
            const statsHTML = `
                <section class="stats-section">
                    <div class="container">
                        <div class="row text-center">
                            <div class="col-md-3 col-6 mb-4 mb-md-0">
                                <div class="stat-card">
                                    <span class="stat-number" data-count="500">0</span>
                                    <div class="stat-label">Graduados</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-6 mb-4 mb-md-0">
                                <div class="stat-card">
                                    <span class="stat-number" data-count="150">0</span>
                                    <div class="stat-label">Estudiantes Activos</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-6">
                                <div class="stat-card">
                                    <span class="stat-number" data-count="25">0</span>
                                    <div class="stat-label">Supervisores</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-6">
                                <div class="stat-card">
                                    <span class="stat-number" data-count="50">0</span>
                                    <div class="stat-label">Instituciones</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;

            // Insert stats after the pillar section
            const sections = document.querySelectorAll('section');
            if (sections.length >= 2) {
                const statsSection = document.createElement('div');
                statsSection.innerHTML = statsHTML;
                sections[1].parentNode.insertBefore(statsSection.firstElementChild, sections[2]);

                // Trigger counter animation when in viewport
                this.animateCounters();
            }
        }

        animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            let animated = false;

            const animateOnScroll = () => {
                if (animated) return;

                counters.forEach(counter => {
                    if (utils.isInViewport(counter)) {
                        animated = true;
                        const target = parseInt(counter.getAttribute('data-count'));
                        utils.animateNumber(counter, 0, target, 2000);
                    }
                });
            };

            window.addEventListener('scroll', utils.throttle(animateOnScroll, 100));
            animateOnScroll(); // Check on load
        }
    }

    // ========================================
    // CHATBOT ASSISTANT
    // ========================================

    class Chatbot {
        constructor() {
            this.isOpen = false;
            this.faqs = this.initFAQs();
            this.init();
        }

        initFAQs() {
            return [
                {
                    question: '¿Cuáles son los requisitos para el EPSL?',
                    answer: 'Necesitas: carta de prácticas, aceptación de prácticas, acta de graduación, cierre de pensum y CALUSAC. Puedes ver más detalles en la sección de requisitos.'
                },
                {
                    question: '¿Cuánto dura el EPSL?',
                    answer: 'El EPSL tiene una duración aproximada de 6 a 12 meses, dependiendo de tu avance en cada fase.'
                },
                {
                    question: '¿Cuáles son las fases del EPSL?',
                    answer: 'El EPSL consta de 3 fases: Fase 1 (Diagnóstico), Fase 2 (Plan de Comunicación) y Fase 3 (Ejecución).'
                },
                {
                    question: '¿Cómo me inscribo?',
                    answer: 'Debes cumplir con los requisitos y presentar tu documentación en Control Académico. Luego asistir a la charla informativa.'
                },
                {
                    question: '¿Puedo trabajar mientras hago el EPSL?',
                    answer: 'Sí, muchos estudiantes trabajan durante el EPSL. Es importante que organices bien tu tiempo.'
                }
            ];
        }

        init() {
            this.createChatbot();
            this.setupEventListeners();
        }

        createChatbot() {
            const chatbotHTML = `
                <div class="chatbot-container">
                    <button class="chatbot-button" id="chatbotToggle" aria-label="Abrir asistente virtual">
                        <i class="bi bi-chat-dots-fill"></i>
                    </button>
                    <div class="chatbot-window" id="chatbotWindow">
                        <div class="chatbot-header">
                            <span>Asistente Virtual EPSL</span>
                            <button class="btn-close btn-close-white" id="chatbotClose" aria-label="Cerrar"></button>
                        </div>
                        <div class="chatbot-body" id="chatbotBody">
                            <div class="chatbot-message bot">
                                ¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?
                            </div>
                            <div class="chatbot-message bot">
                                Puedes preguntarme sobre:
                                <ul class="mt-2 mb-0">
                                    <li>Requisitos</li>
                                    <li>Fases del EPSL</li>
                                    <li>Inscripción</li>
                                    <li>Información general</li>
                                </ul>
                            </div>
                        </div>
                        <div class="chatbot-input-container">
                            <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Escribe tu pregunta..." />
                            <button class="chatbot-send" id="chatbotSend">
                                <i class="bi bi-send-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        }

        setupEventListeners() {
            const toggle = document.getElementById('chatbotToggle');
            const close = document.getElementById('chatbotClose');
            const window = document.getElementById('chatbotWindow');
            const send = document.getElementById('chatbotSend');
            const input = document.getElementById('chatbotInput');

            toggle.addEventListener('click', () => this.toggleChatbot());
            close.addEventListener('click', () => this.toggleChatbot());
            send.addEventListener('click', () => this.sendMessage());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }

        toggleChatbot() {
            const window = document.getElementById('chatbotWindow');
            window.classList.toggle('active');
            this.isOpen = !this.isOpen;

            if (this.isOpen) {
                document.getElementById('chatbotInput').focus();
            }
        }

        sendMessage() {
            const input = document.getElementById('chatbotInput');
            const message = input.value.trim();

            if (!message) return;

            // Add user message
            this.addMessage(message, 'user');
            input.value = '';

            // Find matching FAQ
            setTimeout(() => {
                const response = this.findAnswer(message);
                this.addMessage(response, 'bot');
            }, 500);
        }

        addMessage(text, type) {
            const body = document.getElementById('chatbotBody');
            const messageDiv = document.createElement('div');
            messageDiv.className = `chatbot-message ${type}`;
            messageDiv.textContent = text;
            body.appendChild(messageDiv);
            body.scrollTop = body.scrollHeight;
        }

        findAnswer(question) {
            question = question.toLowerCase();

            // Simple keyword matching
            const matchingFAQ = this.faqs.find(faq =>
                question.includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' ')) ||
                (question.includes('requisito') && faq.question.includes('requisitos')) ||
                (question.includes('fase') && faq.question.includes('fases')) ||
                (question.includes('inscri') && faq.question.includes('inscribo')) ||
                (question.includes('dura') && faq.question.includes('dura')) ||
                (question.includes('trabajo') && faq.question.includes('trabajar'))
            );

            if (matchingFAQ) {
                return matchingFAQ.answer;
            }

            return 'Lo siento, no tengo información específica sobre eso. Te recomiendo visitar nuestra sección de Preguntas Frecuentes o contactar directamente a la coordinación del EPSL.';
        }
    }

    // ========================================
    // NOTIFICATION SYSTEM
    // ========================================

    class NotificationSystem {
        constructor() {
            this.notifications = [];
        }

        show(title, message, type = 'info', duration = 5000) {
            const icons = {
                success: 'bi-check-circle-fill',
                error: 'bi-x-circle-fill',
                warning: 'bi-exclamation-triangle-fill',
                info: 'bi-info-circle-fill'
            };

            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <i class="bi ${icons[type]} notification-icon"></i>
                <div class="notification-content">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close" onclick="this.parentElement.remove()">
                    <i class="bi bi-x"></i>
                </button>
            `;

            document.body.appendChild(notification);
            this.notifications.push(notification);

            // Auto remove after duration
            setTimeout(() => {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }
    }

    // ========================================
    // LAZY LOADING
    // ========================================

    class LazyLoader {
        constructor() {
            this.init();
        }

        init() {
            // Lazy load images
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ========================================
    // BREADCRUMBS
    // ========================================

    class Breadcrumbs {
        constructor() {
            this.init();
        }

        init() {
            const path = window.location.pathname;
            const segments = path.split('/').filter(seg => seg);

            if (segments.length === 0 || path.endsWith('index.html')) return;

            const breadcrumbHTML = this.generateBreadcrumbs(segments);
            const main = document.querySelector('main');

            if (main && breadcrumbHTML) {
                const breadcrumbContainer = document.createElement('div');
                breadcrumbContainer.className = 'container';
                breadcrumbContainer.innerHTML = breadcrumbHTML;
                main.insertBefore(breadcrumbContainer, main.firstChild);
            }
        }

        generateBreadcrumbs(segments) {
            const items = ['<li class="breadcrumb-item"><a href="index.html">Inicio</a></li>'];

            segments.forEach((segment, index) => {
                const isLast = index === segments.length - 1;
                const title = this.formatSegment(segment);

                if (isLast) {
                    items.push(`<li class="breadcrumb-item active" aria-current="page">${title}</li>`);
                } else {
                    items.push(`<li class="breadcrumb-item"><a href="#">${title}</a></li>`);
                }
            });

            return `
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        ${items.join('')}
                    </ol>
                </nav>
            `;
        }

        formatSegment(segment) {
            return segment
                .replace('.html', '')
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
        }
    }

    // ========================================
    // TIMELINE
    // ========================================

    class Timeline {
        constructor() {
            this.init();
        }

        init() {
            this.createTimeline();
        }

        createTimeline() {
            const timelineData = [
                { phase: '1', title: 'Charla Informativa', description: 'Conoce todos los detalles del EPSL' },
                { phase: '2', title: 'Fase 1: Diagnóstico', description: 'Análisis de la situación comunicacional' },
                { phase: '3', title: 'Fase 2: Plan de Comunicación', description: 'Diseño de estrategias comunicacionales' },
                { phase: '4', title: 'Fase 3: Ejecución', description: 'Implementación del plan de comunicación' },
                { phase: '5', title: 'Informe Final', description: 'Elaboración y entrega del informe' },
                { phase: '6', title: 'Graduación', description: '¡Finalización exitosa del EPSL!' }
            ];

            const timelineHTML = `
                <section class="py-5 bg-light" id="timeline-section">
                    <div class="container">
                        <div class="row mb-5">
                            <div class="col-12 text-center">
                                <h2 class="mb-3">Proceso del EPSL</h2>
                                <p class="text-muted">Conoce las etapas que debes completar</p>
                            </div>
                        </div>
                        <div class="timeline">
                            ${timelineData.map((item, index) => `
                                <div class="timeline-item" data-cue="fadeIn" data-delay="${index * 100}">
                                    <div class="timeline-content">
                                        <h4 class="mb-2">${item.title}</h4>
                                        <p class="mb-0 text-muted">${item.description}</p>
                                    </div>
                                    <div class="timeline-marker">
                                        ${item.phase}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;

            // Insert timeline before the company section
            const sections = document.querySelectorAll('section');
            if (sections.length >= 4) {
                const timelineSection = document.createElement('div');
                timelineSection.innerHTML = timelineHTML;
                sections[3].parentNode.insertBefore(timelineSection.firstElementChild, sections[3]);
            }
        }
    }

    // ========================================
    // PERFORMANCE MONITORING
    // ========================================

    class PerformanceMonitor {
        constructor() {
            this.init();
        }

        init() {
            // Log performance metrics
            window.addEventListener('load', () => {
                if (window.performance) {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
                }
            });
        }
    }

    // ========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ========================================

    class AccessibilityEnhancements {
        constructor() {
            this.init();
        }

        init() {
            this.addSkipLink();
            this.enhanceKeyboardNavigation();
            this.addAriaLabels();
        }

        addSkipLink() {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-to-main';
            skipLink.textContent = 'Saltar al contenido principal';
            document.body.insertBefore(skipLink, document.body.firstChild);

            const main = document.querySelector('main');
            if (main) main.id = 'main';
        }

        enhanceKeyboardNavigation() {
            // Trap focus in modal dialogs
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    // Close chatbot if open
                    const chatbotWindow = document.getElementById('chatbotWindow');
                    if (chatbotWindow && chatbotWindow.classList.contains('active')) {
                        chatbotWindow.classList.remove('active');
                    }
                }
            });
        }

        addAriaLabels() {
            // Add aria-labels to interactive elements without labels
            document.querySelectorAll('button:not([aria-label])').forEach(btn => {
                if (!btn.textContent.trim()) {
                    btn.setAttribute('aria-label', 'Button');
                }
            });
        }
    }

    // ========================================
    // ANALYTICS INTEGRATION
    // ========================================

    class Analytics {
        constructor() {
            this.init();
        }

        init() {
            this.trackPageView();
            this.trackEvents();
        }

        trackPageView() {
            // Google Analytics tracking (if GA is loaded)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_view', {
                    page_title: document.title,
                    page_location: window.location.href,
                    page_path: window.location.pathname
                });
            }
        }

        trackEvents() {
            // Track button clicks
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const text = btn.textContent.trim();
                    console.log(`Button clicked: ${text}`);
                    // Send to analytics if available
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'button_click', {
                            button_text: text,
                            page_path: window.location.pathname
                        });
                    }
                });
            });
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeEnterpriseFeatures);
    } else {
        initializeEnterpriseFeatures();
    }

    function initializeEnterpriseFeatures() {
        console.log('🚀 Initializing Enterprise Features...');

        // Initialize all modules
        new Navigation();
        new SearchSystem();
        new StatsCounter();
        new Chatbot();
        new LazyLoader();
        new Breadcrumbs();
        new Timeline();
        new PerformanceMonitor();
        new AccessibilityEnhancements();
        new Analytics();

        // Make notification system globally available
        window.notify = new NotificationSystem();

        // Show welcome notification after 2 seconds
        setTimeout(() => {
            if (window.notify) {
                window.notify.show(
                    'Bienvenido/a al EPSL',
                    '¿Necesitas ayuda? Haz clic en el chat para hablar con nuestro asistente virtual.',
                    'info',
                    8000
                );
            }
        }, 2000);

        console.log('✅ Enterprise Features Loaded Successfully');
    }

    // Export for external use
    window.EPSLEnterprise = {
        NotificationSystem,
        utils
    };

})();
