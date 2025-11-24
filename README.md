-----

#  Biblio-Owl | Desafio Frontend 2025.2

Esse repositório tem o projeto que desenvolvi para a trilha de **front end do PS da compJR 2025.2.** Foi desenvolvido com react e Vite, simulando uma biblioteca de livros funcional, contendo tudo que um CRUD contem e com um design para o visual tentando seguir padrões atuais de desenvolvimento.

##  Visão Geral e Funcionalidades

O **Biblio-Owl** é focado no gerenciamento de volumes e coleções dos livros, permitindo:

1.  **Autenticação (Login/Registro):** Simulação de login usando `localStorage` com sistema de **Guarda de Rotas** (`PrivateRoute`).
2.  **Listagem (Read):** Exibição de livros obtidos de uma API pública.
3.  **CRUD Local:** Criação, Edição e Exclusão de livros, com persistência de dados no `localStorage`.

-----

##  Requisitos do Desafio Atendidos

| Requisito | Detalhes da Implementação |
| :--- | :--- |
| **Arquitetura de Pastas** | Segue o padrão modular com pastas `assets`, `components`, `pages`, `services` e `styles`. |
| **Componentização** | Todos os elementos de UI são componentes isolados, importados da pasta `components` (`Input`, `BookForm`, `RegisterForm`, `PrivateRoute`). |
| **Responsividade** | Implementação de estilos CSS adaptáveis para telas **Mobile**, **Tablet** e **Desktop**. |
| **Login e Registro** | Funcionalidade completa de autenticação simulada com `localStorage`, incluindo validação de campos. |
| **Guarda de Rotas** | Implementação de um componente `PrivateRoute` que redireciona o usuário para o `/` (Login) se não estiver autenticado. |
| **CRUD Completo** | `Create`, `Read` (da API), `Update` e `Delete` implementados para o gerenciamento da coleção de livros. |

-----

##  Tecnologias e Justificativas

A escolha das tecnologias foi feita em função do meu próprio desenvolvimento, dado o fato de nunca ter mechido com React, resolvi experimentar o framework. Junto com isso, as tecnologias auxiliares também eram novidade, mas em geral, a experiencia é positiva.

| Tecnologia | Função Principal | Justificativa de Uso |
| :--- | :--- | :--- |
| **React (v18)** | Framework principal para a UI. | Padrão da indústria para desenvolvimento de interfaces complexas e dinâmicas, com forte foco em componentização. |
| **Vite** | Ferramenta de build e servidor de desenvolvimento. | Escolhido por ser mais rápido e leve que o CRA (Create React App), otimizando o tempo de desenvolvimento. |
| **React Router DOM** | Roteamento declarativo. | Essencial para gerenciar a navegação, as rotas e a implementação da `PrivateRoute`. |
| **Google Books API** | Fonte de dados para a listagem inicial. | API pública robusta e relevante ao tema "Biblioteca", cumprindo o requisito de consumo de API. |
| **`localStorage`** | Persistência de dados. | Usado para simular um backend de forma simples, armazenando o status de login (`isAuthenticated`) e os dados manipulados do CRUD de Livros. |

-----

##  Arquitetura e Estrutura de Pastas

A estrutura do projeto segue o padrão recomendado pelo desafio para ter modularidade e separação de responsabilidades:

```
src/
├── assets/        
├── components/    
│   ├── BookForm.jsx
│   ├── Input.jsx
│   ├── PrivateRoute.jsx
│   └── RegisterForm.jsx
├── pages/        
│   ├── HomePage.jsx
│   └── LoginPage.jsx
├── services/      
│   ├── authService.js
│   └── bookService.js
├── styles/        
│   ├── GlobalStyles.css
│   └── HomePage.css
├── App.jsx        
└── main.jsx        
```

-----

##  Como Instalar e Executar (Local)

Para rodar este projeto em seu pc, siga os passos abaixo.

### Pré-requisitos

  * **Node.js** (versão LTS recomendada)
  * **NPM** ou **Yarn**

### Instalação e Execução

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/SeuUsuario/frontEndPSCompJr.git
    cd frontEndPSCompJr
    ```
2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou yarn install
    ```
3.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    # ou yarn dev
    ```
4.  Abra seu navegador no endereço `http://localhost:5173/` (ou a porta indicada pelo seu terminal).

-----
