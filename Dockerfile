# Stage 1: Build Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only dependency-related files
COPY ./src/package.json ./src/yarn.lock ./

# Install dependencies (using cached layer if possible)
RUN yarn install --frozen-lockfile

# Copy entire source code
COPY ./src .

# Build Next.js app with standalone output
RUN yarn build

# Stage 2: Production image (minimal)
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only the necessary files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port (required for Docker run or compose)
EXPOSE 3000

# Run Next.js standalone server
CMD ["node", "server.js"]