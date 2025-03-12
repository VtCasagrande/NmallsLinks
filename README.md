# Nmalls Linktree

Um sistema de Linktree personalizado para a Nmalls, com painel administrativo para gerenciamento de links e estatísticas.

## Funcionalidades

- **Página Principal (Linktree)**:
  - Exibição de links organizados por categorias
  - Links em destaque
  - Ícones de redes sociais
  - Design responsivo e moderno
  - Rastreamento de origem dos visitantes

- **Painel Administrativo**:
  - Login seguro
  - Dashboard com estatísticas
  - Gerenciamento de links (adicionar, editar, excluir)
  - Gerenciamento de links de redes sociais
  - Visualização de estatísticas de visitantes

## Tecnologias Utilizadas

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- MongoDB (opcional)
- NextAuth.js para autenticação

## Requisitos

- Node.js 18.17 ou superior
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/linktreenmalls.git
cd linktreenmalls
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/linktreenmalls
NEXTAUTH_SECRET=seu-segredo-muito-seguro
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=@Nmalls1234#
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Acesse o projeto:
   - Página principal: http://localhost:3000
   - Painel administrativo: http://localhost:3000/admin/login

## Implantação

### Easypanel

1. Faça push do código para o GitHub
2. No Easypanel, crie um novo projeto
3. Selecione a opção de implantação via GitHub
4. Conecte ao repositório e configure as variáveis de ambiente
5. Implante o projeto

## Credenciais de Acesso (Padrão)

- **Usuário**: admin
- **Senha**: @Nmalls1234#

## Licença

Este projeto é proprietário e de uso exclusivo da Nmalls. 