# === Stage 1: Build Next.js App ===
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=development
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copy env file (dibaca saat build)
COPY ./src/.env .env

# Copy dependency files & install (devDependencies diperlukan)
COPY ./src/package.json ./src/yarn.lock ./
RUN yarn install --frozen-lockfile --production=false && yarn cache clean

# Copy entire source code
COPY ./src .

# Bersihkan hasil build sebelumnya (kalau ada)
RUN rm -rf .next

# Build Next.js dengan output standalone
RUN yarn build

# === Stage 2: Minimal Production Image ===
FROM node:18-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy env file untuk runtime (opsional)
COPY ./src/.env .env

# Copy hasil build dari builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Jalankan Next.js standalone server
CMD ["node", "server.js"]