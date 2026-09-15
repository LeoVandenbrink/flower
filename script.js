// Шапка становится непрозрачной при скролле
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });

  // Мобильное меню
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');

  function openMenu() {
    navLinks.classList.add('is-open');
    navBackdrop.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Закрыть меню');
    navToggle.textContent = '✕';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('is-open');
    navBackdrop.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Открыть меню');
    navToggle.textContent = '☰';
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  navBackdrop.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Если экран стал широким (поворот планшета, смена окна) — закрыть мобильное меню
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
  });

  // Фильтр каталога
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.catalog__grid .card');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? 'flex' : 'none';
      });
    });
  });

  // Форма заказа (без бэкенда — просто показываем подтверждение)
  const form = document.getElementById('orderForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.classList.add('is-visible');
    form.reset();
  });