#!/bin/sh

# Skrip untuk build dan menjalankan ulang Docker Compose secara bersih

echo "📦 Stopping and removing old containers, volumes, and orphans..."
docker-compose down --volumes --remove-orphans

echo "🧹 Cleaning unused containers and images..."
docker container prune -f
docker image prune -a -f
docker volume prune -f
docker network prune -f

echo "📥 Pulling latest images..."
docker-compose pull

echo "🔨 Building containers..."
docker-compose build --no-cache

echo "🚀 Starting containers..."
docker-compose up -d