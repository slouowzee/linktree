#!/bin/sh
# Script de démarrage Docker pour Linktree

echo "🚀 Démarrage de l'application Linktree..."

# Démarrer le backend et le frontend en parallèle
concurrently \
  --names "API,APP" \
  --prefix-colors "blue,green" \
  "cd /app/server && node server.js" \
  "serve -s /app/dist -l 5173"
