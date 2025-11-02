// SITELAR WEBSITE INTERACTIONS 🔨🤖🔧

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Tiny animation on scroll for service cards
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.s-card').forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(40px)';
  observer.observe(card);
});

// Animate them when visible
const style = document.createElement('style');
style.textContent = `
.s-card.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: all 0.7s ease-out;
}`;
document.head.appendChild(style);
