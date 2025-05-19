// Lightbox for gallery
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});

// Fade-in on scroll
document.addEventListener("DOMContentLoaded", function() {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15 };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => { appearOnScroll.observe(fader); });
});

// --- Responsive Bubbles ---
(function() {
    const overlay = document.getElementById('bubble-overlay');
    let lastWidth = window.innerWidth;

    function renderBubbles() {
        overlay.innerHTML = "";
        let width = window.innerWidth;
        // More bubbles for mobile (<=700px)
        let numBubbles = width > 1800 ? 32 :
                         width > 1200 ? 18 :
                         width > 700  ? 8  :
                         /* mobile */   8; // <- change to e.g. 12 for more, or 10
        if (width <= 700) numBubbles = 14; // ← even more on mobile if you want

        for (let i = 0; i < numBubbles; i++) {
            let bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = (Math.random() * 98 + 1) + 'vw';
            let size = Math.random() * 30 + 14;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.animationDelay = (Math.random() * 25) + 's';
            bubble.style.animationDuration = (Math.random() * 23 + 15) + 's';
            bubble.style.opacity = (Math.random() * 0.18 + 0.09).toFixed(2);
            overlay.appendChild(bubble);
        }
    }

    // Only regenerate if width changes (not just height, like when scrolling on mobile)
    window.addEventListener('resize', function() {
        if (Math.abs(window.innerWidth - lastWidth) > 5) {
            lastWidth = window.innerWidth;
            renderBubbles();
        }
    });

    renderBubbles();
})();


// --- Water Drop Ripple Effect (multi-layer) ---
(function() {
    const rippleOverlay = document.getElementById('ripple-overlay');
    document.addEventListener('pointerdown', function(e) {
        if (e.button !== 0) return;
        for (let l = 1; l <= 3; l++) {
            let ripple = document.createElement('div');
            ripple.className = 'ripple-effect' + (l > 1 ? ' ripple-effect-layer' + l : '');
            ripple.style.left = (e.clientX - 40) + 'px';
            ripple.style.top = (e.clientY - 40) + 'px';
            rippleOverlay.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 800);
        }
    });
})();

// --- Make nav bar sticky only after scrolling past banner ---
(function() {
    const nav = document.getElementById('main-nav');
    const banner = document.getElementById('main-header');
    function checkNavSticky() {
        const navOffset = banner.offsetHeight + banner.offsetTop;
        if (window.scrollY >= navOffset - 8) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    }
    window.addEventListener('scroll', checkNavSticky);
    window.addEventListener('resize', checkNavSticky);
    checkNavSticky();
})();
