# Stage 1: Build Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copy env lebih awal
COPY ./src/.env .env

# Copy dependency files
COPY ./src/package.json ./src/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy seluruh source code
COPY ./src .

# Bersihkan build lama
RUN rm -rf .next

# Build
RUN yarn build

# Stage 2: Runtime
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy env (opsional jika dibutuhkan runtime)
COPY ./src/.env .env

# Copy hasil build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]