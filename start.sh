#!/bin/sh

# Skrip untuk build dan menjalankan Docker Compose

# Hentikan dan hapus container lama (opsional, untuk menjaga kebersihan)
docker compose down

# Bangun ulang image dengan Docker Compose
echo "Membangun ulang image dan menjalankan container..."
docker compose up --build -d

