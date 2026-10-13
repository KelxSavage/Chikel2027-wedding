// Mobile navigation
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navlinks');

if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  });
}

// RSVP modal
const modal = document.getElementById('rsvp-modal');
const closeModal = document.querySelector('.close-modal');

if (modal) {
  document.querySelectorAll('.rsvp-open').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      modal.classList.add('open');
    });
  });

  closeModal?.addEventListener('click', () => modal.classList.remove('open'));

  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.classList.remove('open');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') modal.classList.remove('open');
  });
}

// RSVP form message
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    const message = document.getElementById('form-message');
    if (message) {
      message.textContent = `Your draft is ready, ${data.name || 'there'}. No response has been sent or saved yet. Connect an RSVP service to receive submissions.`;
    }
  });
}

// Weekend information shortcut
const weekendInfo = document.getElementById('weekend-info');
if (weekendInfo) {
  weekendInfo.addEventListener('click', () => {
    const faq = document.querySelector('#faq');
    const faqItems = document.querySelectorAll('.faq-item');
    faq?.scrollIntoView({ behavior: 'smooth' });
    if (faqItems[3]) faqItems[3].open = true;
  });
}

// Gallery carousel: arrows, slide count, and automatic sliding
const track = document.getElementById('carousel-track');
const count = document.getElementById('carousel-count');
const prevButton = document.getElementById('carousel-prev');
const nextButton = document.getElementById('carousel-next');

if (track) {
  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  let autoplayTimer;
  let resumeTimer;
  let isPaused = false;
  const AUTOPLAY_DELAY = 3000;
  const RESUME_DELAY = 5000;

  const getSlideStep = () => {
    if (!slides.length) return 0;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 12;
    return slides[0].getBoundingClientRect().width + gap;
  };

  function updateCarouselCount() {
    if (!slides.length || !count) return;
    const trackLeft = track.getBoundingClientRect().left;
    let activeIndex = 0;
    let smallestDistance = Infinity;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        activeIndex = index;
      }
    });

    count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }

  function goToNextSlide() {
    if (slides.length < 2) return;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
    if (atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: getSlideStep(), behavior: 'smooth' });
    }
  }

  function goToPreviousSlide() {
    if (slides.length < 2) return;
    if (track.scrollLeft <= 5) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -getSlideStep(), behavior: 'smooth' });
    }
  }

  function stopAutoplay() {
    window.clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  }

  function startAutoplay() {
    stopAutoplay();
    if (slides.length < 2 || isPaused || document.hidden) return;
    autoplayTimer = window.setInterval(goToNextSlide, AUTOPLAY_DELAY);
  }

  function pauseThenResume() {
    stopAutoplay();
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      isPaused = false;
      startAutoplay();
    }, RESUME_DELAY);
  }

  prevButton?.addEventListener('click', () => {
    goToPreviousSlide();
    pauseThenResume();
  });

  nextButton?.addEventListener('click', () => {
    goToNextSlide();
    pauseThenResume();
  });

  track.addEventListener('scroll', () => window.requestAnimationFrame(updateCarouselCount), { passive: true });

  // Pause while someone is interacting with the gallery, then resume shortly after.
  track.addEventListener('pointerdown', () => {
    isPaused = true;
    stopAutoplay();
    window.clearTimeout(resumeTimer);
  }, { passive: true });

  ['pointerup', 'pointercancel', 'touchend'].forEach((eventName) => {
    track.addEventListener(eventName, pauseThenResume, { passive: true });
  });

  track.addEventListener('mouseenter', () => {
    isPaused = true;
    stopAutoplay();
  });

  track.addEventListener('mouseleave', () => {
    isPaused = false;
    startAutoplay();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  updateCarouselCount();
  startAutoplay();
}

// Registry placeholder
const registryLink = document.getElementById('registry-link');
registryLink?.addEventListener('click', (event) => {
  event.preventDefault();
  alert('Registry details will be added here soon.');
});
