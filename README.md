# AngularCrud - Cadastro de Clientes

Esse projeto foi gerado via [Angular CLI](https://github.com/angular/angular-cli) versão 17.0.2.

## Funcionalidades

O sistema possui as seguintes funcionalidades:

- Tela de cadastro de cliente contendo os campos: Nome Cliente, CPF, Data Nascimento, Renda Mensal, E-mail e Data Cadastro.
- Tela com listagem de clientes, com os campos: Nome Cliente, CPF, Data Cadastro, Renda Mensal.
  - Ações de remover e alterar registros.
- Tela com o detalhe das informações do cliente, podendo ser editáveis todos os campos, exceto o CPF;

Validações:

- Cliente deve possuir mais de 18 anos e menos de 60;
- CPF deve ser válido;
- Nome Cliente deve possuir ao menos um sobrenome;

## Instalação

<p>Clonar projeto usando o comando `git clone https://github.com/AlissonTS/angular-crud.git`.</p>
<p>Executar `npm install` dentro da pasta do projeto para instalação das dependências do projeto.</p>
<p>Executar `npm install -g json-server` para instalação do JSON Server.</p>

## Executar JSON Server

<p>Executar `npx json-server --watch db.json`. Navegar para `http://localhost:3000/clientes`.</p>
<p>Dados cadastrados durante utilização do sistema estarão no arquivo `db.json`;</p>

## Executar servidor de desenvolvimento

Executar `ng serve` para iniciar servidor de desenvolvimento. Navegar para `http://localhost:4200/`.

## Build

Executar `ng build` para build do projeto. Artefatos ficarão no diretório `dist/`.

## Rodar testes unitários

Executar `ng test` para rodar testes unitários via [Karma](https://karma-runner.github.io).
