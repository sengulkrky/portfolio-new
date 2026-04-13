// typewriter
const phrases = [
    'building for the web.',
    'experimenting with code.',
    'learning something new today.',
    'open to internship opportunities.',
    'passionate about frontend & beyond.'
];

let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
    const word = phrases[pi];
    if (!deleting) {
        tw.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
        tw.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 300); return; }
    }
    setTimeout(type, deleting ? 40 : 70);
}

setTimeout(type, 900);

// custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
    ring.style.width = '48px';
    ring.style.height = '48px';
    ring.style.opacity = '0.9';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    ring.style.width = '34px';
    ring.style.height = '34px';
    ring.style.opacity = '0.5';
  });
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      if (entry.target.classList.contains('skills-grid')) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = getComputedStyle(bar).getPropertyValue('--pct').trim();
        });
      }
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .skills-grid').forEach(el => observer.observe(el));