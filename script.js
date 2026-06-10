/* =============================================
   RIYA TUITUI — PORTFOLIO JAVASCRIPT
   Features:
   - Loading screen
   - Typing animation
   - Scroll animations
   - Skills tabs & progress bars
   - Dark/Light mode toggle
   - Animated counters
   - Sticky navbar
   - Active nav link on scroll
   - Contact form
   - Scroll-to-top button
============================================= */

/* ===== LOADING SCREEN ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');

  // Hide loader after 2.2 seconds (matches CSS animation)
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 2200);
});

// Prevent scroll during load
document.body.style.overflow = 'hidden';


/* ===== TYPING ANIMATION ===== */
const typingEl = document.getElementById('typingText');

// Phrases to cycle through
const phrases = [
  'QA Engineer',
  'Bug Hunter',
  'BIM Student',
  'Manual Tester',
  'Detail-Oriented'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 120;
let deletingDelay = 70;
let pauseDelay = 1800;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    // Typing forward
    typingEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      // Finished typing, pause then start deleting
      isDeleting = true;
      setTimeout(typeEffect, pauseDelay);
      return;
    }
    setTimeout(typeEffect, typingDelay);
  } else {
    // Deleting
    typingEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Finished deleting, move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, deletingDelay);
  }
}

// Start typing after loader disappears
setTimeout(typeEffect, 2400);


/* ===== DARK / LIGHT MODE TOGGLE ===== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlEl = document.documentElement;

// Check saved preference
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  // Add transition class
  document.body.classList.add('theme-transitioning');

  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);

  setTimeout(() => {
    document.body.classList.remove('theme-transitioning');
  }, 400);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fa-solid fa-moon';
    themeToggle.title = 'Switch to Light Mode';
  } else {
    themeIcon.className = 'fa-solid fa-sun';
    themeToggle.title = 'Switch to Dark Mode';
  }
}


/* ===== STICKY NAVBAR & ACTIVE LINK HIGHLIGHT ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky shadow
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link based on scroll position
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Scroll to top button visibility
  const scrollTopBtn = document.getElementById('scrollTop');
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});


/* ===== MOBILE HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});


/* ===== SCROLL ANIMATIONS (Intersection Observer) ===== */
const animateTargets = document.querySelectorAll('[data-animate], [data-animate-right]');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.12
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for sibling cards
      const parent = entry.target.parentNode;
      const siblings = parent.querySelectorAll('[data-animate], [data-animate-right]');
      let delay = 0;

      siblings.forEach((sib, i) => {
        if (sib === entry.target) {
          delay = i * 80;
        }
      });

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animateTargets.forEach(target => scrollObserver.observe(target));


/* ===== ANIMATED SKILL BARS ===== */
// Trigger skill bar fill when they become visible
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const targetWidth = fill.getAttribute('data-width');

      // Small delay for visual effect
      setTimeout(() => {
        fill.style.width = targetWidth + '%';
      }, 300);

      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.2 });

skillFills.forEach(fill => skillObserver.observe(fill));


/* ===== SKILLS TABS ===== */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');

    // Remove active from all
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // Activate clicked
    btn.classList.add('active');
    const activeContent = document.getElementById(`tab-${targetTab}`);
    activeContent.classList.add('active');

    // Re-trigger skill bars if switching to testing tab
    if (targetTab === 'testing') {
      const fills = activeContent.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.width = fill.getAttribute('data-width') + '%';
        }, 100);
      });
    }
  });
});


/* ===== ANIMATED COUNTERS ===== */
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      const duration = 1500;
      const step = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target;
        }
      };

      updateCounter();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


/* ===== SCROLL TO TOP BUTTON ===== */
const scrollTopBtn = document.getElementById('scrollTop');

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


/* ===== CONTACT FORM (UI Only) ===== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Simulate form submission with loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Show success message
    formSuccess.classList.add('show');

    // Reset form
    contactForm.reset();

    // Hide success message after 4 seconds
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 4000);
  }, 1500);
});


/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  });
});


/* ===== CV DOWNLOAD PLACEHOLDER ===== */
document.getElementById('downloadCV').addEventListener('click', (e) => {
  e.preventDefault();
  // Show a toast notification
  showToast('CV download will be available soon!', 'info');
});

/* Simple toast notification */
function showToast(message, type = 'info') {
  // Remove existing toasts
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <i class="fa-solid fa-${type === 'info' ? 'circle-info' : 'circle-check'}"></i>
    <span>${message}</span>
  `;

  // Inline styles for the toast
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '80px',
    right: '24px',
    background: 'rgba(0, 212, 170, 0.15)',
    border: '1px solid rgba(0, 212, 170, 0.35)',
    backdropFilter: 'blur(16px)',
    color: '#00d4aa',
    padding: '14px 20px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.88rem',
    fontWeight: '500',
    zIndex: '9999',
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
    animation: 'fadeInUp 0.4s ease',
    fontFamily: "'DM Sans', sans-serif"
  });

  document.body.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


/* ===== CARD HOVER TILT EFFECT ===== */
// Subtle 3D tilt on project cards
const tiltCards = document.querySelectorAll('.project-card, .info-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
});


/* ===== CONSOLE EASTER EGG ===== */
console.log(
  '%c👩‍💻 Riya Tuitui — QA Engineer Portfolio',
  'color: #00d4aa; font-size: 18px; font-weight: bold; font-family: monospace;'
);
console.log(
  '%cBuilt with pure HTML, CSS & JavaScript | riyatuitui87@gmail.com',
  'color: #a0aec0; font-size: 12px; font-family: monospace;'
);
