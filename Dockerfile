# === Stage 1: Build Next.js App ===
FROM node:18-alpine AS builder

WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copy env (optional)
COPY ./src/.env .env

# Install dependencies
COPY ./src/package.json ./src/yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy source code
COPY ./src .

# Build tanpa output: 'standalone'
RUN yarn build

---

# === Stage 2: Production Image ===
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN apk add --no-cache curl

# Copy source code + build output
COPY ./src ./

# Install only production dependencies
RUN yarn install --production && yarn cache clean

EXPOSE 3000

# Start app
CMD ["yarn", "start"]