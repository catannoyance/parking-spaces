from node:20.5.0-alpine as build
workdir /app
run corepack enable && corepack prepare pnpm@8.10.2 --activate

copy ./package.json pnpm-lock.yaml pnpm-workspace.yaml .
copy ./packages/server/package.json ./packages/server/package.json
copy ./packages/db/package.json ./packages/db/package.json
copy ./packages/api-contract/package.json ./packages/api-contract/package.json
copy ./packages/web/package.json ./packages/web/package.json
run pnpm install --filter=!@parkingspaces/web
copy . .

cmd pnpm run --filter @parkingspaces/db run-migrations && pnpm run --filter @parkingspaces/server start
