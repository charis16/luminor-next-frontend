# Stage 1: Build Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy env file lebih awal (penting agar dibaca saat build)
COPY ./src/.env .env

# Copy only dependency-related files
COPY ./src/package.json ./src/yarn.lock ./

# Bersihkan cache dan install dep
RUN yarn cache clean
RUN yarn install --frozen-lockfile

# Copy seluruh source code
COPY ./src .

# Build dengan konfigurasi memory lebih besar
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Bersihkan build sebelumnya (jika ada)
RUN rm -rf .next

RUN yarn build

# Stage 2: Production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy hasil build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Port expose
EXPOSE 3000

# Jalankan server
CMD ["node", "server.js"]