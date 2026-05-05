/**
 * Digitalbank Landing Page - JavaScript
 * Handles interactive components like mobile menu toggle
 */

// ========================================
// Mobile Menu Toggle
// ========================================

const hamburger = document.getElementById('hamburger');
const closeMenu = document.getElementById('closeMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

/**
 * Open mobile menu
 */
function openMobileMenu() {
  mobileMenuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

/**
 * Event listeners for mobile menu
 */
if (hamburger) {
  hamburger.addEventListener('click', openMobileMenu);
}

if (closeMenu) {
  closeMenu.addEventListener('click', closeMobileMenu);
}

/**
 * Close menu when clicking on a link
 */
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

/**
 * Close menu when clicking on overlay (outside the menu)
 */
mobileMenuOverlay.addEventListener('click', (e) => {
  if (e.target === mobileMenuOverlay) {
    closeMobileMenu();
  }
});

/**
 * Close menu on Escape key
 */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
    closeMobileMenu();
  }
});

// ========================================
// Smooth Scroll Behavior
// ========================================

/**
 * Smooth scroll to sections
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just # or used for other purposes
    if (href === '#' || href.startsWith('#close') || href.startsWith('#hamburger')) {
      return;
    }

    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      closeMobileMenu();
    }
  });
});

// ========================================
// Active Navigation Link Highlighting
// ========================================

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNav() {
  const navLinks = document.querySelectorAll('.nav-desktop a, .mobile-menu a');
  const sections = document.querySelectorAll('section');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id') || section.getAttribute('class');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// Accessibility Enhancements
// ========================================

/**
 * Keyboard navigation for menu
 */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' && mobileMenuOverlay.classList.contains('active')) {
    const focusableElements = mobileMenuOverlay.querySelectorAll('a, button');
    const currentFocus = document.activeElement;
    const currentIndex = Array.from(focusableElements).indexOf(currentFocus);

    if (currentIndex < focusableElements.length - 1) {
      focusableElements[currentIndex + 1].focus();
    }
  }

  if (e.key === 'ArrowUp' && mobileMenuOverlay.classList.contains('active')) {
    const focusableElements = mobileMenuOverlay.querySelectorAll('a, button');
    const currentFocus = document.activeElement;
    const currentIndex = Array.from(focusableElements).indexOf(currentFocus);

    if (currentIndex > 0) {
      focusableElements[currentIndex - 1].focus();
    }
  }
});

// ========================================
// Intersection Observer for Animations
// ========================================

/**
 * Add fade-in animation to elements as they come into view
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

/**
 * Observe feature cards and article cards for animation
 */
document.querySelectorAll('.feature-card, .article-card').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// ========================================
// Form Validation (for future use)
// ========================================

/**
 * Validate and handle request invite
 */
document.querySelectorAll('.btn-invite').forEach(button => {
  button.addEventListener('click', function(e) {
    // Prevent default only if it's not a form submit
    if (this.tagName === 'A' && this.href === '#') {
      e.preventDefault();
      // Show a message or modal for the invite request
      console.log('Request Invite clicked');
      // You can add a modal or notification here
    }
  });
});

// ========================================
// Performance: Lazy Load Images (if needed)
// ========================================

/**
 * Lazy load images for better performance
 */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// Initialization
// ========================================

console.log('Digitalbank landing page loaded successfully');