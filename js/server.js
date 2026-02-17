document.addEventListener('DOMContentLoaded', () => {
  // --- Toggle dos dropdowns do menu principal ---
  const dropdownToggles = document.querySelectorAll('.nav-dropdown > .nav-link');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const parentItem = toggle.parentElement;

      // Fecha outros dropdowns abertos
      document.querySelectorAll('.nav-dropdown.open').forEach(d => {
        if (d !== parentItem) d.classList.remove('open');
      });

      // Alterna o dropdown atual
      parentItem.classList.toggle('open');
    });
  });

  // Fecha todos os dropdowns ao clicar fora
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
  });

  // --- Links dentro dos dropdowns ---
  const dropdownLinks = document.querySelectorAll('.nav-dropdown .dropdown a');

  dropdownLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const page = link.getAttribute('href');
      if (!page) return;

      // Navegação normal
      window.location.href = page;

      // Fecha o dropdown
      link.closest('.nav-dropdown').classList.remove('open');
    });
  });

  // --- Links com data-page para AJAX (opcional) ---
  const ajaxLinks = document.querySelectorAll('.nav-link[data-page]');
  const app = document.getElementById('app');

  ajaxLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (!page) return;

      fetch(page)
        .then(resp => resp.text())
        .then(html => {
          app.innerHTML = html;
        })
        .catch(() => {
          app.innerHTML = '<p>Erro ao carregar conteúdo.</p>';
        });

      // Destaque ativo
      ajaxLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
});
