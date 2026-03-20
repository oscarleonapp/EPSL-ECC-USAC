/**
 * EPSL ECC USAC - PREMIUM FEATURES
 * Ultra-professional JavaScript enhancements
 * Version: 3.0 PREMIUM
 */

(function() {
    'use strict';

    // ========================================
    // PREMIUM PRELOADER
    // ========================================

    class PremiumLoader {
        constructor() {
            this.loader = null;
            this.init();
        }

        init() {
            this.createLoader();
            this.startLoading();
        }

        createLoader() {
            const loaderHTML = `
                <div class="premium-loader" id="premiumLoader">
                    <div class="loader-logo">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="3" stroke-dasharray="251.2" stroke-dashoffset="251.2">
                                <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="2s" fill="freeze"/>
                            </circle>
                            <text x="50" y="60" text-anchor="middle" fill="white" font-size="24" font-weight="bold">EPSL</text>
                        </svg>
                    </div>
                    <div class="loader-spinner"></div>
                    <div class="loader-text">CARGANDO EXPERIENCIA PREMIUM</div>
                    <div class="loader-progress">
                        <div class="loader-progress-bar"></div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('afterbegin', loaderHTML);
            this.loader = document.getElementById('premiumLoader');
        }

        startLoading() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.loader.classList.add('hidden');
                    setTimeout(() => {
                        this.loader.remove();
                    }, 500);
                }, 1500);
            });
        }
    }

    // ========================================
    // CUSTOM CURSOR
    // ========================================

    class CustomCursor {
        constructor() {
            if (window.matchMedia('(hover: none)').matches) return;
            this.cursor = null;
            this.follower = null;
            this.init();
        }

        init() {
            this.createCursor();
            this.addEventListeners();
        }

        createCursor() {
            const cursorHTML = `
                <div class="cursor"></div>
                <div class="cursor-follower"></div>
            `;

            document.body.insertAdjacentHTML('beforeend', cursorHTML);
            this.cursor = document.querySelector('.cursor');
            this.follower = document.querySelector('.cursor-follower');
        }

        addEventListeners() {
            let mouseX = 0, mouseY = 0;
            let followerX = 0, followerY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                this.cursor.style.left = mouseX + 'px';
                this.cursor.style.top = mouseY + 'px';
            });

            // Smooth follower animation
            const animateFollower = () => {
                const dx = mouseX - followerX;
                const dy = mouseY - followerY;

                followerX += dx * 0.1;
                followerY += dy * 0.1;

                this.follower.style.left = followerX + 'px';
                this.follower.style.top = followerY + 'px';

                requestAnimationFrame(animateFollower);
            };

            animateFollower();

            // Interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .btn, .card, input, textarea');

            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.cursor.classList.add('active');
                    this.follower.classList.add('active');
                });

                el.addEventListener('mouseleave', () => {
                    this.cursor.classList.remove('active');
                    this.follower.classList.remove('active');
                });
            });
        }
    }

    // ========================================
    // PARTICLES SYSTEM
    // ========================================

    class ParticleSystem {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            this.particles = [];
            this.particleCount = 50;
            this.init();
        }

        init() {
            this.createParticles();
            this.animate();
        }

        createParticles() {
            for (let i = 0; i < this.particleCount; i++) {
                const particle = {
                    x: Math.random() * this.container.offsetWidth,
                    y: Math.random() * this.container.offsetHeight,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1
                };
                this.particles.push(particle);
            }
        }

        animate() {
            // Simple canvas-free particle animation
            const canvas = document.createElement('canvas');
            canvas.id = 'particles-canvas';
            canvas.width = this.container.offsetWidth;
            canvas.height = this.container.offsetHeight;
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.pointerEvents = 'none';
            this.container.appendChild(canvas);

            const ctx = canvas.getContext('2d');

            const draw = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                this.particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
                    ctx.fill();
                });

                requestAnimationFrame(draw);
            };

            draw();
        }
    }

    // ========================================
    // PREMIUM TOOLTIPS
    // ========================================

    class PremiumTooltips {
        constructor() {
            this.tooltips = document.querySelectorAll('[data-tooltip]');
            this.init();
        }

        init() {
            this.tooltips.forEach(element => {
                this.createTooltip(element);
            });
        }

        createTooltip(element) {
            const text = element.getAttribute('data-tooltip');
            const position = element.getAttribute('data-tooltip-position') || 'top';

            const tooltip = document.createElement('div');
            tooltip.className = `tooltip-premium ${position}`;
            tooltip.textContent = text;
            document.body.appendChild(tooltip);

            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(tooltip, element, position);
            });

            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        }

        showTooltip(tooltip, element, position) {
            const rect = element.getBoundingClientRect();

            let top, left;

            switch (position) {
                case 'top':
                    top = rect.top - tooltip.offsetHeight - 10;
                    left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
                    break;
                case 'bottom':
                    top = rect.bottom + 10;
                    left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
                    break;
                case 'left':
                    top = rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2);
                    left = rect.left - tooltip.offsetWidth - 10;
                    break;
                case 'right':
                    top = rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2);
                    left = rect.right + 10;
                    break;
            }

            tooltip.style.top = top + window.scrollY + 'px';
            tooltip.style.left = left + 'px';
            tooltip.classList.add('show');
        }
    }

    // ========================================
    // SCROLL REVEAL PREMIUM
    // ========================================

    class ScrollRevealPremium {
        constructor() {
            this.reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
            this.init();
        }

        init() {
            this.check();
            window.addEventListener('scroll', () => this.check());
        }

        check() {
            const windowHeight = window.innerHeight;

            this.reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < windowHeight - 100) {
                    element.classList.add('active');
                }
            });
        }
    }

    // ========================================
    // CIRCULAR PROGRESS BARS
    // ========================================

    class CircularProgress {
        constructor() {
            this.progressBars = document.querySelectorAll('.circular-progress');
            this.init();
        }

        init() {
            this.progressBars.forEach(bar => {
                this.animateProgress(bar);
            });
        }

        animateProgress(bar) {
            const percentage = parseInt(bar.getAttribute('data-percentage'));
            const circle = bar.querySelector('.progress-circle');
            const number = bar.querySelector('.circular-progress-number');

            const offset = 440 - (440 * percentage) / 100;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            circle.style.strokeDashoffset = offset;
                            this.countUp(number, 0, percentage, 2000);
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(bar);
        }

        countUp(element, start, end, duration) {
            const range = end - start;
            const increment = range / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    current = end;
                    clearInterval(timer);
                }
                element.textContent = Math.round(current) + '%';
            }, 16);
        }
    }

    // ========================================
    // PREMIUM MODAL/LIGHTBOX
    // ========================================

    class PremiumModal {
        constructor() {
            this.modal = null;
            this.triggers = document.querySelectorAll('[data-modal-trigger]');
            this.init();
        }

        init() {
            this.createModal();
            this.addEventListeners();
        }

        createModal() {
            const modalHTML = `
                <div class="premium-modal" id="premiumModal">
                    <button class="premium-modal-close" id="modalClose">
                        <i class="bi bi-x"></i>
                    </button>
                    <div class="premium-modal-content" id="modalContent">
                        <!-- Content will be inserted here -->
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.modal = document.getElementById('premiumModal');
            this.content = document.getElementById('modalContent');
        }

        addEventListeners() {
            this.triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const content = trigger.getAttribute('data-modal-content');
                    this.open(content);
                });
            });

            document.getElementById('modalClose').addEventListener('click', () => {
                this.close();
            });

            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.close();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.close();
                }
            });
        }

        open(content) {
            this.content.innerHTML = content;
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        close() {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ========================================
    // PARALLAX EFFECT
    // ========================================

    class ParallaxEffect {
        constructor() {
            this.parallaxElements = document.querySelectorAll('[data-parallax]');
            this.init();
        }

        init() {
            if (this.parallaxElements.length === 0) return;

            window.addEventListener('scroll', () => {
                this.update();
            });

            this.update();
        }

        update() {
            const scrolled = window.pageYOffset;

            this.parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
    }

    // ========================================
    // CARD 3D TILT EFFECT
    // ========================================

    class Card3DEffect {
        constructor() {
            this.cards = document.querySelectorAll('.card-3d');
            this.init();
        }

        init() {
            this.cards.forEach(card => {
                this.addTiltEffect(card);
            });
        }

        addTiltEffect(card) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = -(x - centerX) / 10;

                const inner = card.querySelector('.card-3d-inner') || card;
                inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                const inner = card.querySelector('.card-3d-inner') || card;
                inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        }
    }

    // ========================================
    // GRADIENT BLOB ANIMATION
    // ========================================

    class GradientBlobs {
        constructor() {
            this.containers = document.querySelectorAll('.blob-container');
            this.init();
        }

        init() {
            this.containers.forEach(container => {
                this.createBlobs(container);
            });
        }

        createBlobs(container) {
            const blob1 = document.createElement('div');
            blob1.className = 'blob blob-1';
            const blob2 = document.createElement('div');
            blob2.className = 'blob blob-2';

            container.appendChild(blob1);
            container.appendChild(blob2);
        }
    }

    // ========================================
    // TYPING EFFECT
    // ========================================

    class TypingEffect {
        constructor(element, texts, speed = 100) {
            this.element = element;
            this.texts = texts;
            this.speed = speed;
            this.textIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.init();
        }

        init() {
            this.type();
        }

        type() {
            const currentText = this.texts[this.textIndex];

            if (this.isDeleting) {
                this.element.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let typeSpeed = this.speed;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.charIndex === currentText.length) {
                typeSpeed = 2000;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // ========================================
    // MAGNETIC BUTTON EFFECT
    // ========================================

    class MagneticButtons {
        constructor() {
            this.buttons = document.querySelectorAll('.btn-magnetic');
            this.init();
        }

        init() {
            this.buttons.forEach(button => {
                this.addMagneticEffect(button);
            });
        }

        addMagneticEffect(button) {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        }
    }

    // ========================================
    // SMOOTH SCROLL WITH MOMENTUM
    // ========================================

    class SmoothScroll {
        constructor() {
            this.current = 0;
            this.target = 0;
            this.ease = 0.075;
            this.init();
        }

        init() {
            document.body.style.height = `${document.body.scrollHeight}px`;

            this.addEventListeners();
            this.animate();
        }

        addEventListeners() {
            window.addEventListener('scroll', () => {
                this.target = window.scrollY;
            });
        }

        animate() {
            this.current += (this.target - this.current) * this.ease;

            if (Math.abs(this.target - this.current) < 0.05) {
                this.current = this.target;
            }

            requestAnimationFrame(() => this.animate());
        }
    }

    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================

    class AnimationObserver {
        constructor() {
            this.elements = document.querySelectorAll('[data-animate]');
            this.init();
        }

        init() {
            const options = {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const animation = entry.target.getAttribute('data-animate');
                        entry.target.style.animation = animation;
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            this.elements.forEach(element => {
                observer.observe(element);
            });
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    function initPremiumFeatures() {
        console.log('🌟 Initializing Premium Features...');

        // Initialize all premium features
        new PremiumLoader();
        new CustomCursor();
        new PremiumTooltips();
        new ScrollRevealPremium();
        new CircularProgress();
        new PremiumModal();
        new ParallaxEffect();
        new Card3DEffect();
        new GradientBlobs();
        new MagneticButtons();
        new AnimationObserver();

        // Initialize particles on hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.classList.add('particles-container');
            heroSection.id = 'hero-particles';
            new ParticleSystem('hero-particles');
        }

        // Initialize typing effect if element exists
        const typingElement = document.querySelector('[data-typing]');
        if (typingElement) {
            const texts = JSON.parse(typingElement.getAttribute('data-typing'));
            new TypingEffect(typingElement, texts);
        }

        console.log('✨ Premium Features Loaded Successfully');
    }

    // Wait for DOM and enterprise features
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPremiumFeatures);
    } else {
        initPremiumFeatures();
    }

    // Make classes globally available
    window.PremiumFeatures = {
        PremiumLoader,
        CustomCursor,
        ParticleSystem,
        PremiumTooltips,
        ScrollRevealPremium,
        CircularProgress,
        PremiumModal,
        ParallaxEffect,
        Card3DEffect,
        GradientBlobs,
        TypingEffect,
        MagneticButtons,
        AnimationObserver
    };

})();
