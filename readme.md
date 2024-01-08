# parkingspaces

Приложение для работы с информацией о парковочных местах.

## Запуск

Для работы приложения требуется база данных PostgreSQL c расширением PostGIS. Её можно запустить с помощью Docker Compose: `docker compose -f packages/db/test-db.docker-compose.yml up`

### Запуск с pnpm:

1. Установить зависимости: `pnpm i`
2. Выполнить миграции: `pnpm run --filter db run-migrations`
3. Запустить сервер: `pnpm run --filter server start`
4. Запустить клиент: `pnpm run --filter web start`

### Запуск с Docker Compose:

Перед выполнением `docker compose up`, требуется установить две переменные окружения:

1. `DB_CONNECTION_STRING` - адрес для подключения к базе данных
2. `VITE_API_URL` - адрес, по которому будет доступен сервер
