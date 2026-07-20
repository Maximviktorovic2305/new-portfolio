# Security best-practices report

Дата проверки: 2026-07-20  
Область: React/TypeScript-клиент, статический production-сервер, зависимости и GitHub Actions-деплой.

## Итог

Критических и высоких проблем не обнаружено. Найденные в ходе рефакторинга проблемы исправлены; остаются два низкорисковых эксплуатационных пункта, требующих настройки внешних сервисов.

## Исправленные находки

### SEC-01 — Medium — самописный production-сервер

Старый `scripts/start-prod.mjs` совмещал раздачу файлов, маршрутизацию и обработку путей. Он удалён. Production теперь использует поддерживаемый `serve@14.2.6`; листинг каталогов и symlink-доступ отключены, SPA rewrite задан явно (`serve.json:3-6`).

### SEC-02 — Medium — отсутствовали browser security headers

Добавлены CSP, COOP, CORP, Permissions Policy, Referrer Policy, clickjacking- и MIME-защита (`serve.json:10-31`). Inline JSON-LD разрешён точным SHA-256 hash, а `unsafe-eval` не используется. Политика проверяется автоматическим тестом (`src/test/seo-security.test.ts`).

### SEC-03 — Medium — контактная форма принимала неограниченные данные

Введены нормализация, проверка обязательных полей, email и предельных длин (`src/features/send-message/model/validation.ts:1-43`), honeypot и доступные статусы формы (`src/features/send-message/ui/ContactForm.tsx:39-179`). Для EmailJS включены `blockHeadless` и клиентский rate limit (`src/features/send-message/lib/emailjs.ts:24-39`).

### SEC-04 — Low — лишняя поверхность зависимостей и HTML sink

Удалены неиспользуемые UI-компоненты и пакеты, включая единственный неиспользуемый участок с HTML injection sink. ESLint теперь запрещает `innerHTML` и `eval` (`eslint.config.js`), `npm audit --audit-level=high` сообщает 0 известных уязвимостей.

### SEC-05 — Low — mutable action reference и избыточный deploy scope

GitHub Action закреплён на полном commit SHA, workflow получил минимальное `contents: read`, временный deploy key удаляется через `trap`, GitHub host key проверяется, а PM2 перезапускает только процесс `portfolio` (`.github/workflows/deploy-portfolio.yml:8-104`).

## Остаточные риски

### SEC-06 — Low — защита EmailJS ограничена клиентом

`VITE_EMAILJS_*` по архитектуре Vite публичны, а browser-side rate limit можно обойти прямым запросом. Следует оставить в EmailJS Dashboard только разрешённый origin `https://itmyportfolio.site`, включить доступные quota/abuse-ограничения и контролировать расход. Приватные ключи в `VITE_*` помещать нельзя.

### SEC-07 — Informational — заголовок версии Nginx

Текущий reverse proxy раскрывает версию Nginx в `Server`. Это не уязвимость приложения, но после обновления системных пакетов администратору сервера рекомендуется установить `server_tokens off` в глобальном Nginx-конфиге и перезагрузить конфигурацию. Для этого нужны root-права и отдельная проверка всех сайтов на сервере.

## Проверки

- Строгий TypeScript с `noUncheckedIndexedAccess` и запретом неиспользуемого кода.
- Type-aware ESLint, React Hooks, React Refresh и jsx-a11y.
- Автоматическая проверка границ Feature-Sliced Design.
- 17 unit/integration тестов, включая SEO, CSP hash, форму и безопасный fallback изображения.
- Production build без source maps.
- `npm audit`: 0 известных уязвимостей.
