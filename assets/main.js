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
      status.textContent = 'Senden ist gerade nicht möglich. Bitte kontaktieren Sie uns direkt per E-Mail an info@bowert-gmbh.de.';
      status.className = 'form-status err';
    }
  });
}

// Teilen-Button: nutzt die native Teilen-Funktion des Geräts,
// sonst wird der Link in die Zwischenablage kopiert.
document.querySelectorAll('[data-share]').forEach(function (btn) {
  const status = document.querySelector('[data-share-status]');

  function showStatus(text) {
    if (!status) return;
    status.textContent = text;
    window.setTimeout(function () {
      if (status.textContent === text) status.textContent = '';
    }, 4000);
  }

  btn.addEventListener('click', async function () {
    const data = {
      title: btn.dataset.shareTitle || document.title,
      text: btn.dataset.shareText || '',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(data.url);
      showStatus('Link kopiert — jetzt einfach einfügen und weitergeben.');
    } catch (err) {
      showStatus('Link zum Kopieren: ' + data.url);
    }
  });
});
