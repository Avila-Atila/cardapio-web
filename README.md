# Cardápio Web — Casa das Pizzas

Um sistema de gerenciamento de pedidos para pizzaria, desenvolvido com Angular 19 (Standalone Components) e Firebase (Firestore e Auth).

> **Link do projeto:** [cardapio-web.vercel.app](https://web-cardapio-chi.vercel.app)

---

## 📂 Estrutura do Repositório

```
├─ public/                # Arquivos estáticos (index.html, assets)
├─ src/
│  ├─ app/
│  │  ├─ components/
│  │  │  ├─ header/        # Navbar e modais (Perfil, Carrinho, Pedidos, Descontos)
│  │  │  ├─ cart/          # Lógica de carrinho de compras
│  │  │  ├─ orders/        # Modal de exibição de pedidos do usuário
│  │  │  ├─ profile/       # Componente de perfil do usuário
│  │  │  └─ auth/          # Login e Registro
│  │  ├─ services/
│  │  │  ├─ auth.service.ts    # Firebase Auth
│  │  │  ├─ cart.service.ts    # Estado do carrinho (RxJS)
│  │  │  ├─ orders.service.ts  # CRUD de pedidos (Firestore)
│  │  │  └─ user.service.ts    # Atualizações de usuário (incremento de pedidos)
│  │  └─ models/
│  │     ├─ orders-interface.ts
│  │     ├─ user-info-interface.ts
│  │     └─ flavors.ts
│  ├─ assets/              # Imagens, ícones e CSS global
│  └─ main.ts              # Bootstrap da aplicação
├─ angular.json            # Configuração do Angular CLI v19.2.11
├─ package.json            # Dependências e scripts
└─ README.md               # (Você está aqui)
```

---

## 🚀 Tecnologias

* **Framework:** Angular 19 (Standalone Components)
* **UI:** Bootstrap 5
* **Backend:** Firebase Firestore & Firebase Auth
* **State Management:** RxJS BehaviorSubjects


---

## 🔧 Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/Avila-Atila/cardapio-web.git
   cd cardapio-web
   ```

2. Instale dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor local:

   ```bash
   npm run start
   ```

4. Acesse `http://localhost:4200/`.

---

## ⚙️ Funcionalidades Principais

* **Registro e Login** de usuários (com validação de email/senha).
* **Carrinho de Compras** reativo, com gerenciamento via `cart.service`.
* **Histórico de Pedidos**: modal que lista todos os pedidos filtrados pelo UID do usuário.
* **Contador de Pedidos**: campo `orders` atualizado atômica no perfil do usuário.
* **Painel de administrador completo**: Opção de criar/ler/editar/remover pratos do cardápio, verificar informações dos usuários cadastrados, atualizar pedidos em tempo real, controlar o estado de aberto/fechado do restaurante, e muito mais.

---
