FROM node:18-alpine

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de projeto
COPY . .

# Mostrar informações de debug
RUN echo "Conteúdo do diretório:" && ls -la
RUN echo "Versão do Node:" && node -v
RUN echo "Versão do NPM:" && npm -v

# Instalar dependências
RUN npm ci

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Construir a aplicação
RUN npm run build

# Expor porta
EXPOSE 3000

# Definir variável de ambiente para o host
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar a aplicação
CMD ["npm", "start"] 