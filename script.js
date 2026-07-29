$(document).ready(function() {
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    $('#hamburger').on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).toggleClass('active');
        $('#mainNav').toggleClass('open');
        $('body').toggleClass('no-scroll');
    });
    $(document).on('click', function(e) {
        if ($('#mainNav').hasClass('open') && $(window).width() <= 992) {
            if (!$(e.target).closest('.header').length && 
                !$(e.target).closest('#mainNav').length && 
                !$(e.target).closest('#hamburger').length) {
                
                $('#hamburger').removeClass('active');
                $('#mainNav').removeClass('open');
                $('body').removeClass('no-scroll');
            }
        }
    });
    $('.nav__link--toggle').on('click', function(e) {
        if ($(window).width() <= 992) {
            e.preventDefault();
            e.stopPropagation();
            
            const $parent = $(this).closest('.nav__item--mega');
            const $megaMenu = $parent.find('.mega-menu');
            const isOpen = $megaMenu.hasClass('open');
            
            $('.mega-menu.open').each(function() {
                if ($(this).closest('.nav__item--mega')[0] !== $parent[0]) {
                    const $menu = $(this);
                    $menu.css({
                        'max-height': $menu[0].scrollHeight + 'px',
                        'opacity': '1'
                    });
                    $menu.animate({
                        'max-height': '0px',
                        'opacity': '0'
                    }, 300, function() {
                        $menu.removeClass('open');
                        $menu.css({
                            'max-height': '',
                            'opacity': '',
                            'display': 'none'
                        });
                    });
                }
            });
            
            if (isOpen) {
                $megaMenu.css({
                    'max-height': $megaMenu[0].scrollHeight + 'px',
                    'opacity': '1'
                });
                $megaMenu.animate({
                    'max-height': '0px',
                    'opacity': '0'
                }, 300, function() {
                    $megaMenu.removeClass('open');
                    $megaMenu.css({
                        'max-height': '',
                        'opacity': '',
                        'display': 'none'
                    });
                });
            } else {
                $megaMenu.addClass('open');
                $megaMenu.css({
                    'display': 'block',
                    'max-height': '0px',
                    'opacity': '0'
                });
                void $megaMenu[0].offsetHeight;
                $megaMenu.animate({
                    'max-height': $megaMenu[0].scrollHeight + 'px',
                    'opacity': '1'
                }, 400, 'swing', function() {
                    $megaMenu.css('max-height', '');
                });
            }
        }
    });

    $('.mega-menu a').on('click', function() {
        if ($(window).width() <= 992) {
            const $menu = $(this).closest('.mega-menu');
            $menu.css({
                'max-height': $menu[0].scrollHeight + 'px',
                'opacity': '1'
            });
            $menu.animate({
                'max-height': '0px',
                'opacity': '0'
            }, 300, function() {
                $menu.removeClass('open');
                $menu.css({
                    'max-height': '',
                    'opacity': '',
                    'display': 'none'
                });
            });
        }
    });

    $('#searchToggle').on('click', function(e) {
        e.stopPropagation();
        const $overlay = $('#searchOverlay');
        if ($overlay.hasClass('open')) {
            $overlay.animate({
                'opacity': '0',
                'transform': 'translateY(-8px) scale(0.96)'
            }, 250, function() {
                $overlay.removeClass('open');
                $overlay.css({
                    'opacity': '',
                    'transform': ''
                });
            });
        } else {
            $overlay.addClass('open');
            $overlay.css({
                'opacity': '0',
                'transform': 'translateY(-8px) scale(0.96)'
            });
            void $overlay[0].offsetHeight;
            $overlay.animate({
                'opacity': '1',
                'transform': 'translateY(0) scale(1)'
            }, 300);
        }
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.header__actions').length && !$(e.target).closest('.search-overlay').length) {
            const $overlay = $('#searchOverlay');
            if ($overlay.hasClass('open')) {
                $overlay.animate({
                    'opacity': '0',
                    'transform': 'translateY(-8px) scale(0.96)'
                }, 250, function() {
                    $overlay.removeClass('open');
                    $overlay.css({
                        'opacity': '',
                        'transform': ''
                    });
                });
            }
        }
    });

    $('#profileToggle').on('click', function() {
        const $title = $('.section--links .section__title');
        const $grid = $('#linksGrid');
        
        if ($title.text().includes('Ciudadano')) {
            $title.html('<i class="fas fa-user-tie"></i> Enlaces Empresario');
            
            const empresarioLinks = [
                { icon: 'fa-credit-card', text: 'Pagos en línea', desc: 'Impuestos y servicios', href: 'pages/tramites/pagos-en-linea/index.html' },
                { icon: 'fa-store', text: 'Patente comercial', desc: 'Licencias y permisos', href: '#patente' },
                { icon: 'fa-file-invoice', text: 'Declaración de ISBI', desc: 'Bienes inmuebles', href: '#isbi' },
                { icon: 'fa-handshake', text: 'Registro proveedores', desc: 'Inscripción', href: '#proveedores' },
                { icon: 'fa-building', text: 'Uso de suelo', desc: 'Planificación', href: '#suelo' },
                { icon: 'fa-hard-hat', text: 'Construcción', desc: 'Permisos de obra', href: '#construccion' },
                { icon: 'fa-file-alt', text: 'Trámites fiscales', desc: 'Declaraciones', href: '#fiscales' },
                { icon: 'fa-percent', text: 'Exoneraciones', desc: 'Beneficios fiscales', href: '#exoneraciones' },
            ];
            
            $grid.empty();
            empresarioLinks.forEach(link => {
                $grid.append(`
                    <a href="${link.href}" class="link-card ${link.text === 'Pagos en línea' ? 'link-card--primary' : ''}">
                        <i class="fas ${link.icon}"></i>
                        <span>${link.text}</span>
                        <small>${link.desc}</small>
                    </a>
                `);
            });
            
        } else {
            $title.html('<i class="fas fa-users"></i> Enlaces Ciudadano');
            
            const ciudadanoLinks = [
                { icon: 'fa-credit-card', text: 'Pagos en línea', desc: 'Impuestos y servicios', href: 'pages/tramites/pagos-en-linea/index.html' },
                { icon: 'fa-file-alt', text: 'Trámites en línea', desc: 'Gestiones digitales', href: 'pages/tramites/index.html' },
                { icon: 'fa-video', text: 'Sesiones en vivo', desc: 'Transmisiones', href: 'pages/sesiones/transmisiones-en-vivo.html' },
                { icon: 'fa-leaf', text: 'Gestión ambiental', desc: 'Sostenibilidad', href: 'pages/tramites/gestion-ambiental.html' },
                { icon: 'fa-tools', text: 'Proyectos', desc: 'Obras y desarrollo', href: 'pages/informese/proyectos/index.html' },
                { icon: 'fa-calendar-alt', text: 'Calendario', desc: 'Eventos y actividades', href: 'pages/informese/actividades/calendario-eventos.html' },
                { icon: 'fa-dove', text: 'Aniversario', desc: 'Celebración cantonal', href: 'pages/canton/tradiciones/aniversario-cantonal.html' },
                { icon: 'fa-horse-head', text: 'Desfile de Boyeros', desc: 'Tradición', href: 'pages/canton/tradiciones/desfile-boyeros-tierras-morenas.html' },
                { icon: 'fa-headset', text: 'Atención al ciudadano', desc: 'Consultas y soporte', href: 'pages/contactenos/index.html' },
                { icon: 'fa-newspaper', text: 'Noticias', desc: 'Información actual', href: 'pages/informese/noticias/index.html' },
            ];
            
            $grid.empty();
            ciudadanoLinks.forEach(link => {
                $grid.append(`
                    <a href="${link.href}" class="link-card ${link.text === 'Pagos en línea' ? 'link-card--primary' : ''}">
                        <i class="fas ${link.icon}"></i>
                        <span>${link.text}</span>
                        <small>${link.desc}</small>
                    </a>
                `);
            });
        }
        
        setTimeout(() => {
            document.querySelectorAll('.link-card').forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 100);
    });

    (function initParticles() {
        const container = document.getElementById('canvas-container');
        if (!container) return;

        let width = container.clientWidth;
        let height = container.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x08080a);

        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 28;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const count = 2200;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        const colorPalette = [
            new THREE.Color(0x4a7aff),
            new THREE.Color(0x6c8cff),
            new THREE.Color(0x88aaff),
            new THREE.Color(0xaaccff),
            new THREE.Color(0xccddff),
        ];

        for (let i = 0; i < count; i++) {
            const radius = 35 + Math.random() * 25;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI * 2;

            positions[i * 3] = Math.sin(theta) * Math.cos(phi) * radius;
            positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * radius * 0.6;
            positions[i * 3 + 2] = Math.cos(theta) * radius * 0.5;

            sizes[i] = Math.random() * 1.8 + 0.3;

            const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.35,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
            vertexColors: true,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const starCount = 800;
        const starPos = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            starPos[i * 3] = (Math.random() - 0.5) * 120;
            starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
            starPos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20;
        }

        const starGeo = new THREE.BufferGeometry();
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

        const starMat = new THREE.PointsMaterial({
            color: 0x88aaff,
            size: 0.08,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
        });

        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            targetX = x * 0.3;
            targetY = y * 0.2;
        });

        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const x = (touch.clientX / window.innerWidth) * 2 - 1;
                const y = -(touch.clientY / window.innerHeight) * 2 + 1;
                targetX = x * 0.3;
                targetY = y * 0.2;
            }
        }, { passive: true });

        let time = 0;

        function animate() {
            requestAnimationFrame(animate);

            time += 0.001;

            mouseX += (targetX - mouseX) * 0.05;
            mouseY += (targetY - mouseY) * 0.05;

            particles.rotation.y += 0.0018;
            particles.rotation.x += 0.0006;
            particles.rotation.z += 0.0003;

            particles.rotation.y += mouseX * 0.0006;
            particles.rotation.x += mouseY * 0.0004;

            const waveX = Math.sin(time * 0.6) * 0.15;
            const waveY = Math.cos(time * 0.4) * 0.1;
            particles.position.x = waveX;
            particles.position.y = waveY;

            stars.rotation.y += 0.0004;
            stars.rotation.x += 0.0001;

            const pulse = 0.6 + Math.sin(time * 0.5) * 0.15;
            material.opacity = pulse;

            renderer.render(scene, camera);
        }

        animate();

        function resizeRenderer() {
            const w = container.clientWidth;
            const h = container.clientHeight;

            if (w > 0 && h > 0) {
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);

                if (w < 768) {
                    camera.position.z = 35;
                } else {
                    camera.position.z = 28;
                }
                camera.lookAt(0, 0, 0);
            }
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeRenderer, 100);
        });

        resizeRenderer();
        window.addEventListener('orientationchange', () => {
            setTimeout(resizeRenderer, 300);
        });

    })();
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.hero__text', {
            duration: 1.4,
            y: 70,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.2,
        });

        gsap.to('#scrollIndicator', {
            opacity: 0,
            y: 40,
            ease: 'power2.in',
            scrollTrigger: {
                trigger: '#hero',
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 1.2,
            },
        });

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
                    scrub: 2,
                },
            });
        });

        gsap.utils.toArray('.feature-card--image .feature-card__bg').forEach((bg) => {
            gsap.to(bg, {
                scale: 1.12,
                ease: 'none',
                scrollTrigger: {
                    trigger: bg.closest('.feature-card'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.2,
                },
            });
        });

        document.querySelectorAll('.link-card').forEach(el => {
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
                toggleActions: 'play none none none',
            },
            onStart: function() {
                document.querySelectorAll('.link-card').forEach(el => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                });
            }
        });

        document.querySelectorAll('.event-card').forEach(el => {
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
                toggleActions: 'play none none none',
            },
            onStart: function() {
                document.querySelectorAll('.event-card').forEach(el => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                });
            }
        });

        document.querySelectorAll('.procedure-item').forEach(el => {
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
                toggleActions: 'play none none none',
            },
            onStart: function() {
                document.querySelectorAll('.procedure-item').forEach(el => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                });
            }
        });

        document.querySelectorAll('.project-card').forEach(el => {
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
                toggleActions: 'play none none none',
            },
            onStart: function() {
                document.querySelectorAll('.project-card').forEach(el => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                });
            }
        });

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);

        window.addEventListener('load', function() {
            ScrollTrigger.refresh();
        });
    }
    $('.nav__item--mega').on('mouseenter', function() {
        if ($(window).width() > 992) {
            $(this).find('.nav__link').css('background', 'rgba(0,0,0,0.04)');
        }
    }).on('mouseleave', function() {
        if ($(window).width() > 992) {
            $(this).find('.nav__link').css('background', 'transparent');
        }
    });

    // --- CORREGIDO: Manejo de enlaces con href="#" ---
    $('a[href^="#"]').on('click', function(e) {
        var href = $(this).attr('href');
        if (href === '#') {
            e.preventDefault();
            return;
        }
        var target = $(href);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80,
            }, 900, 'cubic-bezier(0.22, 1, 0.36, 1)');
        }
    });

    console.log('Municipalidad de Tilarán Portal');
});