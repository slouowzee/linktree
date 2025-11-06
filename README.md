# 🔗 Linktree avec Statut Discord

Application Linktree React avec intégration du statut Discord en temps réel.

## 📁 Structure du Projet

```
linktree/
├── src/              # Frontend React
├── server/           # Backend Node.js (Discord Bot)
├── public/           # Assets statiques
├── Dockerfile        # Configuration Docker
├── docker-compose.yml # Orchestration Docker
└── package.json      # Scripts principaux
```

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/slouowzee/linktree.git
cd linktree
```

### 2. Installer toutes les dépendances
```bash
npm install                 # Frontend
npm run server:install      # Backend
```

### 3. Configuration Discord

Créez `server/.env` (copier depuis `server/.env.example`) :
```env
DISCORD_BOT_TOKEN=votre_token_bot
DISCORD_GUILD_ID=votre_server_id
DISCORD_USER_ID=votre_user_id
```

Voir [server/README.md](./server/README.md) pour la configuration complète.

## ⚡ Démarrage Rapide

### Une seule commande pour tout lancer !
```bash
npm start
```

Cette commande lance automatiquement :
- ✅ Frontend React sur http://localhost:5173
- ✅ Backend Discord Bot sur http://localhost:3001

### Ou séparément
```bash
npm run dev      # Frontend seulement
npm run server   # Backend seulement
```

## 🐳 Déploiement Docker

```bash
docker-compose up -d
```

Voir [DEPLOY.md](./DEPLOY.md) pour plus de détails.

## 🛠️ Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | 🚀 Lance frontend + backend ensemble |
| `npm run dev` | Démarre le frontend React |
| `npm run server` | Démarre le backend Discord |
| `npm run build` | Build le frontend pour production |
| `npm run server:install` | Installe les dépendances du serveur |

## 🔄 Statuts Discord

- 🟢 `online` - En ligne
- 🟡 `idle` - Absent
- 🔴 `dnd` - Ne pas déranger
- ⚫ `offline` - Hors ligne

## 📡 API Endpoints

- `GET http://localhost:3001/api/discord-status` - Statut actuel
- `GET http://localhost:3001/api/health` - Health check

## 📦 Technologies

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express + discord.js
- **Dev Tools**: Concurrently
- **Deployment**: Docker + Docker Compose