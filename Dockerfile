# Dockerfile multi-stage pour Linktree + Discord Bot
FROM node:20-alpine AS base

# Stage 1: Build du frontend
FROM base AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Setup du backend
FROM base AS backend-setup
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --only=production

# Stage 3: Production
FROM base AS production
WORKDIR /app

# Copier le build du frontend
COPY --from=frontend-build /app/dist ./dist

# Copier le backend
COPY --from=backend-setup /app/server/node_modules ./server/node_modules
COPY server ./server

# Installer serve pour servir le frontend
RUN npm install -g serve concurrently

# Exposer les ports
EXPOSE 3001 5173

# Variables d'environnement
ENV NODE_ENV=production

# Script de démarrage
COPY docker-start.sh ./
RUN chmod +x docker-start.sh

CMD ["./docker-start.sh"]
