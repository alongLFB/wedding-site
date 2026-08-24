# Stage: Production Alpine Image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production \
    PORT=3000

# Copy package descriptors first for caching
COPY package*.json ./

# Install dependencies if present
RUN npm install --omit=dev --no-audit --no-fund || true

# Copy application source code
COPY . .

# Ensure upload directory exists
RUN mkdir -p /app/uploads

# Expose default HTTP port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/content', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Start the application
CMD ["node", "server.js"]
