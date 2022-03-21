# 🫖 Boilerplate API
## 🚀 Descrição do Projeto
Descrição lúdica sobre o projeto!

<br/>


## 🔍 Sobre
Fala um pouco sobre e para que serve essa API. Na mesma, podemos encontrar as seguintes funcionalidades:

### Features
- [x] [`Verificar se o server está funcionando`](#get-health)
- [x] [`Enviar um exemplo`](#post-example)

<br/>


## ✔️ Tabela de conteúdo
<!--ts-->
- [🫖 Boilerplate API](#-boilerplate-api)
	- [🚀 Descrição do Projeto](#-descrição-do-projeto)
	- [🔍 Sobre](#-sobre)
		- [Features](#features)
	- [✔️ Tabela de conteúdo](#️-tabela-de-conteúdo)
	- [🖥 Tecnologias](#-tecnologias)
	- [⚙ Como usar](#-como-usar)
		- [Instalando a API](#instalando-a-api)
		- [Criando database](#criando-database)
		- [Preparando setup](#preparando-setup)
		- [Inicializando a API](#inicializando-a-api)
	- [📜 Documentação](#-documentação)
		- [`GET /health`](#get-health)
		- [`POST /example`](#post-example)
	- [🤖 Testes](#-testes)
	- [👨🏼‍💻 Autor](#-autor)
<!--te-->

<br/>


## 🖥 Tecnologias
<p align="center">
	<img alt="mongodb" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img alt="postgres" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img alt="nodejs" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img alt="npm" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
  <img alt="jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img alt="expressjs" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img alt="eslinter" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"/>
</p>

<br/>


## ⚙ Como usar

Para utilizar essa API, será necessário ter nas suas máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disso recomendo fortemente a utilização de um bom ter um editor de código, como o [VSCode](https://code.visualstudio.com/)!


### Instalando a API
```bash

# Clone este repositório
$ git clone https://github.com/TiagoVota/boilerplate-api

# Acesse a pasta do projeto no terminal/cmd
$ cd boilerplate-api

# Instale as dependências
$ npm install

```

### Criando database

```bash

# Acesse o postgres
sudo su postgres

# Entre no cliente do postgres
psql

# Crie uma database com o nome que desejar
CREATE DATABASE boilerplate;

# Conecte a sua database
\c boilerplate

# Cole e dê enter no script para criar as tabelas do seu banco de dados

```
O script necessário para criar as tabelas pode ser encontrado [nesse arquivo dump](https://github.com/TiagoVota/boilerplate-api/blob/main/dump.sql).


### Preparando setup
Na pasta principal da API, crie um arquivo `.env.dev` aos mesmos moldes do arquivo [`.env.example`](https://github.com/TiagoVota/boilerplate-api/blob/main/.env.example).

### Inicializando a API
```bash

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

# O servidor inciará na porta:PORT (escolhida no arquivo .env) - acesse http://localhost:PORT 

```

<br/>


## 📜 Documentação
Agora veremos quais os principais end points dessa aplicação

### `GET /health`

### `POST /example`

<br/>


## 🤖 Testes
Para essa API foram implementados testes unitários! Segue a listinha de comando que temos para ela:

```bash

# Roda uma única vez os testes
npm run test

# Deixa os testes em modo de observação, para que sejam refeitos a cada mudança de código
npm run test:watch

# Avalia a taxa de cobertura dos testes
npm run test:coverage

```

<br/>


## 👨🏼‍💻 Autor

<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/56308226?v=4" width="100px;" alt="Foto de perfil Tiago Vota Cucco"/>

Feito por Tiago Vota Cucco. Entre em contato!

[![Gmail Badge](https://img.shields.io/badge/-tiagovotacucco@gmail.com-c14438?style=flat&logo=Gmail&logoColor=white&link=mailto:tiagovotacucco@gmail.com)](mailto:tiagovotacucco@gmail.com)
[![Linkedin Badge](https://img.shields.io/badge/-Tiago-Vota?style=flat&logo=Linkedin&logoColor=white&color=blue&link=https://www.linkedin.com/in/tiago-vota-cucco-394916204)](https://www.linkedin.com/in/tiago-vota-cucco-394916204) 

<br/><br/>
