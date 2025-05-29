# Stage 1: Build Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# ⬇️ Set ENV agar dikenali saat build
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=2048"

# ⬇️ Copy env (gunakan env.production supaya dibaca saat build)
COPY ./src/.env.production .env

# ⬇️ Copy dependency files & install
COPY ./src/package.json ./src/yarn.lock ./
RUN yarn cache clean
RUN yarn install --frozen-lockfile

# ⬇️ Copy all source files
COPY ./src .

# ⬇️ Clear build lama
RUN rm -rf .next

# ⬇️ Build aplikasi

RUN yarn build

# Stage 2: Runtime image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# ⬇️ Copy env (opsional jika dibutuhkan di runtime)
COPY ./src/.env.production .env

# ⬇️ Copy hasil build standalone + static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]