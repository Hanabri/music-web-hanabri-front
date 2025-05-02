# Stage 1: 安装依赖并构建
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: 运行时环境
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --production
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
EXPOSE 3000
CMD ["npm", "run", "start"]