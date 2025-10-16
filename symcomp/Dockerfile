# --- Base Stage ---
# Contém dependências comuns e setup para evitar duplicações
FROM --platform=$BUILDPLATFORM node:lts AS base
WORKDIR /app
# Ativa pnpm para gerenciamento de pacotes
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# --- Dependencies Stage ---
# Responsável por instalar as dependências
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./

# Força download de binários corretos e evita prompts
ENV ESBUILD_FORCE_BINARY_DOWNLOAD=true
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

# Instala dependências e recompila binários nativos conforme a arquitetura
RUN pnpm install --frozen-lockfile --unsafe-perm && pnpm rebuild

# --- Development Stage ---
# Para desenvolvimento local. Utiliza as dependências instaladas
FROM dependencies AS development
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

# --- Production Build Stage ---
# Cria o app para produção
FROM dependencies AS builder
COPY . .
RUN pnpm build

# --- Production Stage ---
# Optimized image for production
FROM --platform=$TARGETPLATFORM node:lts AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV ESBUILD_FORCE_BINARY_DOWNLOAD=true

# Habilita o pnpm novamente
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# Copia artefatos necessários
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Copia o entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Exposição e execução
EXPOSE 3000
CMD ["sh", "/entrypoint.sh"]
