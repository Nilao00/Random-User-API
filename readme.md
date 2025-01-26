#Como rodar o projeto backend:

docker-compose up -d para rodar o banco de dados
dotnet ef migrations add InitialCreate para criar a tabela de usuários
dotnet ef database update para migrar o banco de dados
dotnet restore para restaurar as dependências
dotnet run para rodar o backend

variáveis no .env:
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=randomuserdb
POSTGRES_PORT=5432
POSTGRES_HOST=localhost

documentação swagger: http://localhost:5017/swagger/index.html

#Como rodar o projeto frontend:

variaveis no .env:
VITE_API_URL=http://localhost:5017/api/

npm install para instalar as dependências
npm run dev para rodar o frontend em modo de desenvolvimento
npm run build para gerar a pasta dist
npm run start para rodar o frontend em modo de produção.
