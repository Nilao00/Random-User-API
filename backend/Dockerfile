# Usando a imagem base para o build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copia os arquivos do projeto
COPY *.csproj .
RUN dotnet restore

# Copia o resto dos arquivos do app
COPY . .
RUN dotnet publish -c Release -o out

# Usando a imagem base do runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out .

# Expondo a porta padrão do ASP.NET Core
EXPOSE 80

# Comando para iniciar o aplicativo
ENTRYPOINT ["dotnet", "RandomUserApi.dll"]
