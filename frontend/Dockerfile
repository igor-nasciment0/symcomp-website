# --- Base Stage ---
FROM node:24 AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.3.0 --activate

# --- Dependencies Stage ---
FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm install --frozen-lockfile

# --- Development Stage ---
FROM dependencies AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

# --- Production Build Stage ---
FROM dependencies AS builder
ENV NODE_ENV=production
COPY . .
RUN pnpm build

# --- Production Stage ---
FROM node:24 AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable && corepack prepare pnpm@11.3.0 --activate

# Copie apenas os arquivos necessários
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Reinstale as dependências de produção
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

EXPOSE 3000
CMD ["pnpm", "start"]
