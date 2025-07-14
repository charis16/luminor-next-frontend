# === Stage 1: Build Next.js App ===
FROM node:18-alpine AS builder

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copy env file lebih awal (jika dibutuhkan di build)
COPY ./src/.env .env

# Copy dependency files dan install (dev + prod)
COPY ./src/package.json ./src/yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy semua source code ke dalam container
COPY ./src .

# Optional: bersihkan build sebelumnya
RUN rm -rf .next

# Build Next.js
RUN yarn build

# === Stage 2: Minimal Production Image ===
FROM node:18-alpine AS runner

WORKDIR /app

RUN apk add --no-cache curl

ENV NODE_ENV=production
ENV PORT=3000

# Copy env untuk runtime jika dibutuhkan
COPY ./src/.env .env

# Copy hasil build (standalone)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Port expose
EXPOSE 3000

# Jalankan Next.js standalone server
CMD ["node", "server.js"]