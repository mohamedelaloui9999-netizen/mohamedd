document.addEventListener('DOMContentLoaded', () => {

    // 1. نظام التلاشي (Fade Animations Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // 2. Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .card, .product-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });

    // 3. Typing Effect Logic
    const typeText = "مرحباً بك في بُعدي الخاص";
    const typingElement = document.getElementById('typing-text');
    let typeIndex = 0;

    // Clear text initially
    if (typingElement) typingElement.innerHTML = '';

    function typeWriter() {
        if (typeIndex < typeText.length) {
            typingElement.innerHTML += typeText.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 100); // Speed of typing
        } else {
            // Add blinking cursor at the end
            typingElement.innerHTML += '<span class="cursor-blink">|</span>';
        }
    }

    // Start typing effect after a small delay
    setTimeout(typeWriter, 500);

    // 4. Interactive Starfield / Particle Background
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    let width, height;
    let stars = [];

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initStars();
    }

    window.addEventListener('resize', resizeCanvas);

    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Alien colors: neon green, purple, white
            const colors = ['#39ff14', '#b026ff', '#ffffff'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Twinkle effect
            this.opacity += (Math.random() - 0.5) * 0.1;
            if (this.opacity < 0.2) this.opacity = 0.2;
            if (this.opacity > 1) this.opacity = 1;
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initStars() {
        stars = [];
        // Number of stars based on screen size
        const numStars = Math.floor((width * height) / 3000);
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
    }

    function animateStars() {
        ctx.clearRect(0, 0, width, height); // Clear trailing effects
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }

    // Initialize canvas
    resizeCanvas();
    animateStars();
});
