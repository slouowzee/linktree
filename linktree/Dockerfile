# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm ci

# Copier tout le code source
COPY . .

# Build avec Vite (Tailwind sera compilé ici)
RUN npm run build

# Production stage
FROM nginx:alpine

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la config Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nettoyer
RUN rm -f /etc/nginx/conf.d/default.conf.default

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
