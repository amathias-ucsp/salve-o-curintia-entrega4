// Pequenas helpers
export const $ = (sel, root=document) => root.querySelector(sel);
export const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
export const onlyDigits = (v='') => (v||'').replace(/\D/g, '');

// Toast
export function showToast(msg='Ação realizada') {
  const t = $('.toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 2200);
}

// Tema
const THEME_KEY = 'soc_theme';
export const getTheme = () => localStorage.getItem(THEME_KEY) || 'light';
export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}
