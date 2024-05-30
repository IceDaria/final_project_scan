# Финальный проект курса. Фронтэнд часть для проекта помпании "СКАН"
## Постановка задачи
Компания «СКАН» разработала новый API для поиска публикаций о компании (юридическом лице) в средствах массовой информации по ИНН. Серверная часть приложения уже готова, ваша задача — разработать клиентскую часть.

## Функциональные требования
Клиентская часть сервиса состоит из:

- главной страницы,
- формы авторизации,
- формы для ввода параметров запроса,
- страницы с выводом результатов запроса.
## Требования к вёрстке
1. Вёрстка должна соответствовать макету. Добиваться Pixel Perfect соответствия не обязательно, но основные моменты должны быть соблюдены:
- наличие всех элементов интерфейса,
- цветовая гамма,
- шрифты,
- размеры,
- отступы.
2. Приложение должно корректно отображаться и работать на мобильных устройствах. Дизайн для мобильной версии вы найдёте в макете.
3. Соблюдайте семантическую вёрстку. На каждой странице должны присутствовать разделы <header>, <main> и <footer>, а также заголовок <h1>. Кнопки должны быть реализованы элементом , выпадающий список — элементом <select> и так далее.
4. Если какой-либо элемент доступен для взаимодействия (ссылка, кнопка), при наведении курсора должен появляться cursor: pointer.
5. Внешний вид самого элемента тоже должен меняться при наведении курсора. Пример: нижнее подчёркивание текста у ссылки, другой цвет фона у кнопки.
6. Используйте любой вариант подключения стилей на ваше усмотрение:
- общий файл стилей проекта,
- CSS-модули,
- специальные React-библиотеки для стилизации компонентов (например, Styled Components).
7. Использовать селекторы по тегу и ID для задания стилей не рекомендуется, старайтесь отдавать предпочтение классам.
8. Лучше всего экспортировать картинки из Figma в формате SVG, чтобы качество изображений было стабильным на разных разрешениях.
## Требования к коду
1. Проект должен был выполнен на React.
2. Интерфейс должен быть поделён на компоненты. Перед началом работы обдумайте, какие компоненты вы будете использовать. Деление должно быть логичным и оправданным.
3. Проект будет работать со множеством данных. Рекомендуем использовать более продвинутый инструмент хранения и изменения данных, чем обычный state. Например, useReducer, React Context или Redux.
4. При написании кода старайтесь следовать принципам:
- KISS (Keep It Short and Simple — не усложняй),
- DRY (Don’t Repeat Yourself — не повторяйся).
Вы не ограничены в использовании любых инструментов и дополнительных библиотек (например, для реализации карусели). Но старайтесь следить за тем, чтобы их применение было оправдано и не усложняло код без необходимости.
## Прочие требования
1. Пишите код аккуратно, с соблюдением форматирования и отступов.
2. Осмысленно называйте компоненты, переменные и функции.
3. Используйте современный синтаксис: функциональные React-компоненты и хуки, стрелочные функции, декомпозицию и так далее.

# This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
