#!/bin/sh

# Skrip untuk build dan menjalankan Docker Compose

# Hentikan dan hapus container lama (opsional, untuk menjaga kebersihan)
echo "📦 Stopping existing containers..."
docker-compose down --volumes --remove-orphans
docker system prune -f

echo "📥 Pulling latest images..."
docker-compose pull


echo "🚀 Building and starting containers..."
docker-compose build --no-cache
docker-compose up -d

