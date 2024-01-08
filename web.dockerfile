from node:20.5.0-alpine as build
workdir /app
run corepack enable && corepack prepare pnpm@8.10.2 --activate

copy ./package.json pnpm-lock.yaml pnpm-workspace.yaml .
copy ./packages/server/package.json ./packages/server/package.json
copy ./packages/db/package.json ./packages/db/package.json
copy ./packages/api-contract/package.json ./packages/api-contract/package.json
copy ./packages/web/package.json ./packages/web/package.json
run pnpm install
copy . .

workdir /app/packages/web
run pnpm run build

from nginx:1.25.3-alpine
workdir /app
copy --from=build /app/packages/web/dist /usr/share/nginx/html

cmd nginx -g 'daemon off;'