/**
 * EPSL ECC USAC - MOBILE PREMIUM FEATURES
 * Ultra-professional mobile optimizations
 * Version: 3.0 MOBILE
 */

(function() {
    'use strict';

    // ========================================
    // MOBILE DETECTION
    // ========================================

    const isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileDevice = isMobile.any() || window.innerWidth < 768;

    // ========================================
    // MOBILE MENU ENHANCEMENT
    // ========================================

    class MobileMenuPremium {
        constructor() {
            if (!isMobileDevice) return;
            this.init();
        }

        init() {
            this.enhanceOffcanvas();
            this.addSwipeGesture();
        }

        enhanceOffcanvas() {
            const offcanvas = document.querySelector('.offcanvas');
            if (!offcanvas) return;

            // Add swipe indicator
            const header = offcanvas.querySelector('.offcanvas-header');
            if (header) {
                const indicator = document.createElement('div');
                indicator.className = 'swipe-indicator';
                header.insertBefore(indicator, header.firstChild);
            }

            // Enhance close animation
            const closeBtn = offcanvas.querySelector('.btn-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    offcanvas.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            }
        }

        addSwipeGesture() {
            const offcanvas = document.querySelector('.offcanvas');
            if (!offcanvas) return;

            let startX = 0;
            let currentX = 0;

            offcanvas.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            offcanvas.addEventListener('touchmove', (e) => {
                currentX = e.touches[0].clientX;
                const diff = startX - currentX;

                if (diff > 0) {
                    offcanvas.style.transform = `translateX(-${diff}px)`;
                }
            });

            offcanvas.addEventListener('touchend', () => {
                const diff = startX - currentX;

                if (diff > 100) {
                    // Close offcanvas
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) {
                        bsOffcanvas.hide();
                    }
                }

                offcanvas.style.transform = '';
            });
        }
    }

    // ========================================
    // TOUCH GESTURES PREMIUM
    // ========================================

    class TouchGestures {
        constructor() {
            if (!isTouch) return;
            this.init();
        }

        init() {
            this.addSwipeToCards();
            this.addDoubleTapToZoom();
            this.addLongPress();
        }

        addSwipeToCards() {
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                let startX = 0;
                let startY = 0;

                card.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                });

                card.addEventListener('touchend', (e) => {
                    const endX = e.changedTouches[0].clientX;
                    const endY = e.changedTouches[0].clientY;

                    const diffX = endX - startX;
                    const diffY = endY - startY;

                    // Swipe horizontal
                    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                        if (diffX > 0) {
                            // Swipe right
                            card.style.transform = 'translateX(10px)';
                            setTimeout(() => {
                                card.style.transform = '';
                            }, 200);
                        } else {
                            // Swipe left
                            card.style.transform = 'translateX(-10px)';
                            setTimeout(() => {
                                card.style.transform = '';
                            }, 200);
                        }
                    }
                });
            });
        }

        addDoubleTapToZoom() {
            const images = document.querySelectorAll('img');
            let lastTap = 0;

            images.forEach(img => {
                img.addEventListener('touchend', (e) => {
                    const currentTime = new Date().getTime();
                    const tapLength = currentTime - lastTap;

                    if (tapLength < 300 && tapLength > 0) {
                        // Double tap detected
                        if (img.classList.contains('zoomed')) {
                            img.style.transform = 'scale(1)';
                            img.classList.remove('zoomed');
                        } else {
                            img.style.transform = 'scale(1.5)';
                            img.style.transition = 'transform 0.3s ease';
                            img.classList.add('zoomed');
                        }
                        e.preventDefault();
                    }
                    lastTap = currentTime;
                });
            });
        }

        addLongPress() {
            const buttons = document.querySelectorAll('.btn');
            let pressTimer;

            buttons.forEach(btn => {
                btn.addEventListener('touchstart', (e) => {
                    pressTimer = setTimeout(() => {
                        // Long press detected
                        btn.classList.add('long-pressed');
                        navigator.vibrate && navigator.vibrate(50);

                        setTimeout(() => {
                            btn.classList.remove('long-pressed');
                        }, 200);
                    }, 500);
                });

                btn.addEventListener('touchend', () => {
                    clearTimeout(pressTimer);
                });

                btn.addEventListener('touchmove', () => {
                    clearTimeout(pressTimer);
                });
            });
        }
    }

    // ========================================
    // MOBILE CHATBOT OPTIMIZATION
    // ========================================

    class MobileChatbotOptimizer {
        constructor() {
            this.init();
        }

        init() {
            if (!isMobileDevice) return;

            const chatbotWindow = document.getElementById('chatbotWindow');
            if (!chatbotWindow) return;

            this.optimizeForMobile(chatbotWindow);
            this.addSwipeToClose(chatbotWindow);
        }

        optimizeForMobile(chatbotWindow) {
            // Make it fullscreen on mobile
            chatbotWindow.style.width = '100%';
            chatbotWindow.style.maxWidth = '100%';
            chatbotWindow.style.bottom = '0';
            chatbotWindow.style.right = '0';
            chatbotWindow.style.borderRadius = '20px 20px 0 0';

            // Prevent body scroll when open
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        if (chatbotWindow.classList.contains('active')) {
                            document.body.style.overflow = 'hidden';
                        } else {
                            document.body.style.overflow = '';
                        }
                    }
                });
            });

            observer.observe(chatbotWindow, { attributes: true });
        }

        addSwipeToClose(chatbotWindow) {
            let startY = 0;
            let currentY = 0;

            chatbotWindow.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
            });

            chatbotWindow.addEventListener('touchmove', (e) => {
                currentY = e.touches[0].clientY;
                const diff = currentY - startY;

                if (diff > 0) {
                    chatbotWindow.style.transform = `translateY(${diff}px)`;
                }
            });

            chatbotWindow.addEventListener('touchend', () => {
                const diff = currentY - startY;

                if (diff > 100) {
                    chatbotWindow.classList.remove('active');
                }

                chatbotWindow.style.transform = '';
            });
        }
    }

    // ========================================
    // MOBILE SEARCH OPTIMIZATION
    // ========================================

    class MobileSearchOptimizer {
        constructor() {
            this.init();
        }

        init() {
            const searchInput = document.getElementById('siteSearch');
            if (!searchInput) return;

            this.preventZoom(searchInput);
            this.addVoiceSearch(searchInput);
        }

        preventZoom(input) {
            // Prevent zoom on focus in iOS
            input.addEventListener('focus', () => {
                const viewportMeta = document.querySelector('meta[name="viewport"]');
                if (viewportMeta) {
                    const content = viewportMeta.getAttribute('content');
                    viewportMeta.setAttribute('content', content + ', maximum-scale=1.0');

                    input.addEventListener('blur', () => {
                        viewportMeta.setAttribute('content', content);
                    }, { once: true });
                }
            });
        }

        addVoiceSearch(input) {
            if (!('webkitSpeechRecognition' in window)) return;

            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'es-GT';

            const voiceButton = document.createElement('button');
            voiceButton.className = 'btn btn-link position-absolute';
            voiceButton.style.right = '10px';
            voiceButton.style.top = '50%';
            voiceButton.style.transform = 'translateY(-50%)';
            voiceButton.innerHTML = '<i class="bi bi-mic-fill"></i>';
            voiceButton.setAttribute('aria-label', 'Búsqueda por voz');

            const container = input.closest('.search-container');
            container.style.position = 'relative';
            container.appendChild(voiceButton);

            voiceButton.addEventListener('click', () => {
                recognition.start();
                voiceButton.innerHTML = '<i class="bi bi-mic-mute-fill text-danger"></i>';
            });

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                input.value = transcript;
                input.dispatchEvent(new Event('input'));
                voiceButton.innerHTML = '<i class="bi bi-mic-fill"></i>';
            };

            recognition.onerror = () => {
                voiceButton.innerHTML = '<i class="bi bi-mic-fill"></i>';
            };
        }
    }

    // ========================================
    // MOBILE PERFORMANCE OPTIMIZER
    // ========================================

    class MobilePerformanceOptimizer {
        constructor() {
            this.init();
        }

        init() {
            if (!isMobileDevice) return;

            this.reduceParticles();
            this.optimizeAnimations();
            this.lazyLoadImages();
            this.reduceBlobComplexity();
        }

        reduceParticles() {
            const particlesCanvas = document.getElementById('particles-canvas');
            if (particlesCanvas) {
                particlesCanvas.style.opacity = '0.3';
                // Reduce particle count by half on mobile
                if (window.PremiumFeatures && window.PremiumFeatures.ParticleSystem) {
                    const particleSystem = window.PremiumFeatures.ParticleSystem;
                    if (particleSystem.prototype) {
                        const originalCount = particleSystem.prototype.particleCount;
                        particleSystem.prototype.particleCount = Math.floor(originalCount / 2);
                    }
                }
            }
        }

        optimizeAnimations() {
            // Reduce animation duration on mobile
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    * {
                        animation-duration: 0.3s !important;
                        transition-duration: 0.3s !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        lazyLoadImages() {
            const images = document.querySelectorAll('img:not([loading])');
            images.forEach(img => {
                img.setAttribute('loading', 'lazy');
            });
        }

        reduceBlobComplexity() {
            const blobs = document.querySelectorAll('.blob');
            blobs.forEach(blob => {
                blob.style.filter = 'blur(40px)'; // Reduce from 60px
            });
        }
    }

    // ========================================
    // MOBILE ORIENTATION HANDLER
    // ========================================

    class OrientationHandler {
        constructor() {
            this.init();
        }

        init() {
            window.addEventListener('orientationchange', () => {
                this.handleOrientationChange();
            });
        }

        handleOrientationChange() {
            const orientation = window.orientation;

            if (orientation === 90 || orientation === -90) {
                // Landscape
                document.body.classList.add('landscape-mode');
                document.body.classList.remove('portrait-mode');
            } else {
                // Portrait
                document.body.classList.add('portrait-mode');
                document.body.classList.remove('landscape-mode');
            }

            // Notify user
            if (window.notify) {
                const message = orientation === 90 || orientation === -90 ?
                    'Modo horizontal activado' :
                    'Modo vertical activado';
                window.notify.show('Orientación', message, 'info', 2000);
            }
        }
    }

    // ========================================
    // MOBILE PULL TO REFRESH
    // ========================================

    class PullToRefresh {
        constructor() {
            if (!isMobileDevice) return;
            this.init();
        }

        init() {
            let startY = 0;
            let currentY = 0;
            let isPulling = false;

            const indicator = document.createElement('div');
            indicator.className = 'pull-to-refresh';
            indicator.innerHTML = '<div class="spinner"></div>';
            document.body.insertBefore(indicator, document.body.firstChild);

            window.addEventListener('touchstart', (e) => {
                if (window.scrollY === 0) {
                    startY = e.touches[0].clientY;
                    isPulling = true;
                }
            });

            window.addEventListener('touchmove', (e) => {
                if (!isPulling) return;

                currentY = e.touches[0].clientY;
                const diff = currentY - startY;

                if (diff > 0 && diff < 80) {
                    indicator.style.top = `${diff - 60}px`;
                    indicator.classList.add('visible');
                }
            });

            window.addEventListener('touchend', () => {
                const diff = currentY - startY;

                if (diff > 80) {
                    indicator.style.top = '0';
                    // Refresh page
                    setTimeout(() => {
                        location.reload();
                    }, 500);
                } else {
                    indicator.classList.remove('visible');
                    indicator.style.top = '-60px';
                }

                isPulling = false;
            });
        }
    }

    // ========================================
    // MOBILE BOTTOM NAVIGATION
    // ========================================

    class MobileBottomNav {
        constructor() {
            if (!isMobileDevice) return;
            this.init();
        }

        init() {
            this.createBottomNav();
        }

        createBottomNav() {
            const nav = document.createElement('div');
            nav.className = 'floating-menu-mobile';
            nav.innerHTML = `
                <a href="index.html" class="floating-menu-item active">
                    <i class="bi bi-house-fill"></i>
                    <span>Inicio</span>
                </a>
                <a href="requisitos-inscripcion-eps-ecc-usac.html" class="floating-menu-item">
                    <i class="bi bi-file-text-fill"></i>
                    <span>Requisitos</span>
                </a>
                <a href="faqs.html" class="floating-menu-item">
                    <i class="bi bi-question-circle-fill"></i>
                    <span>FAQs</span>
                </a>
                <a href="contact.html" class="floating-menu-item">
                    <i class="bi bi-envelope-fill"></i>
                    <span>Contacto</span>
                </a>
            `;

            document.body.appendChild(nav);

            // Set active based on current page
            const currentPath = window.location.pathname;
            const menuItems = nav.querySelectorAll('.floating-menu-item');

            menuItems.forEach(item => {
                const href = item.getAttribute('href');
                if (currentPath.includes(href) || (currentPath === '/' && href === 'index.html')) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }

    // ========================================
    // MOBILE VIEWPORT FIX
    // ========================================

    class ViewportFix {
        constructor() {
            this.init();
        }

        init() {
            // Fix 100vh on mobile browsers
            const setViewportHeight = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };

            setViewportHeight();
            window.addEventListener('resize', setViewportHeight);
            window.addEventListener('orientationchange', setViewportHeight);
        }
    }

    // ========================================
    // MOBILE HAPTIC FEEDBACK
    // ========================================

    class HapticFeedback {
        constructor() {
            this.init();
        }

        init() {
            if (!('vibrate' in navigator)) return;

            // Add haptic feedback to buttons
            const buttons = document.querySelectorAll('.btn, button, a.btn');

            buttons.forEach(btn => {
                btn.addEventListener('touchstart', () => {
                    navigator.vibrate(10);
                });
            });

            // Add haptic feedback to form submissions
            const forms = document.querySelectorAll('form');

            forms.forEach(form => {
                form.addEventListener('submit', () => {
                    navigator.vibrate([10, 20, 10]);
                });
            });
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    function initMobileFeatures() {
        if (!isMobileDevice) {
            console.log('Desktop detected - Mobile features skipped');
            return;
        }

        console.log('📱 Initializing Mobile Premium Features...');

        new MobileMenuPremium();
        new TouchGestures();
        new MobileChatbotOptimizer();
        new MobileSearchOptimizer();
        new MobilePerformanceOptimizer();
        new OrientationHandler();
        new PullToRefresh();
        new MobileBottomNav();
        new ViewportFix();
        new HapticFeedback();

        // Add mobile class to body
        document.body.classList.add('mobile-device');

        // Detect iOS
        if (isMobile.iOS()) {
            document.body.classList.add('ios-device');
        }

        // Detect Android
        if (isMobile.Android()) {
            document.body.classList.add('android-device');
        }

        console.log('✅ Mobile Premium Features Loaded Successfully');
    }

    // Wait for DOM and other features
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileFeatures);
    } else {
        // DOM already loaded, but wait for enterprise and premium features
        setTimeout(initMobileFeatures, 100);
    }

    // Export for external use
    window.MobilePremium = {
        isMobile: isMobileDevice,
        isTouch,
        deviceInfo: {
            iOS: isMobile.iOS(),
            Android: isMobile.Android(),
            width: window.innerWidth,
            height: window.innerHeight
        }
    };

})();
