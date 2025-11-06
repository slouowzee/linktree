# 🤖 Backend Discord Status

Backend Node.js qui utilise discord.js pour tracker votre statut Discord en temps réel.

## 📋 Configuration Discord

1. **Discord Developer Portal** (https://discord.com/developers/applications)
   - Bot → Privileged Gateway Intents
   - ✅ Activer **PRESENCE INTENT**
   - ✅ Activer **SERVER MEMBERS INTENT**

2. **Inviter le bot sur votre serveur**

3. **Fichier `.env`**
   ```env
   DISCORD_BOT_TOKEN=votre_token_bot
   DISCORD_GUILD_ID=votre_server_id
   DISCORD_USER_ID=votre_user_id
   ```

## 🚀 Utilisation

```bash
npm install
npm start
```

Le serveur démarre sur **http://localhost:3001**

## 📡 Endpoints

- `GET /api/discord-status` - Statut Discord actuel
- `GET /api/health` - Health check

## 🔄 Statuts possibles

- `online` 🟢 - `idle` 🟡 - `dnd` 🔴 - `offline` ⚫
