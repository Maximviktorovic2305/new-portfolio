# Портфолио Максима Викторовича

Одностраничное портфолио fullstack-разработчика: адаптивный React-интерфейс с тремя визуальными темами, проектами, контактной формой и полноценными SEO-метаданными.

## Стек

- React 19, TypeScript 6, Vite 8 и Tailwind CSS 4
- Motion для анимаций, Lucide для иконок
- EmailJS для контактной формы
- Vitest, Testing Library, ESLint и Prettier
- Feature-Sliced Design с автоматической проверкой границ слоёв

## Локальный запуск

Требуется Node.js 24 и npm 10 или новее.

```bash
npm ci
cp .env.example .env
npm run dev
```

Переменные `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` и `VITE_EMAILJS_PUBLIC_KEY` нужны только для отправки формы. Публичный номер счётчика Метрики задаётся в `VITE_YANDEX_METRIKA_ID`; значение `0` отключает загрузку счётчика. Production-значения задаются только через GitHub Actions Secrets. Все переменные с префиксом `VITE_` попадают в клиентский bundle, поэтому в них нельзя хранить пароли и приватные ключи.

## Проверки

```bash
npm run check
```

Команда проверяет форматирование, ESLint, границы FSD, тесты, известные уязвимости зависимостей, типы и production-сборку.

## Структура

```text
src/
  app/       — композиция приложения
  pages/     — страницы
  widgets/   — крупные секции интерфейса
  features/  — пользовательские сценарии
  entities/  — бизнес-сущности
  shared/    — общая конфигурация и UI
```

Внешние слои импортируют срезы через их публичные `index.ts`; скрипт `npm run lint:fsd` предотвращает запрещённые зависимости между слоями.

## Production

```bash
npm ci
npm run check
npm prune --omit=dev
npm start
```

`npm start` раздаёт каталог `dist` на `0.0.0.0:3015` с политиками безопасности из `serve.json`. GitHub Actions сначала выполняет полный CI, затем передаёт настроенный в Actions Secrets публичный номер счётчика в production `.env`, обновляет `/home/max/portfolio` и перезапускает только PM2-процесс `portfolio`.

Сайт: [itmyportfolio.site](https://itmyportfolio.site/)
