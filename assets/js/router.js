import { $ } from './dom.js';
import { templates } from './templates.js';
import { attachFormValidation } from './forms.js';

const routes = {
  '/': templates.home,
  '/projetos': templates.projetos,
  '/cadastro': templates.cadastro,
};

function currentPath(){
  const h = location.hash || '#/';
  const p = h.replace(/^#/, '');
  return routes[p] ? p : '/';
}

function mount(path){
  const app = $('#app');
  app.innerHTML = routes[path]();

  if (path==='/cadastro') attachFormValidation();

  if (path==='/projetos'){
    const btns = Array.from(document.querySelectorAll('[data-open-modal]'));
    const modal = document.getElementById('modal-donate');
    const close = modal ? modal.querySelector('.modal-close') : null;
    btns.forEach(b => b.addEventListener('click', ()=> modal.classList.add('show')));
    if (close) close.addEventListener('click', ()=> modal.classList.remove('show'));
  }
}

export function initRouter(){
  window.addEventListener('hashchange', ()=> mount(currentPath()));
  mount(currentPath());
}
