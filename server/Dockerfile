FROM node:20-alpine
WORKDIR /app

# Copier les dépendances
COPY package*.json ./
RUN npm ci --only=production

# Copier le code
COPY . .

EXPOSE 3001
CMD ["node", "server.js"]
