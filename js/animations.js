(function() {
    'use strict';

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    function initHeroAnimation() {
        const heroText = document.querySelector('.hero__text');
        if (!heroText) return;

        if (typeof gsap !== 'undefined') {
            gsap.from(heroText, {
                duration: 1.4,
                y: 70,
                opacity: 0,
                ease: 'power3.out',
                delay: 0.2
            });
        }
    }
    function initScrollIndicator() {
        const indicator = document.getElementById('scrollIndicator');
        if (!indicator || typeof gsap === 'undefined') return;

        gsap.to(indicator, {
            opacity: 0,
            y: 40,
            ease: 'power2.in',
            scrollTrigger: {
                trigger: '#hero',
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 1.2
            }
        });
    }

    function initParallax() {
        if (typeof gsap === 'undefined') return;

        document.querySelectorAll('[data-scroll]').forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
            gsap.set(el, { opacity: 1, y: 0 });
            gsap.to(el, {
                y: -25 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                }
            });
        });
    }
    function initFeatureZoom() {
        if (typeof gsap === 'undefined') return;

        gsap.utils.toArray('.feature-card--image .feature-card__bg').forEach((bg) => {
            gsap.to(bg, {
                scale: 1.12,
                ease: 'none',
                scrollTrigger: {
                    trigger: bg.closest('.feature-card'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.2
                }
            });
        });
    }
    function initRevealAnimations() {
        if (typeof gsap === 'undefined') return;
        const linkCards = document.querySelectorAll('.link-card');
        if (linkCards.length) {
            linkCards.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });

            gsap.from('.link-card', {
                duration: 0.6,
                y: 20,
                scale: 0.98,
                stagger: 0.04,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.section--links',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                onStart: function() {
                    document.querySelectorAll('.link-card').forEach(el => {
                        el.style.opacity = '1';
                        el.style.visibility = 'visible';
                    });
                }
            });
        }
        const eventCards = document.querySelectorAll('.event-card');
        if (eventCards.length) {
            eventCards.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });

            gsap.from('.event-card', {
                duration: 0.7,
                y: 30,
                stagger: 0.06,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.section--events',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                onStart: function() {
                    document.querySelectorAll('.event-card').forEach(el => {
                        el.style.opacity = '1';
                        el.style.visibility = 'visible';
                    });
                }
            });
        }
        const procedureItems = document.querySelectorAll('.procedure-item');
        if (procedureItems.length) {
            procedureItems.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });

            gsap.from('.procedure-item', {
                duration: 0.5,
                x: -15,
                stagger: 0.035,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: '.section--procedures',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                onStart: function() {
                    document.querySelectorAll('.procedure-item').forEach(el => {
                        el.style.opacity = '1';
                        el.style.visibility = 'visible';
                    });
                }
            });
        }
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length) {
            projectCards.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });

            gsap.from('.project-card', {
                duration: 0.7,
                y: 40,
                stagger: 0.06,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.section--projects',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                onStart: function() {
                    document.querySelectorAll('.project-card').forEach(el => {
                        el.style.opacity = '1';
                        el.style.visibility = 'visible';
                    });
                }
            });
        }
    }
    function refreshScrollTrigger() {
        if (typeof ScrollTrigger !== 'undefined') {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 300);
        }
    }
    function init() {
        initHeroAnimation();
        initScrollIndicator();
        initParallax();
        initFeatureZoom();
        initRevealAnimations();
        refreshScrollTrigger();

        window.addEventListener('load', function() {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();