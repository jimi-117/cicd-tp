# Build stage
FROM node:22.19.0-alpine AS builder

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci --omit=dev

# Prod stage
FROM node:22.19.0-alpine

WORKDIR /app

# Copy node_modules from builder as root
COPY --from=builder /app/node_modules ./node_modules

# Copy source code
COPY src ./src
COPY package*.json ./

# Fix ownership and change user
RUN chown -R 65532:65532 /app
USER 65532

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000), (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE ${PORT:-3000}

CMD ["npm", "start"]
