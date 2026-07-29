(function() {
    'use strict';

    function initParticles() {
        const container = document.getElementById('canvas-container');
        if (!container) return;

        if (typeof THREE === 'undefined') {
            console.warn('Three.js no está disponible');
            return;
        }

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
            new THREE.Color(0xccddff)
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
            vertexColors: true
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
            sizeAttenuation: true
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

        window.addEventListener('beforeunload', function() {
            renderer.dispose();
        });
    }

    function initRevealObserver() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            });

            revealElements.forEach(el => observer.observe(el));
        } else {
            revealElements.forEach(el => el.classList.add('visible'));
        }
    }

    function initConsoleBranding() {
        console.log('%c Municipalidad de Tilarán', 'font-size: 20px; font-weight: bold; color: #1a1a1a;');
        console.log('%cPortal oficial · Donde el viento cuenta historias', 'font-size: 14px; color: #666;');
        console.log('%cDiseño y desarrollo por Felipe Marchena Rojas', 'font-size: 12px; color: #888;');
    }

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initParticles();
                initRevealObserver();
                initConsoleBranding();
            });
        } else {
            initParticles();
            initRevealObserver();
            initConsoleBranding();
        }
    }

    init();

})();