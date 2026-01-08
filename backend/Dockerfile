# 1. Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# ARG for build-time Prisma generation (dummy value, not used at runtime)
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

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
