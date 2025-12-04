# 1. Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# env only for the Prisma Client generation during the build
ENV DATABASE_URL=postgres://cvd_user:cvd_password@db:5432/cvd_db

# generate + build (build → папка ./build)
RUN npx prisma generate \
 && npm run build

# 2. Runtime stage
FROM node:20-alpine

WORKDIR /app

RUN addgroup -S app && adduser -S app -G app
USER app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/prisma ./prisma

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "build/src/server.js"]
