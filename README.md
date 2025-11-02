# Salve o Curintia — Entrega 4 (Fix • Client-side SPA)

Versão **legível e funcional** da SPA 100% client-side.
- Router por *hash* (`#/`, `#/projetos`, `#/cadastro`)
- Templates JS
- Troca de tema (Claro / Escuro / Alto contraste) com persistência em `localStorage`
- Formulário com máscaras (CPF, telefone, CEP) e validação
- Acessibilidade: skip-link, aria-live, foco visível

## Site publicado
[Acesse o site pelo GitHub Pages](https://amathias-ucsp.github.io/salve-o-curintia-entrega4/)

## Como executar
Abra `index.html` no navegador (funciona via `file://` e GitHub Pages).

## Estrutura
```
/
├─ index.html
└─ assets/
   ├─ css/
   │  └─ styles.css
   ├─ js/
   │  └─ app.js
   └─ img/
      ├─ logo-salve-o-curintia.svg
      └─ hero.svg
```

## Observações
- Se o tema não mudar, limpe o `localStorage` da página e recarregue.
- Os dados de cadastro são armazenados apenas no seu navegador.
