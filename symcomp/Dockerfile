# --- Base Stage ---
# Contém dependências comuns e setup para evitar duplicações
FROM node:lts-alpine3.22 AS base
WORKDIR /app
# Ativa pnpm para gerenciamento de pacotes
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# --- Dependencies Stage ---
# Responsável por instalar as dependências
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- Development Stage ---
# Para desenvolvimento local. Utiliza as dependências instaladas
# E inicia o servidor dev
FROM dependencies AS development
COPY . .
CMD ["pnpm", "dev"]

# --- Production Build Stage ---
# Cria o app para produção
FROM dependencies AS builder
COPY . .
RUN pnpm build

# --- Production Stage ---
# Optimized image for production
FROM base AS production
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN pnpm install --production --ignore-scripts
EXPOSE 3000
CMD ["pnpm", "start"]