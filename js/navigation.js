const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-navigation');
if (toggle && nav) {
  const close = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  document.addEventListener('click', event => { if (!nav.contains(event.target) && !toggle.contains(event.target)) close(); });
}
