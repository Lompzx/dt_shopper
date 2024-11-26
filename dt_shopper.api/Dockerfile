# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY dt_shopper.api/package*.json ./

# Instale as dependências
RUN npm install --production

# Copie o restante dos arquivos da aplicação para o container
COPY dt_shopper.api .

# Copie o arquivo .env da pasta raiz para o contêiner
COPY .env ./

# Construa a aplicação
RUN npm run build

# Exponha a porta que o servidor usará
EXPOSE 8080

# Defina o comando padrão para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
