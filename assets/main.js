const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobiles Dropdown-Menü
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    burgerBtn.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.setAttribute('aria-label', 'Menü öffnen');
    });
  });
}

// Kontaktformular: sendet per Formspree (E-Mail-Weiterleitungsdienst, kein eigenes Backend nötig).
const form = document.getElementById('contact-form');

if (form) {
  const status = document.getElementById('form-status');
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykrejgz';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (response.ok) {
        status.textContent = 'Danke! Ihre Nachricht wurde gesendet.';
        status.className = 'form-status ok';
        form.reset();
      } else {
        throw new Error('Senden fehlgeschlagen');
      }
    } catch (err) {
      status.textContent = 'Senden ist gerade nicht möglich. Bitte kontaktieren Sie uns direkt per E-Mail an steffen@kastian.de.';
      status.className = 'form-status err';
    }
  });
}
