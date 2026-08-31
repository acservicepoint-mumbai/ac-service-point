// =========================================================
// AC SERVICE POINT — SITE SCRIPTS (Vanilla JS, no framework)
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initStickyNav();
  initBackToTop();
  initHeroSlider();

  // Close dropdown / mobile menu on outside click
  document.addEventListener('click', function (e) {
    var dropdown = document.getElementById('serviceDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
});

/* ---------- Sticky navbar on scroll ---------- */
function initStickyNav() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.classList.add('is-sticky');
    } else {
      navbar.classList.remove('is-sticky');
    }
  });
}

/* ---------- Desktop service dropdown ---------- */
function toggleDropdown() {
  var dropdown = document.getElementById('serviceDropdown');
  if (dropdown) dropdown.classList.toggle('open');
}

/* ---------- Mobile menu ---------- */
function toggleMobileMenu() {
  var menu = document.getElementById('mobileMenu');
  var iconOpen = document.getElementById('menuIconOpen');
  var iconClose = document.getElementById('menuIconClose');
  if (!menu) return;
  var isOpen = menu.classList.toggle('open');
  if (iconOpen && iconClose) {
    iconOpen.style.display = isOpen ? 'none' : 'block';
    iconClose.style.display = isOpen ? 'block' : 'none';
  }
}

function toggleMobileDropdown() {
  var submenu = document.getElementById('mobileSubmenu');
  if (submenu) submenu.classList.toggle('open');
}

/* ---------- Back to top button ---------- */
function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- Hero slider (Home page only) ---------- */
var heroSlideIndex = 0;
var heroSlideTimer = null;

function initHeroSlider() {
  var slider = document.getElementById('heroSlider');
  if (!slider) return;
  var slides = slider.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  heroSlideTimer = setInterval(function () {
    heroSlideIndex = (heroSlideIndex + 1) % slides.length;
    updateHeroSlide();
  }, 5000);
}

function updateHeroSlide() {
  var slider = document.getElementById('heroSlider');
  if (!slider) return;
  var slides = slider.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('#sliderDots button');
  slides.forEach(function (slide, idx) {
    slide.classList.toggle('active', idx === heroSlideIndex);
  });
  dots.forEach(function (dot, idx) {
    dot.classList.toggle('active', idx === heroSlideIndex);
  });
}

function goToSlide(idx) {
  heroSlideIndex = idx;
  updateHeroSlide();
  if (heroSlideTimer) clearInterval(heroSlideTimer);
  var slider = document.getElementById('heroSlider');
  if (slider) {
    var slides = slider.querySelectorAll('.hero-slide');
    heroSlideTimer = setInterval(function () {
      heroSlideIndex = (heroSlideIndex + 1) % slides.length;
      updateHeroSlide();
    }, 5000);
  }
}

/* ---------- Enquiry modal ---------- */
function openEnquiryModal() {
  var modal = document.getElementById('enquiryModal');
  var form = document.getElementById('enquiryForm');
  var success = document.getElementById('enquirySuccess');
  if (form) form.style.display = 'block';
  if (success) success.classList.remove('show');
  if (modal) modal.classList.add('open');
}

function closeEnquiryModal() {
  var modal = document.getElementById('enquiryModal');
  if (modal) modal.classList.remove('open');
}

function closeEnquiryModalOverlay(e) {
  if (e.target && e.target.id === 'enquiryModal') {
    closeEnquiryModal();
  }
}

function submitEnquiry(e) {
  e.preventDefault();
  var form = document.getElementById('enquiryForm');
  var success = document.getElementById('enquirySuccess');
  if (form) form.style.display = 'none';
  if (success) success.classList.add('show');
  setTimeout(function () {
    closeEnquiryModal();
    if (form) {
      form.reset();
      form.style.display = 'block';
    }
    if (success) success.classList.remove('show');
  }, 2000);
}

/* ---------- Contact page form ---------- */
function submitContactForm(e) {
  e.preventDefault();
  var form = document.getElementById('contactForm');
  var success = document.getElementById('contactSuccess');
  if (form) form.style.display = 'none';
  if (success) success.classList.add('show');
  setTimeout(function () {
    if (success) success.classList.remove('show');
    if (form) {
      form.reset();
      form.style.display = 'block';
    }
  }, 3000);
}
