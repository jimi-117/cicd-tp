# Build stage
FROM node:22.19.0-alpine AS builder

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Prod stage
FROM node:22.19.0-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy source code
COPY src ./src
COPY package.json ./

# Fix ownership and run as node user
RUN chown -R node:node /app
USER node

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000), (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3000

CMD ["npm", "start"]