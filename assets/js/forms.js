import { $, onlyDigits, showToast } from './dom.js';

const STORAGE = 'soc_voluntarios_v1';
export const getVoluntarios = () => JSON.parse(localStorage.getItem(STORAGE) || '[]');
export const addVoluntario = (v) => {
  const arr = getVoluntarios();
  arr.push(v);
  localStorage.setItem(STORAGE, JSON.stringify(arr));
};

// Validações
const RE = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
  telefone: /^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/,
  cep: /^\d{5}-?\d{3}$/
};

export function attachFormValidation(){
  const form = $('#cadastroForm');
  if (!form) return;

  const refs = {
    nomeCompleto: $('#nomeCompleto'),
    email: $('#email'),
    cpf: $('#cpf'),
    telefone: $('#telefone'),
    nascimento: $('#nascimento'),
    cep: $('#cep'),
    cidade: $('#cidade'),
    estado: $('#estado'),
  };

  // Máscaras
  refs.cpf.addEventListener('input', e => e.target.value = maskCPF(e.target.value));
  refs.telefone.addEventListener('input', e => e.target.value = maskTelefone(e.target.value));
  refs.cep.addEventListener('input', e => e.target.value = maskCEP(e.target.value));

  // Blur validations
  Object.values(refs).forEach(el => el.addEventListener('blur', () => validateInput(el)));

  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const ok = Object.values(refs).every(validateInput);
    if (!ok) { showToast('Corrija os campos destacados.'); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    data.cpf = onlyDigits(data.cpf);
    data.telefone = onlyDigits(data.telefone);
    data.cep = onlyDigits(data.cep);

    addVoluntario(data);
    form.reset();
    showToast('Cadastro salvo no seu navegador!');
  });
}

function validateInput(el){
  const name = el.name;
  const val = (el.value || '').trim();
  let valid = true;
  let msg = '';

  if (el.required && !val){ valid=false; msg='Campo obrigatório.'; }
  else if (name==='email' && !RE.email.test(val)){ valid=false; msg='E-mail inválido.'; }
  else if (name==='cpf' && !validaCPF(val)){ valid=false; msg='CPF inválido.'; }
  else if (name==='telefone' && !RE.telefone.test(val)){ valid=false; msg='Telefone inválido.'; }
  else if (name==='cep' && !RE.cep.test(val)){ valid=false; msg='CEP inválido.'; }

  const err = el.parentElement.querySelector('.error-text');
  if (err){
    if (valid){
      el.classList.remove('input-error'); el.classList.add('input-success');
      err.hidden = true; err.textContent='';
    } else {
      el.classList.remove('input-success'); el.classList.add('input-error');
      err.hidden = false; err.textContent = msg;
    }
  }
  return valid;
}

// Máscaras
function maskCPF(v){
  v = onlyDigits(v).slice(0,11);
  return v.replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
function maskTelefone(v){
  v = onlyDigits(v).slice(0,11);
  return v.length<=10
    ? v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    : v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}
function maskCEP(v){
  v = onlyDigits(v).slice(0,8);
  return v.replace(/(\d{5})(\d{0,3})/, '$1-$2');
}

// CPF
function validaCPF(cpf){
  const s = onlyDigits(cpf);
  if (!s || s.length!==11 || /(\d)\1{10}/.test(s)) return false;
  let sum=0; for (let i=0;i<9;i++) sum+=parseInt(s[i])*(10-i);
  let d1 = 11 - (sum%11); if (d1>9) d1=0;
  if (d1!==parseInt(s[9])) return false;
  sum=0; for (let i=0;i<10;i++) sum+=parseInt(s[i])*(11-i);
  let d2 = 11 - (sum%11); if (d2>9) d2=0;
  return d2===parseInt(s[10]);
}
