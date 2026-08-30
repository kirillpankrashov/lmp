Кадр

MVP каталога фильмов на React, TypeScript и Vite.

## Локальный запуск

```bash
npm install
npm run dev
```

Для загрузки фильмов нужен API-ключ TMDB. Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Затем укажите ключ в переменной `VITE_TMDB_API_KEY`. Приложение использует один запрос TMDB: `GET /3/discover/movie`.

## Публикация на GitHub Pages

1. Отправьте изменения в ветку `main`:

   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. В репозитории откройте `Settings → Pages` и выберите `GitHub Actions` в поле `Source`.
3. После завершения workflow приложение будет доступно по адресу:
   `https://kirillpankrashov.github.io/lmp/`

Каждый push в `main` запускает новую сборку и публикацию автоматически.
