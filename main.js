/* ================================================================
   ROSÉ & BLOOM EVENTS — Main JavaScript
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Page load animation
  document.body.classList.remove('page-loading');
  document.body.classList.add('page-loaded');

  initHeader();
  initMobileMenu();
  initScrollReveal();
  initTestimonialCarousel();
  initLightbox();
  initSmoothScroll();
  initContactForm();
  initParallax();
  I18n.init();
});

/* ----------------------------------------------------------------
   1. Header Scroll Effect
   ---------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 60) {
      header.classList.add('header--scrolled');
      header.classList.remove('header--transparent');
    } else {
      header.classList.remove('header--scrolled');
      header.classList.add('header--transparent');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* ----------------------------------------------------------------
   2. Mobile Menu
   ---------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.header__menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');
  const body = document.body;

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileNav.classList.remove('active');
      body.style.overflow = '';
    });
  });
}

/* ----------------------------------------------------------------
   3. Scroll Reveal Animations
   ---------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------------
   4. Testimonial Carousel
   ---------------------------------------------------------------- */
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonials__track');
  const dots = document.querySelectorAll('.testimonials__dot');

  if (!track || !dots.length) return;

  let currentSlide = 0;
  const totalSlides = dots.length;
  let autoplayInterval;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('testimonials__dot--active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      goToSlide(i);
      startAutoplay();
    });
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide(Math.min(currentSlide + 1, totalSlides - 1));
      } else {
        goToSlide(Math.max(currentSlide - 1, 0));
      }
    }
    startAutoplay();
  }, { passive: true });

  startAutoplay();
}

/* ----------------------------------------------------------------
   5. Lightbox
   ---------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector('.lightbox__image');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');
  const portfolioItems = document.querySelectorAll('.portfolio__item');

  let currentIndex = 0;
  const images = [];

  portfolioItems.forEach((item, i) => {
    const img = item.querySelector('.portfolio__image');
    if (img) {
      images.push(img.src);
      item.addEventListener('click', () => {
        currentIndex = i;
        openLightbox();
      });
    }
  });

  function openLightbox() {
    lightboxImage.src = images[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentIndex];
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImage.src = images[currentIndex];
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}

/* ----------------------------------------------------------------
   6. Smooth Scroll
   ---------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* ----------------------------------------------------------------
   7. Contact Form
   ---------------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn--primary');
    const originalText = submitBtn.innerHTML;

    // Show loading state (i18n-aware)
    const sendingText = (typeof I18n !== 'undefined' && translations[I18n.currentLang])
      ? translations[I18n.currentLang]['form.sending'] : 'Sending...';
    submitBtn.innerHTML = '<span class="spinner"></span> ' + sendingText;
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      const sentText = (typeof I18n !== 'undefined' && translations[I18n.currentLang])
        ? translations[I18n.currentLang]['form.sent'] : '✓ Message Sent!';
      submitBtn.innerHTML = sentText;
      submitBtn.style.backgroundColor = '#6B8F6B';
      submitBtn.style.borderColor = '#6B8F6B';

      // Reset form
      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.borderColor = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

/* ----------------------------------------------------------------
   8. Parallax Effect
   ---------------------------------------------------------------- */
function initParallax() {
  const banner = document.querySelector('.banner');
  if (!banner) return;

  const bannerImg = banner.querySelector('.banner__image');
  if (!bannerImg) return;

  function handleParallax() {
    const rect = banner.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
      const translateY = (scrollPercent - 0.5) * 60;
      bannerImg.style.transform = `translateY(${translateY}px)`;
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });
}

/* ----------------------------------------------------------------
   9. Counter Animation
   ---------------------------------------------------------------- */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const suffix = element.dataset.suffix || '';

  function update() {
    start += increment;
    if (start >= target) {
      element.textContent = target + suffix;
      return;
    }
    element.textContent = Math.floor(start) + suffix;
    requestAnimationFrame(update);
  }

  update();
}

// Observe counter elements
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count, 10);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});
