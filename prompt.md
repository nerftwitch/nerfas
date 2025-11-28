# Prompt para Google AI Studio (Projeto React + Firebase + Tailwind)

Crie um projeto completo usando as seguintes tecnologias:

## Stack Tecnológico
- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** (última versão)
- **shadcn/ui** (com Radix e lucide-react)
- **Firebase (modular)**:
  - Auth
  - Firestore
- **React Query (TanStack Query)**
- **React Hook Form**
- **Zod**
- **@hookform/resolvers**
- **Sonner** (toasts)
- **Motion / Framer Motion** (animações)
- **clsx + tailwind-merge** (helper `cn`)
- **Zustand** (opcional)
- **React Router** ou TanStack Router

---

## Estrutura do Sistema

### Tipos de usuário:
1. **super_admin**  
   - Acesso total a tudo  
2. **company_admin**  
   - Acesso somente à própria empresa  
   - Pode gerenciar usuários da empresa  
3. **employee**  
   - Funcionário  
   - Pode criar e editar pedidos da empresa

---

## Firebase Config

Use exatamente este config:

```js
const firebaseConfig = {
  apiKey: "AIzaSyDuvW3X-NEOjFw4KvWXVbHtAJPCuvROH3w",
  authDomain: "nerfas-teste.firebaseapp.com",
  projectId: "nerfas-teste",
  storageBucket: "nerfas-teste.firebasestorage.app",
  messagingSenderId: "622257198382",
  appId: "1:622257198382:web:d5cae78fe174dc070e56bf"
};
```

---

## Estrutura de Pastas

```
src/
  main.tsx
  App.tsx
  routes/
  lib/
    firebase.ts
    react-query.ts
    auth.ts
    cn.ts
  contexts/
    AuthContext.tsx
  components/
    ui/
    layout/
      AppLayout.tsx
      AdminLayout.tsx
    common/
      ProtectedRoute.tsx
      RoleGate.tsx
      Navbar.tsx
      Sidebar.tsx
  features/
    auth/
      LoginPage.tsx
      RegisterPage.tsx
    orders/
      OrdersListPage.tsx
      OrderForm.tsx
      OrderDetailsPage.tsx
    companies/
      CompanyListPage.tsx
      CompanyForm.tsx
    users/
      UserListPage.tsx
  config/
    roles.ts
    orderStatus.ts
```

---

## Modelo de Dados

### users
```ts
{
  uid: string;
  email: string;
  displayName: string;
  role: "super_admin" | "company_admin" | "employee";
  companyId?: string;
  createdAt: Timestamp;
  isActive: boolean;
}
```

### companies
```ts
{
  name: string;
  cnpj?: string;
  createdAt: Timestamp;
  isActive: boolean;
}
```

### orders
```ts
{
  companyId: string;
  createdBy: string;
  customerName: string;
  customerPhone?: string;
  description: string;
  type: "immediate" | "scheduled";
  status: "pending" | "in_production" | "ready" | "delivered" | "canceled";
  paymentStatus: "unpaid" | "partial" | "paid";
  totalPrice: number;
  paidAmount: number;
  createdAt: Timestamp;
  dueDate?: Timestamp;
  notes?: string;
}
```

---

## Funcionalidades Principais

### Autenticação
- Login  
- Contexto de usuário  
- Carregar `/users/{uid}` após login  

### Controle de acesso
- `ProtectedRoute`
- `RoleGate` (permissão por role)

### Pedidos
- Criar pedido (immediate / scheduled)
- Atualizar:
  - status  
  - pagamento  
- Listar pedidos com filtros
- Página de detalhes

### Admin
- super_admin gerencia empresas e todos os usuários
- company_admin gerencia usuários da própria empresa

---

## Firestore Rules (Esqueleto)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isSuperAdmin() {
      return isSignedIn() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super_admin';
    }

    function userDoc(uid) {
      return get(/databases/$(database)/documents/users/$(uid));
    }

    function userCompanyId(uid) {
      return userDoc(uid).data.companyId;
    }

    match /users/{userId} {
      allow read: if isSuperAdmin() || (isSignedIn() && request.auth.uid == userId);
      allow write: if isSuperAdmin() || (isSignedIn() && request.auth.uid == userId);
    }

    match /companies/{companyId} {
      allow read: if isSignedIn();
      allow write: if isSuperAdmin();
    }

    match /orders/{orderId} {
      allow read, write: if isSignedIn()
        && (
          isSuperAdmin() ||
          userCompanyId(request.auth.uid) == resource.data.companyId ||
          userCompanyId(request.auth.uid) == request.resource.data.companyId
        );
    }
  }
}
```

---

## Objetivo
Gerar **todo o projeto** automaticamente com:
- rotas  
- layouts  
- pages  
- hooks  
- integrações com Firestore  
- formulários com RHF + Zod  
- telas usando shadcn/ui  
- tabelas  
- animações Motion  
- toasts com Sonner  
- proteção por roles  
- CRUD de pedidos  
- Gerenciamento de empresas e usuários  

Gere tudo **com código completo**, arquivos organizados, imports corretos e tipagem total.
