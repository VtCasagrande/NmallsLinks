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

# Receber variáveis de ambiente como argumentos de build
ARG MONGODB_URI
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG ADMIN_USERNAME
ARG ADMIN_PASSWORD

# Definir variáveis de ambiente a partir dos argumentos
ENV MONGODB_URI=${MONGODB_URI}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV ADMIN_USERNAME=${ADMIN_USERNAME}
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

# Mostrar variáveis de ambiente (sem valores sensíveis)
RUN echo "Variáveis de ambiente configuradas: MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL, ADMIN_USERNAME, ADMIN_PASSWORD"

# Tentar construir a aplicação com mais informações de debug
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build || (echo "ERRO NO BUILD" && ls -la && exit 1)

# Expor porta
EXPOSE 3000

# Definir variável de ambiente para o host
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar a aplicação
CMD ["npm", "start"] 