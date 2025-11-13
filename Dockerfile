# ------------------------------------
# Stage 1: Build Stage (Uses Node to build the React App)
# ------------------------------------
FROM node:24.11.0-alpine3.22 AS builder

RUN apk update --no-cache

# Set the working directory inside the container
WORKDIR /app

# ----- Set environment variable -----
# NODE_ENV=production ช่วยให้ npm ติดตั้งเฉพาะ production dependencies
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy package.json and package-lock.json first to leverage Docker's layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# ✅ Copy environment file (for build-time variables)
# ✅ Copy environment file ตาม NODE_ENV (เช่น .env.dev → .env)
# ถ้าไม่มีไฟล์นั้นจะ fallback ใช้ .env
RUN echo "📦 Using environment file: .env.${NODE_ENV}" && \
    if [ -f ".env.${NODE_ENV}" ]; then \
      cp .env.${NODE_ENV} .env; \
    else \
      echo "⚠️ .env.${NODE_ENV} not found, using default .env"; \
    fi

# Copy the rest of the source code
COPY . .

# Build the React application (static files will be generated in /app/build)
RUN npm run build

# ------------------------------------
# Stage 2: Run Stage (Uses Nginx to Serve Static Files)
# ------------------------------------
FROM nginx:1.29-alpine3.22

RUN apk update --no-cache

# timezone
RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime

# ----- Set environment -----
ENV NODE_ENV=production

# Expose port 80, the default for Nginx
EXPOSE 80

RUN mkdir -p /data/nginx/cache

# Configure Nginx for Client-Side Routing (Crucial for React Router)
# This setup redirects all unknown paths back to index.html
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Copy the built static files from the 'builder' stage to the Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# The default CMD for Nginx handles running the server
CMD ["nginx", "-g", "daemon off;"]
