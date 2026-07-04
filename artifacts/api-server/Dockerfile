FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc package.json ./
COPY lib/db/package.json lib/db/package.json
COPY lib/api-zod/package.json lib/api-zod/package.json
COPY lib/api-client-react/package.json lib/api-client-react/package.json
COPY artifacts/api-server/package.json artifacts/api-server/package.json
RUN pnpm install --frozen-lockfile --prod

FROM base AS build
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc package.json tsconfig.json tsconfig.base.json ./
COPY lib/ lib/
COPY artifacts/api-server/ artifacts/api-server/
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @workspace/api-server run build

FROM base
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/lib/db/node_modules /app/lib/db/node_modules
COPY --from=deps /app/lib/api-zod/node_modules /app/lib/api-zod/node_modules
COPY --from=deps /app/artifacts/api-server/node_modules /app/artifacts/api-server/node_modules
COPY --from=build /app/artifacts/api-server/dist /app/artifacts/api-server/dist
COPY --from=build /app/lib /app/lib
COPY --from=build /app/artifacts/api-server/package.json /app/artifacts/api-server/package.json

EXPOSE 3001
CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
