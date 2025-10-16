# --- Base Stage ---
FROM --platform=$BUILDPLATFORM node:lts AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# --- Dependencies Stage ---
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./

# Flags de ambiente para controle de telemetria e binários
ENV NEXT_TELEMETRY_DISABLED=1
ENV ESBUILD_FORCE_BINARY_DOWNLOAD=true

# NODE_ENV deve ser "production" mesmo para builds, 
# pois Next.js usa isso para tree-shaking e minificação
ENV NODE_ENV=production

RUN pnpm install --frozen-lockfile --unsafe-perm

# --- Development Stage ---
FROM dependencies AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

# --- Production Build Stage ---
FROM dependencies AS builder
COPY . .
# Aqui o NODE_ENV=production já vem herdado — é correto para build
RUN pnpm build

# --- Production Stage ---
FROM --platform=$TARGETPLATFORM node:lts AS production
WORKDIR /app

# Ambiente de execução
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV ESBUILD_FORCE_BINARY_DOWNLOAD=true

RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# Copia somente o necessário
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
CMD ["sh", "/entrypoint.sh"]
