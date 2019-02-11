# Шаблон сборки фронтенда

## Структура
```bash
./
├── CSS_MOD.php - Обработчик запросов для CSS
├── JS_MOD.php - Обработчик запросов для JS
├── README.md
├── about.php
├── assets - Статика
│   └── img
├── contacts.php
├── css - Скомпилированный SCSS
│   ├── blocks
│   │   ├── bootstrap
│   │   │   ├── bootstrap-grid.css
│   │   │   ├── bootstrap-reboot.css
│   │   │   └── bootstrap.css
│   │   ├── bxslider
│   │   │   └── bxslider.css
│   │   ├── footer
│   │   │   └── footer.css
│   │   └── header
│   │       └── header.css
│   └── common
│       ├── common.css
│       ├── fonts.css
│       ├── global.css
│       └── normalize.css
├── footer.php
├── gulpfile.js
├── header.php
├── index.php
├── js - Скомпилированный JS
│   ├── blocks
│   │   └── slider
│   │       ├── slider.js
│   │       └── slider.js.map
│   ├── common
│   │   ├── common.min.js
│   │   └── common.min.js.map
│   └── lib
│       ├── bxslider
│       │   └── bxslider.js
│       └── jquery
│           └── jquery.js
├── package-lock.json
├── package.json
└── src - Исходники
    ├── js
    │   ├── blocks - JS для отдельных блоков
    │   │   └── slider - Пример блока
    │   │       ├── dep.json - Список зависимостей блока
    │   │       └── slider.js
    │   ├── common - Общий js
    │   │   ├── common.js - Основной файл.
    │   │   ├── css-mod - Загрузчик css на фронтенде
    │   │   │   └── css-mod.js
    │   │   └── js-mod - Загрузчик js на фронтенде
    │   │       └── js-mod.js
    │   └── lib - библиотеки
    │       ├── bxslider
    │       │   └── bxslider.js
    │       └── jquery
    │           └── jquery.js
    └── scss
        ├── blocks - SCSS для отдельных блоков
        │   ├── bootstrap - Вынесен в отдельный блок, если не используется на всем проекте.
        │   │   ├── bootstrap-grid.scss
        │   │   ├── bootstrap-reboot.scss
        │   │   └── bootstrap.scss - Основной файл
        │   ├── bxslider
        │   │   └── bxslider.scss - Основной файл
        │   ├── footer
        │   │   └── footer.scss
        │   └── header
        │       └── header.scss
        ├── common - Общие стили для всего проекта
        │   ├── common.scss - Основной файл
        │   ├── fonts.scss
        │   ├── global.scss
        │   └── normalize.scss
        └── vendor - сторонние стили
```


## Особенности