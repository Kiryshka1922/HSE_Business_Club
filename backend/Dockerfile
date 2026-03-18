FROM node:20-alpine

WORKDIR /app/backend

RUN npm install -g pnpm @nestjs/cli

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

# Запускаем
CMD ["pnpm", "run", "start"]