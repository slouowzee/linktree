.PHONY: help install start dev server build docker-build docker-up docker-down docker-logs clean

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Installe toutes les dépendances
	npm install
	npm run server:install
	@echo "✅ Installation terminée !"

start: ## Lance frontend + backend ensemble
	npm start

dev: ## Lance le frontend seulement
	npm run dev

server: ## Lance le backend seulement
	npm run server

build: ## Build le frontend pour production
	npm run build

docker-build: ## Build l'image Docker
	docker-compose build

docker-up: ## Démarre les services Docker
	docker-compose up -d
	@echo "✅ Services démarrés !"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:3001"

docker-down: ## Arrête les services Docker
	docker-compose down

docker-logs: ## Affiche les logs Docker
	docker-compose logs -f

clean: ## Nettoie les fichiers générés
	rm -rf node_modules server/node_modules dist
	@echo "✅ Nettoyage terminé !"
