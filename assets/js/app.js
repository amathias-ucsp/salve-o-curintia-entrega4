
/* =========================================================
   Salve o Curintia – SPA Client-Side (Entrega4-fix)
   - Router por hash
   - Templates JS
   - Troca de tema com localStorage
   - Máscaras e validação de formulário
   ========================================================= */

// Utils básicos
const $  = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const cleanNumbers = (s="") => (s||"").replace(/\D/g, "");

// Toast simples
function showToast(msg="Ação realizada") {
  const t = document.querySelector(".toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(()=> t.classList.remove("show"), 2200);
}

// Tema (light/dark/contrast)
const THEME_KEY = "soc_theme";
function getTheme(){ return localStorage.getItem(THEME_KEY) || "light"; }
function setTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

// Storage local de voluntários
const STORAGE_VOL = "soc_voluntarios_v1";
function getVoluntarios(){
  return JSON.parse(localStorage.getItem(STORAGE_VOL) || "[]");
}
function addVoluntario(v){
  const arr = getVoluntarios();
  arr.push(v);
  localStorage.setItem(STORAGE_VOL, JSON.stringify(arr));
}

// ======= Templates =======
const Templates = {
  home() {
    return `
    <section class="hero">
      <img src="assets/img/hero.svg" alt="Gradiente roxo">
      <div class="overlay">
        <div>
          <h1>“Aqui é Sofrimento, aqui é Fiel!”</h1>
          <p>Preto e branco na alma, com um toque roxo no coração 💜</p>
          <div style="display:flex;gap:12px;justify-content:center;">
            <a href="#/projetos" data-link class="btn btn-primary">Campanha Natal Sem Jogador</a>
            <a href="#/cadastro" data-link class="btn btn-outline">Virar Voluntário Sofredor</a>
          </div>
        </div>
      </div>
    </section>

    <section class="container cards">
      <div class="grid-12">
        <article class="card col-4 md-col-12">
          <h3>ONG</h3>
          <p>Plataforma fictícia, propósito real: aprender, praticar e rir do sofrimento.</p>
          <div class="badges">
            <span class="badge">ONG</span><span class="badge p">Humor</span>
          </div>
        </article>
        <article class="card col-4 md-col-12">
          <h3>Transparência</h3>
          <p>Relatórios e prestação de contas (de zueira e aprendizado) com integridade.</p>
          <div class="badges">
            <span class="badge">Relatórios</span><span class="badge p">Didático</span>
          </div>
        </article>
        <article class="card col-4 md-col-12">
          <h3>Voluntários</h3>
          <p>Entre para o time dos sofredores do bem — cadastro rápido e certificado (moral)!</p>
          <div class="badges">
            <span class="badge">Cadastro</span><span class="badge p">Doação</span>
          </div>
        </article>
      </div>
    </section>`;
  },

  projetos() {
    const cards = [1,2,3].map(i => `
      <article class="card col-4 md-col-12">
        <h3>Projeto ${i}</h3>
        <p>Impacto estimado: ${37*i} crianças.</p>
        <button class="btn btn-primary" data-open-modal>Doar agora</button>
      </article>
    `).join("");
    return `
    <section class="container" style="margin-top:24px">
      <h2>Campanha Natal Sem Jogador</h2>
      <p>Meta: transformar lágrimas em brinquedos 🎁 — a cada gol perdido, um sorriso garantido.</p>
      <div class="grid-12 cards">${cards}</div>
    </section>

    <div class="modal-backdrop" id="modal-donate">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="doacao-title">
        <div class="modal-header">
          <h3 id="doacao-title">Doação Rápida</h3>
          <button class="modal-close" aria-label="Fechar">Fechar</button>
        </div>
        <p>Obrigado por tentar ajudar. Ainda é uma simulação 😉</p>
      </div>
    </div>`;
  },

  cadastro() {
    return `
    <section class="container" style="margin-top:24px">
      <h2>Cadastro de Voluntário Sofredor</h2>
      <form id="cadastroForm" novalidate>
        <fieldset class="mt-2">
          <legend>Dados Pessoais</legend>

          <div class="field">
            <label for="nomeCompleto">Nome Completo</label>
            <input id="nomeCompleto" name="nomeCompleto" type="text" placeholder="Seu nome" required minlength="3">
            <span class="error-text" hidden></span>
          </div>

          <div class="field">
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" placeholder="voce@email.com" required>
            <span class="error-text" hidden></span>
          </div>

          <div class="field">
            <label for="cpf">CPF</label>
            <input id="cpf" name="cpf" inputmode="numeric" placeholder="000.000.000-00" required>
            <span class="error-text" hidden></span>
          </div>

          <div class="field">
            <label for="telefone">Telefone</label>
            <input id="telefone" name="telefone" inputmode="tel" placeholder="(11) 90000-0000" required>
            <span class="error-text" hidden></span>
          </div>

          <div class="field">
            <label for="nascimento">Data de Nascimento</label>
            <input id="nascimento" name="nascimento" type="date" required>
            <span class="error-text" hidden></span>
          </div>
        </fieldset>

        <fieldset class="mt-2">
          <legend>Endereço</legend>

          <div class="field">
            <label for="cep">CEP</label>
            <input id="cep" name="cep" inputmode="numeric" placeholder="00000-000" required>
            <span class="error-text" hidden></span>
          </div>

          <div class="field">
            <label for="cidade">Cidade</label>
            <input id="cidade" name="cidade" type="text" required>
            <span class="error-text" hidden></span>
          </div>

          <div class="field">
            <label for="estado">Estado</label>
            <select id="estado" name="estado" required>
              <option value="">Selecione...</option>
              ${["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]
                .map(uf => `<option>${uf}</option>`).join("")}
            </select>
            <span class="error-text" hidden></span>
          </div>
        </fieldset>

        <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:16px">
          <button type="reset" class="btn btn-outline">Limpar</button>
          <button type="submit" class="btn btn-primary">Salvar cadastro</button>
        </div>
      </form>
    </section>

    <div class="toast" role="status" aria-live="polite" aria-atomic="true">Cadastro salvo!</div>`;
  }
};

// ======= Validação e máscaras =======
function cpfMask(v) {
  v = cleanNumbers(v).slice(0,11);
  return v
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function phoneMask(v) {
  v = cleanNumbers(v).slice(0,11);
  return v.length <= 10
    ? v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
    : v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}
function cepMask(v) {
  v = cleanNumbers(v).slice(0,8);
  return v.replace(/(\d{5})(\d{0,3})/, "$1-$2");
}

function cpfValid(v){
  const s = cleanNumbers(v);
  if (!s || s.length !== 11 || /^(\d)\1+$/.test(s)) return false;
  let sum = 0;
  for (let i=0;i<9;i++) sum += parseInt(s.charAt(i)) * (10 - i);
  let d1 = 11 - (sum % 11); if (d1 > 9) d1 = 0;
  if (d1 !== parseInt(s.charAt(9))) return false;
  sum = 0;
  for (let i=0;i<10;i++) sum += parseInt(s.charAt(i)) * (11 - i);
  let d2 = 11 - (sum % 11); if (d2 > 9) d2 = 0;
  return d2 === parseInt(s.charAt(10));
}

function validateField(el){
  const name = el.name;
  const val  = (el.value || "").trim();
  let ok = true, msg = "";

  if (el.required && !val) { ok = false; msg = "Campo obrigatório."; }
  else if (name === "email" && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(val)) { ok = false; msg = "E-mail inválido."; }
  else if (name === "cpf" && !cpfValid(val)) { ok = false; msg = "CPF inválido."; }
  else if (name === "telefone" && !/^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/.test(val)) { ok = false; msg = "Telefone inválido."; }
  else if (name === "cep" && !/^\d{5}-?\d{3}$/.test(val)) { ok = false; msg = "CEP inválido."; }

  const err = el.parentElement.querySelector(".error-text");
  if (err) {
    if (ok) {
      el.classList.remove("input-error"); el.classList.add("input-success");
      err.hidden = true; err.textContent = "";
    } else {
      el.classList.remove("input-success"); el.classList.add("input-error");
      err.hidden = false; err.textContent = msg;
    }
  }
  return ok;
}

function attachFormValidation(){
  const form = $("#cadastroForm");
  if (!form) return;

  const refs = {
    nomeCompleto: $("#nomeCompleto"),
    email: $("#email"),
    cpf: $("#cpf"),
    telefone: $("#telefone"),
    nascimento: $("#nascimento"),
    cep: $("#cep"),
    cidade: $("#cidade"),
    estado: $("#estado"),
  };

  refs.cpf.addEventListener("input", (ev)=> ev.target.value = cpfMask(ev.target.value));
  refs.telefone.addEventListener("input", (ev)=> ev.target.value = phoneMask(ev.target.value));
  refs.cep.addEventListener("input", (ev)=> ev.target.value = cepMask(ev.target.value));

  Object.values(refs).forEach(el => el.addEventListener("blur", ()=> validateField(el)));

  form.addEventListener("submit", (ev)=>{
    ev.preventDefault();
    const ok = Object.values(refs).every(validateField);
    if (!ok) { showToast("Corrija os campos destacados."); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    data.cpf      = cleanNumbers(data.cpf);
    data.telefone = cleanNumbers(data.telefone);
    data.cep      = cleanNumbers(data.cep);

    addVoluntario(data);
    form.reset();
    showToast("Cadastro salvo no seu navegador!");
  });
}

// ======= Router =======
const routes = {
  "/": Templates.home,
  "/projetos": Templates.projetos,
  "/cadastro": Templates.cadastro,
};

function getPath(){
  const h = location.hash || "#/";
  const path = h.replace(/^#/, "");
  return routes[path] ? path : "/";
}

function render(){
  const path = getPath();
  const app = $("#app");
  app.innerHTML = routes[path]();

  if (path === "/cadastro") attachFormValidation();
  if (path === "/projetos") {
    const buttons = $$(".btn[data-open-modal]");
    const modal = $("#modal-donate");
    const close = modal ? modal.querySelector(".modal-close") : null;
    buttons.forEach(b => b.addEventListener("click", ()=> modal.classList.add("show")));
    close && close.addEventListener("click", ()=> modal.classList.remove("show"));
  }
}

function initRouter(){
  window.addEventListener("hashchange", render);
  render();
}

// ======= Navbar + Tema =======
function initNavbar(){
  const toggle = $(".nav-toggle");
  const nav = $("#primary-nav");
  if (toggle && nav){
    toggle.addEventListener("click", ()=>{
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("active");
    });
  }

  // Acessibilidade submenu via teclado
  $$(".nav-links > li > a").forEach(a => {
    a.addEventListener("keydown", (ev)=>{
      if (ev.key === "ArrowDown") {
        const sub = a.parentElement.querySelector(".submenu");
        if (sub) {
          sub.style.display = "block";
          const first = sub.querySelector("a");
          first && first.focus();
        }
      }
    });
  });
}

function initTheme(){
  const select = $("#theme-select");
  const current = getTheme();
  document.documentElement.setAttribute("data-theme", current);
  if (select){
    select.value = current;
    select.addEventListener("change", (ev)=> setTheme(ev.target.value));
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  initNavbar();
  initTheme();
  initRouter();
});
