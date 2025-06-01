#!/bin/sh

set -e # Berhenti jika ada perintah yang gagal

# 💓 Heartbeat untuk mencegah GitHub Actions timeout
(while true; do echo "💓 Still running at $(date)"; sleep 60; done) &
KEEP_ALIVE_PID=$!
trap 'kill $KEEP_ALIVE_PID' EXIT # Hentikan heartbeat saat script selesai

log() {
  echo ""
  echo "🔹 $1"
  echo "-------------------------------------------"
}

rm -rf .next
log "Stopping and removing old containers, volumes, and orphans"
docker-compose down --volumes --remove-orphans

log "Pruning unused containers, volumes, and networks"
docker container prune -f
docker volume prune -f
docker network prune -f

log "Removing dangling <none> images"
docker images -f dangling=true -q | xargs -r docker rmi -f || true

log "Pulling latest base images"
docker-compose pull

log "Building containers"
docker-compose build

log "Starting containers"
docker-compose up -d

log "✅ Build and deployment completed successfully"