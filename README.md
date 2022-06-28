# 🔗 Linkr API
## 🚀 Descrição do Projeto
Sabe aquele link que não basta deixar salvo nos favoritos? Vem com Linkr e bora compartilhar com seus amigos esse link imperdível que o mundo todo deveria estar sabendo!

<br/>


## 🔍 Sobre
Linkr API é voltado a uma rede social, cujo propósito  é muito mais interessante que qualquer uma: com ele você poderá compartilhar links com o mundo! Só fazer seu cadastro e que comece a aventura! Nele você poderá criar seu link, compartilhar para os amigos que você segue ou para todos os que buscarem por ti. Ah, mas não se esquença de colocar um hashtag na descrição de seu link, assim você poderá ter mais visualizações em suas postagens, e quem sabe seu hashtag entre em nosso trending global 🤩. Nessa APi, podemos encontrar as seguintes funcionalidades:

### Features
- [x] [`Verificar se o server está funcionando`](#get-health)
- [x] [`Cadastrar um usuário`](#post-sign-up)
- [x] [`Efetuar login de um usuário`](#post-login)
- [x] [`Adicionar comentários aos posts`](#post-postsidcomments)
- [x] [`Receber comentários de um post`](#get-postsidcommentsuserid)
- [x] [`Seguir usuários`](#post-follow)
- [x] [`Deixar de seguir usuários`](#delete-followunfollowid)
- [x] [`Receber trending de hashtags`](#get-hashtags)
- [x] [`Buscar por lista de post de hashtags`](#get-hashtagsid)
- [x] [`Curtir uma publicação`](#post-likeslike)
- [x] [`Remover curtida de uma publicação`](#delete-likesdislikepostid)
- [x] [`Criar um post`](#post-posts)
- [x] [`Receber lista geral de posts`](#get-poststimeline)
- [x] [`Remover post`](#delete-postsid)
- [x] [`Atualizar um post`](#put-postsid)
- [x] [`Receber lista de reposts`](#get-postsrepostid)
- [x] [`Fazer um repost`](#post-postsrepostid)
- [x] [`Deletar um repost`](#delete-postsrepostid)
- [x] [`Receber número de reposts de um post`](#get-postsrepostcountid)
- [x] [`Receber lista de usuários`](#get-users)
- [x] [`Buscar posts de um usuário`](#get-usersid)

<br/>


## ✔️ Tabela de conteúdo
<!--ts-->
- [🔗 Linkr API](#-linkr-api)
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
		- [`POST /sign-up`](#post-sign-up)
		- [`POST /login`](#post-login)
		- [`POST /posts/:id/comments`](#post-postsidcomments)
		- [`GET /posts/:id/comments/:userId`](#get-postsidcommentsuserid)
		- [`POST /follow`](#post-follow)
		- [`DELETE /follow/:unfollowId`](#delete-followunfollowid)
		- [`GET /hashtags`](#get-hashtags)
		- [`GET /hashtags/:id`](#get-hashtagsid)
		- [`POST /likes/like`](#post-likeslike)
		- [`DELETE /likes/dislike/:postId`](#delete-likesdislikepostid)
		- [`POST /posts`](#post-posts)
		- [`GET /posts/timeline`](#get-poststimeline)
		- [`DELETE /posts/:id`](#delete-postsid)
		- [`PUT /posts/:id`](#put-postsid)
		- [`GET /posts/repost/:id`](#get-postsrepostid)
		- [`POST /posts/repost/:id`](#post-postsrepostid)
		- [`DELETE /posts/repost/:id`](#delete-postsrepostid)
		- [`GET /posts/repost/count/:id`](#get-postsrepostcountid)
		- [`GET /users`](#get-users)
		- [`GET /users/:id`](#get-usersid)
	- [👨🏼‍💻 Autores](#-autores)
<!--te-->

<br/>


## 🖥 Tecnologias
<p align="center">
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
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [PostgreSQL](https://www.postgresql.org/). 
Além disso recomendo fortemente a utilização de um bom ter um editor de código, como o [VSCode](https://code.visualstudio.com/)!


### Instalando a API
```bash

# Clone este repositório
git clone https://github.com/TiagoVota/linkr-api

# Acesse a pasta do projeto no terminal/cmd
cd linkr-api

# Instale as dependências
npm install

```

### Criando database

```bash

# Entre na pasta com os scripts para o database
cd database

# Crie seu database com o nome .env
bash ./create-database

# Conecte a seu database
bash ./connect-database

```

### Preparando setup
Na pasta principal da API, crie um arquivo `.env.dev` aos mesmos moldes do arquivo [`.env.example`](https://github.com/TiagoVota/linkr-api/blob/main/.env.example).

### Inicializando a API
```bash

# Execute a aplicação em modo de desenvolvimento
npm run start:dev

# O servidor inciará na porta:PORT (escolhida no arquivo .env) - acesse http://localhost:PORT 

```

<br/>


## 📜 Documentação
Agora veremos quais os principais endpoints dessa aplicação

### `GET /health`

### `POST /sign-up`

### `POST /login`

### `POST /posts/:id/comments`

### `GET /posts/:id/comments/:userId`

### `POST /follow`

### `DELETE /follow/:unfollowId`

### `GET /hashtags`

### `GET /hashtags/:id`

### `POST /likes/like`

### `DELETE /likes/dislike/:postId`

### `POST /posts`

### `GET /posts/timeline`

### `DELETE /posts/:id`

### `PUT /posts/:id`

### `GET /posts/repost/:id`

### `POST /posts/repost/:id`

### `DELETE /posts/repost/:id`

### `GET /posts/repost/count/:id`

### `GET /users`

### `GET /users/:id`

<br/>


## 👨🏼‍💻 Autores
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/56308226?v=4" width="100px;" alt="Foto de perfil Tiago Vota Cucco"/>
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/93656802?v=4" width="100px;" alt="Foto de perfil Caroline Oliveira"/>
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/93676210?v=4" width="100px;" alt="Foto de perfil Guilherme Arruda"/>
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/93785626?v=4" width="100px;" alt="Foto de perfil Rodnei Santana Azevedo"/>

Feito por Tiago Vota Cucco, Caroline Oliveira, Guilherme Arruda e 
Rodnei Santana Azevedo. Entre em contato!

[![Gmail Badge](https://img.shields.io/badge/-tiagovotacucco@gmail.com-c14438?style=flat&logo=Gmail&logoColor=white&link=mailto:tiagovotacucco@gmail.com)](mailto:tiagovotacucco@gmail.com)
[![Linkedin Badge](https://img.shields.io/badge/-Tiago-Vota?style=flat&logo=Linkedin&logoColor=white&color=blue&link=https://www.linkedin.com/in/tiago-vota-cucco)](https://www.linkedin.com/in/tiago-vota-cucco) 

<br/><br/>
