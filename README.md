API de Autenticação e CRUD com Node.js e JWT
Uma API RESTful completa construída com Node.js, Express e MongoDB. O projeto implementa um sistema de autenticação de usuários seguro utilizando JSON Web Tokens (Access + Refresh Tokens) e expõe um CRUD de "Tarefas" (Todos) que é acessível apenas para usuários autenticados.

🚀 Funcionalidades
Autenticação de Usuários:

Cadastro de novos usuários com senha criptografada (bcrypt).

Login de usuários retornando accessToken e refreshToken.

Endpoint para renovar tokens de acesso expirados.

Segurança:

Rotas protegidas com middleware de autenticação JWT.

Validação de dados de entrada com Zod para previnir dados maliciosos.

CRUD de Tarefas:

Criar, Ler, Atualizar e Deletar tarefas.

Cada tarefa é vinculada ao seu usuário "dono".

Usuários só podem visualizar e modificar suas próprias tarefas.

🛠️ Tecnologias Utilizadas
Backend: Node.js, Express.js

Banco de Dados: MongoDB com Mongoose (ODM)

Autenticação: JSON Web Token (jsonwebtoken), BcryptJS

Validação: Zod

Variáveis de Ambiente: Dotenv

Utilitários: Nodemon, CORS

📋 Pré-requisitos
Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

Node.js (v18 ou superior)

npm ou yarn

MongoDB (para rodar um banco de dados local) OU uma conta no MongoDB Atlas (para um banco na nuvem)

Postman (ou similar) para testar os endpoints da API.

⚙️ Instalação e Configuração
Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

1. Clone o repositório:

Bash

git clone https://github.com/seu-usuario/seu-repositorio.git
2. Navegue até a pasta do projeto:

Bash

cd seu-repositorio
3. Instale as dependências:

Bash

npm install
4. Configure as Variáveis de Ambiente:
Crie uma cópia do arquivo de exemplo .env.example e renomeie para .env:

Bash

cp .env.example .env
Agora, abra o arquivo .env e preencha com suas configurações:

Snippet de código

# Porta em que o servidor irá rodar
PORT=3001

# URI de conexão com o MongoDB
# -------------------------------------------------------------------
# Exemplo para MongoDB LOCAL (instalado na sua máquina):
MONGO_URI=mongodb://127.0.0.1:27017/auth_crud_db

# Exemplo para MongoDB ATLAS (cluster na nuvem):
# MONGO_URI=mongodb+srv://seuUsuario:suaSenha@cluster0.xxxxx.mongodb.net/auth_crud_db?retryWrites=true&w=majority
# -------------------------------------------------------------------

# Segredos para os tokens JWT (use frases longas e aleatórias)
JWT_ACCESS_SECRET="SUA_FRASE_SECRETA_PARA_ACCESS_TOKEN"
JWT_REFRESH_SECRET="SUA_OUTRA_FRASE_SECRETA_PARA_REFRESH_TOKEN"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
Importante: Se estiver usando o MongoDB Atlas, não se esqueça de liberar o seu IP no "Network Access" e substituir <username> e <password> na URI.

▶️ Rodando a Aplicação
Para ambiente de desenvolvimento (com auto-reload):

Bash

npm run dev
Para ambiente de produção:

Bash

npm start
O servidor estará rodando em http://localhost:3001 (ou na porta que você definiu no .env).

Endpoints da API
A seguir está a documentação de todos os endpoints disponíveis. Para as rotas protegidas, é necessário enviar o accessToken no cabeçalho de autorização.

No Postman: Authorization -> Type: Bearer Token -> Token: <seu_access_token>

Autenticação (/auth)
POST /auth/register
Registra um novo usuário.

Proteção: Pública

Request Body (JSON):

JSON

{
    "name": "Usuario Teste",
    "email": "teste@email.com",
    "password": "senha123"
}
Success Response (201 Created):

JSON

{
    "message": "Usuário criado com sucesso!",
    "user": { "id": "...", "name": "...", "email": "..." }
}
POST /auth/login
Autentica um usuário e retorna os tokens.

Proteção: Pública

Request Body (JSON):

JSON

{
    "email": "teste@email.com",
    "password": "senha123"
}
Success Response (200 OK):

JSON

{
    "accessToken": "...",
    "refreshToken": "...",
    "user": { ... }
}
GET /auth/me
Retorna os dados do usuário autenticado.

Proteção: Privada (Bearer Token)

Success Response (200 OK):

JSON

{
    "id": "...",
    "name": "...",
    "email": "..."
}
Tarefas (/todos)
POST /todos
Cria uma nova tarefa para o usuário autenticado.

Proteção: Privada (Bearer Token)

Request Body (JSON):

JSON

{
    "title": "Minha nova tarefa"
}
Success Response (201 Created): Retorna o objeto da tarefa criada.

GET /todos
Lista todas as tarefas do usuário autenticado.

Proteção: Privada (Bearer Token)

Success Response (200 OK): Retorna um array de objetos de tarefa.

PUT /todos/:id
Atualiza uma tarefa existente pelo seu ID.

Proteção: Privada (Bearer Token)

Request Body (JSON):

JSON

{
    "title": "Tarefa atualizada",
    "done": true
}
Success Response (200 OK): Retorna o objeto da tarefa atualizada.

DELETE /todos/:id
Deleta uma tarefa pelo seu ID.

Proteção: Privada (Bearer Token)

Success Response (204 No Content): Retorna uma resposta vazia.

🧪 Testando
A forma recomendada de testar os endpoints é utilizando o Postman. Você pode criar uma "Collection" no Postman e adicionar todas as requisições documentadas acima para testar o fluxo completo de autenticação e CRUD.
