# 🐳 Déploiement Docker

## 🚀 Démarrage rapide

### En local (développement)
```bash
npm start
```
Cette commande lance automatiquement :
- ✅ Frontend React (port 5173)
- ✅ Backend Discord Bot (port 3001)

### Avec Docker
```bash
# Build l'image
docker-compose build

# Démarrer les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

## 📝 Configuration

Avant de déployer, créez `server/.env` :
```env
DISCORD_BOT_TOKEN=votre_token_bot
DISCORD_GUILD_ID=votre_server_id
DISCORD_USER_ID=votre_user_id
```

## 🔧 Commandes disponibles

### Développement
- `npm start` - Lance frontend + backend en parallèle
- `npm run dev` - Frontend seul
- `npm run server` - Backend seul

### Production
- `npm run build` - Build le frontend
- `npm run start:prod` - Lance en mode preview

### Installation
- `npm install` - Installe dépendances frontend
- `npm run server:install` - Installe dépendances backend

## 📦 Structure des ports

- **5173** - Frontend React
- **3001** - API Discord Bot

## 🐋 Docker

L'image Docker contient :
- Frontend buildé et servi via `serve`
- Backend Node.js avec bot Discord
- Tout démarre automatiquement avec `concurrently`
