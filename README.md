# Портфолио Fullstack разработчика

Современное портфолио с продвинутыми анимациями, созданный с использованием Next.js 15, TypeScript, Tailwind CSS, GSAP, Three.js и Framer Motion.

## Особенности

- Адаптивный дизайн, работающий на всех устройствах
- Темная тема с акцентным цветом #74dde3
- Сложные анимации:
  - Three.js частицы в секции Hero
  - Анимации GSAP при прокрутке
  - Анимации Framer Motion для взаимодействий
  - Эффект параллакса
- Интерактивные элементы с плавными переходами
- Полностью анимированная форма контактов
- Панель управления анимациями

## Технологии

- **Next.js 15** с App Router
- **TypeScript** для типобезопасности
- **Tailwind CSS** для стилизации
- **GSAP** для сложных анимаций
- **Three.js** с @react-three/fiber и @react-three/drei для 3D графики
- **Framer Motion** для анимаций компонентов
- **React Context API** для управления темой и анимациями

## Установка

```bash
npm install
```

## Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3001](http://localhost:3001) в вашем браузере для просмотра сайта.

## Настройка email

Для работы формы контактов необходимо настроить email:

1. Скопируйте `.env.example` в `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Отредактируйте `.env.local` и добавьте ваши данные:
   ```
   # Для Yandex Mail
   SMTP_HOST=smtp.yandex.ru
   SMTP_PORT=465
   EMAIL_USER=ваш-email@yandex.ru
   EMAIL_PASS=ваш-пароль-приложения
   CONTACT_EMAIL=Maximviktorovic@mail.ru

   # Для Gmail
   # SMTP_HOST=smtp.gmail.com
   # SMTP_PORT=465
   # EMAIL_USER=ваш-email@gmail.com
   # EMAIL_PASS=ваш-пароль-приложения
   ```

3. Для Gmail и Yandex рекомендуется использовать "пароли приложений" вместо основного пароля.

## Структура проекта

```
src/
├── app/                 # Основные страницы и layout
├── components/          # Переиспользуемые компоненты
├── contexts/            # React Context провайдеры
├── sections/            # Секции главной страницы
└── types/               # TypeScript типы
```

## Настройки анимаций

Пользователи могут настроить анимации через панель управления в правом нижнем углу:
- Включение/выключение всех анимаций
- Настройка интенсивности (слабая, средняя, сильная)

## Лицензия

MIT