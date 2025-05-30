#!/bin/sh

set -e # Stop script if any command fails

echo "📦 Stopping and removing old containers, volumes, and orphans..."
docker-compose down --volumes --remove-orphans

echo "🧹 Cleaning unused containers and networks..."
docker container prune -f
docker volume prune -f
docker network prune -f

echo "🗑️ Removing dangling <none> images..."
# Hapus image <none> saja (optional, aman)
docker images -f dangling=true -q | xargs -r docker rmi -f || true

echo "📥 Pulling latest images..."
docker-compose pull

echo "🔨 Building containers (without --no-cache)..."
docker-compose build

echo "🚀 Starting containers..."
docker-compose up -d

echo "✅ Build and run process completed."