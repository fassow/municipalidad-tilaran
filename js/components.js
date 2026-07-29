(function($) {
    'use strict';

    function initHeaderScroll() {
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 50) {
                $('.header').addClass('scrolled');
            } else {
                $('.header').removeClass('scrolled');
            }
        });
    }

    function initHamburgerMenu() {
        $('#hamburger').off('click.hamburger');
        $('#hamburger').on('click.hamburger', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            $(this).toggleClass('active');
            $('#mainNav').toggleClass('open');
            $('body').toggleClass('no-scroll');
        });
    }

    function initMobileMegaMenu() {
        $(document).off('click.megaToggle');
        $(document).on('click.megaToggle', '.nav__link--toggle', function(e) {
            if ($(window).width() > 992) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const $link = $(this);
            const $parent = $link.closest('.nav__item--mega');
            const $megaMenu = $parent.find('.mega-menu');
            const isOpen = $megaMenu.hasClass('open');

            $('.nav__item--mega .mega-menu.open').each(function() {
                const $menu = $(this);
                const $parentItem = $menu.closest('.nav__item--mega');
                if ($parentItem[0] !== $parent[0]) {
                    $menu.removeClass('open');
                    $menu.css('display', 'none');
                    $parentItem.find('.nav__link--toggle').removeClass('active');
                }
            });
            
            if (isOpen) {
                $megaMenu.removeClass('open');
                $megaMenu.css('display', 'none');
                $link.removeClass('active');
            } else {
                $megaMenu.addClass('open');
                $megaMenu.css('display', 'block');
                $link.addClass('active');
            }
        });

        $(document).off('click.megaLink');
        $(document).on('click.megaLink', '.mega-menu a', function(e) {
            if ($(window).width() > 992) return;
            
            const $menu = $(this).closest('.mega-menu');
            const $parentItem = $menu.closest('.nav__item--mega');
            
            $menu.removeClass('open');
            $menu.css('display', 'none');
            $parentItem.find('.nav__link--toggle').removeClass('active');
            
            $('#hamburger').removeClass('active');
            $('#mainNav').removeClass('open');
            $('body').removeClass('no-scroll');
        });
    }

    function initCloseMenuOnOutside() {
        $(document).off('click.outsideClose');
        $(document).on('click.outsideClose', function(e) {
            if ($(window).width() > 992) return;
            if (!$('#mainNav').hasClass('open')) return;
            
            if (!$(e.target).closest('.header').length) {
                $('#hamburger').removeClass('active');
                $('#mainNav').removeClass('open');
                $('body').removeClass('no-scroll');
                $('.mega-menu.open').each(function() {
                    const $menu = $(this);
                    $menu.removeClass('open');
                    $menu.css('display', 'none');
                    $menu.closest('.nav__item--mega').find('.nav__link--toggle').removeClass('active');
                });
            }
        });
    }

    function initSearchToggle() {
        $('#searchToggle').off('click.search');
        
        $('#searchToggle').on('click.search', function(e) {
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
        $(document).off('click.searchClose');
        $(document).on('click.searchClose', function(e) {
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
    }
    function initProfileToggle() {
        $('#profileToggle').off('click.profile');
        
        $('#profileToggle').on('click.profile', function() {
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
                    { icon: 'fa-percent', text: 'Exoneraciones', desc: 'Beneficios fiscales', href: '#exoneraciones' }
                ];

                $grid.empty();
                empresarioLinks.forEach(link => {
                    $grid.append(`
                        <a href="${link.href}" class="link-card">
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
                    { icon: 'fa-newspaper', text: 'Noticias', desc: 'Información actual', href: 'pages/informese/noticias/index.html' }
                ];

                $grid.empty();
                ciudadanoLinks.forEach(link => {
                    $grid.append(`
                        <a href="${link.href}" class="link-card">
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
    }
    function initSmoothScroll() {
        $('a[href^="#"]').off('click.smooth');
        
        $('a[href^="#"]').on('click.smooth', function(e) {
            const target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 900, 'cubic-bezier(0.22, 1, 0.36, 1)');
            }
        });
    }
    function initNavMicroInteractions() {
        $('.nav__item--mega').off('mouseenter.mega mouseleave.mega');
        
        $('.nav__item--mega').on({
            mouseenter: function() {
                if ($(window).width() > 992) {
                    $(this).find('.nav__link').css('background', 'rgba(0,0,0,0.04)');
                }
            },
            mouseleave: function() {
                if ($(window).width() > 992) {
                    $(this).find('.nav__link').css('background', 'transparent');
                }
            }
        });
    }
    function init() {
        initHeaderScroll();
        initHamburgerMenu();
        initMobileMegaMenu();
        initCloseMenuOnOutside();
        initSearchToggle();
        initProfileToggle();
        initSmoothScroll();
        initNavMicroInteractions();
    }
    $(document).ready(init);

})(jQuery);