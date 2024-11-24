# Etapa 1: Construção da aplicação (build stage)
FROM node:18 AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências (package.json e package-lock.json)
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Definir a variável NODE_ENV como 'production' (padrão para essa etapa)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Rodar o build da aplicação React
RUN npm run build

# Etapa 2: Servir a aplicação com um servidor estático (serve stage)
FROM nginx:alpine

# Copiar os arquivos construídos do estágio anterior para o diretório de arquivos estáticos do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80 (default do Nginx)
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
