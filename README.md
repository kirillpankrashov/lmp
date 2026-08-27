Кадр

MVP каталога фильмов на React, TypeScript и Vite.

## Локальный запуск

```bash
npm install
npm run dev
```

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
