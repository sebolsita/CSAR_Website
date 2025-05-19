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

// Ripple effect on nav links/buttons
document.querySelectorAll('.ripple').forEach(el => {
    el.addEventListener('click', function(e) {
        let ripple = el;
        ripple.classList.remove('active');
        void ripple.offsetWidth;
        ripple.classList.add('active');
    });
});

// Responsive Bubbles
(function() {
    const bubbleContainer = document.getElementById('bubble-container');
    function generateBubbles() {
        let width = window.innerWidth;
        let numBubbles = width > 1800 ? 40 : width > 1200 ? 24 : width > 700 ? 13 : 7;
        bubbleContainer.innerHTML = "";
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
            bubbleContainer.appendChild(bubble);
        }
    }
    generateBubbles();
    window.addEventListener('resize', generateBubbles);
})();

// Fish (always visible, random heights)
(function() {
    const fishSVG = `
    <svg viewBox="0 0 55 32" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="22" cy="16" rx="16" ry="10" fill="#55e0c2"/>
        <polygon points="42,16 55,4 55,28" fill="#16b3c2"/>
        <ellipse cx="30" cy="14" rx="2" ry="2" fill="#222"/>
        <ellipse cx="19" cy="19" rx="2" ry="1" fill="#16b3c2" opacity="0.4"/>
        <ellipse cx="19" cy="13" rx="2" ry="1" fill="#16b3c2" opacity="0.3"/>
    </svg>`;
    const fishContainer = document.getElementById('fish-container');
    const numFish = 5;
    for (let i = 0; i < numFish; i++) {
        let fish = document.createElement('div');
        fish.className = 'fish';
        fish.innerHTML = fishSVG;
        let top = Math.random() * 70 + 10; // 10vh to 80vh
        fish.style.top = top + 'vh';
        fish.style.left = -60 + 'px';
        let duration = Math.random() * 20 + 18;
        fish.style.animationDuration = duration + 's';
        fish.style.animationName = 'fishSwim' + i;
        let sheet = document.styleSheets[0];
        let keyframes =
        `@keyframes fishSwim${i} {
            0% { left: -60px; }
            100% { left: 104vw; }
        }`;
        sheet.insertRule(keyframes, sheet.cssRules.length);
        fish.style.animationDelay = (Math.random() * 16) + 's';
        fishContainer.appendChild(fish);
    }
})();

// Parallax for bottom wave and fish
window.addEventListener('scroll', function() {
    let st = window.scrollY;
    let bottomWave = document.getElementById('wave-bottom');
    if (bottomWave) bottomWave.style.transform = `translateY(${st * -0.18}px)`;
    document.querySelectorAll('.fish').forEach((fish, i) => {
        fish.style.transform = `translateY(${Math.sin((st/80)+i) * 14}px)`;
    });
});
