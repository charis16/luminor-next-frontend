#!/bin/sh

# Skrip untuk build dan menjalankan Docker Compose

# Hentikan dan hapus container lama (opsional, untuk menjaga kebersihan)
echo "📦 Stopping existing containers..."
docker-compose down

echo "📥 Pulling latest images..."
docker-compose pull

echo "🚀 Building and starting containers..."
docker-compose up --build -d

