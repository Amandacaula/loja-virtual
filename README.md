# Loja Virtual

Aplicação de loja virtual em React que consome a [Fake Store API](https://fakestoreapi.com/), exibe os produtos em cards estilizados e permite cadastrar novos produtos.

## Tecnologias

- React (Create React App)
- PrimeReact e PrimeIcons
- PrimeFlex
- Axios

## Funcionalidades

- Listagem de produtos da Fake Store API com o componente `ProductList`
- Exibição de cada produto em um `Card` do PrimeReact através do componente `ProductCard`
- Formulário com validação para adicionar novos produtos à lista
- Busca de produtos por nome ou categoria
- Layout responsivo com PrimeFlex

## Estrutura

```
src/
├── components/
│   ├── Header/
│   ├── ProductCard/
│   ├── ProductForm/
│   └── ProductList/
├── services/
│   └── api.js
└── utils/
    └── formatCurrency.js
```

## Como executar

```bash
npm install
npm start
```

A aplicação ficará disponível em `http://localhost:3000`.
