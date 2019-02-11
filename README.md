# Шаблон сборки фронтенда

## Структура
```bash
./
├── CSS_MOD.php  #Обработчик запросов для CSS
├── JS_MOD.php # Обработчик запросов для JS
├── README.md
├── about.php
├── assets # Статика
│   └── img
├── contacts.php
├── css # Скомпилированный SCSS
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
├── footer.php # Подключается единственный js <script defer src="js/common/common.min.js"></script>
├── gulpfile.js # Конфигурация gulp
├── header.php
├── index.php
├── js # Скомпилированный JS
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
└── src # Исходники
    ├── js
    │   ├── blocks # JS для отдельных блоков
    │   │   └── slider # Пример js блока
    │   │       ├── dep.json # Список зависимостей блока
    │   │       └── slider.js
    │   ├── common # Общий js
    │   │   ├── common.js # Основной файл.
    │   │   ├── css-mod # Загрузчик css на фронтенде
    │   │   │   └── css-mod.js
    │   │   └── js-mod # Загрузчик js на фронтенде
    │   │       └── js-mod.js
    │   └── lib - библиотеки
    │       ├── bxslider
    │       │   └── bxslider.js
    │       └── jquery
    │           └── jquery.js
    └── scss
        ├── blocks # SCSS для отдельных блоков
        │   ├── bootstrap # Вынесен в отдельный блок, если не используется на всем проекте.
        │   │   ├── bootstrap-grid.scss
        │   │   ├── bootstrap-reboot.scss
        │   │   └── bootstrap.scss # Основной файл
        │   ├── bxslider
        │   │   └── bxslider.scss # Основной файл
        │   ├── footer
        │   │   └── footer.scss
        │   └── header
        │       └── header.scss
        └── common # Общие стили для всего проекта
            ├── common.scss # Основной файл
            ├── fonts.scss # Подключается в основном через @import 'fonts';
            ├── global.scss
            └── normalize.scss

```

## Описание работы

После загрузки html, создаются 2 объекта для загрузки JS и CSS.

```javaScript
var css = new CSS_MOD;
css.init({
    blockClassPrefix:"css_mod__",
    url: 'CSS_MOD.php',
    onCssSet: function(){
        console.log('oncssset method');
    },
    onInit: function(){
        console.log('oninit css');
    }
});

var js = new JS_MOD;
js.init({
    blockClassPrefix:"js_mod__",
    url: 'JS_MOD.php',
    onJsSet: function(){
        console.log('on js set method');
        /**/
    },
    onInit: function(){
        console.log('oninit js');
    }
});

```
После этого, отправляются запросы для получения необходимого css & js к обработчикам на сервере.
```bash
./
├── CSS_MOD.php  #Обработчик запросов для CSS
├── JS_MOD.php # Обработчик запросов для JS
```

Запрос содержит массив блоков которые помечены классами с соответстующими префиксами для JS & CSS и присутствуют на текущей странице.

`css_mod__`

`js_mod__`

В ответах получаем json. Json парсится и добавляеется на страницу. 
Так же полученный json записывается в localStorage. Адрес страницы является ключем.

При следующей загрузке страницы, происходит проверка на наличие кеша. 
Если кещ есть, то добавляем его на страницу.
Далее делается запрос на сервер. В ответе присутствует значение хеш суммы для js или css ресурсов данной страницы.
Это значение сравнивается со значением сохраненным в localStorage. Если хеши отличаются, то стили страницы обновляються ресурсами этого ответа и кэш перезаписывается.

## Callbacks

### Для js

`onInit` - Вызывается после создания объекта js.

`onJsSet` - Вызывается после добавления js на страницу. Не зависит от того откуда получен js(из кеша или нет).
Может быть вызван дважды, если кеш устарел. При установке закешированного js и при получении актуального js.

Необходимо учитывать этот факт при написании js.


### Для css
`onInit` - Вызывается после создания объекта css.

`onCssSet` - Вызывается после добавления css на страницу. Не зависит от того откуда получен css(из кеша или нет).


## Методы

Объекты созданные конструктором `CSS_MOD` и `JS_MOD` имеют метод `update` предназначеный для обновления CSS & JS из стороннего кода.

Может понадобиться при динамическом добавлении новых блоков на страницу.

```javaScript
    css.update();
    js.update();
```


## Органицация модулей(блоков)

### CSS

```bash
    └── scss
        ├── blocks # SCSS для отдельных блоков
        │   ├── bootstrap # Вынесен в отдельный блок, если не используется на всем проекте.
        │   │   ├── bootstrap-grid.scss
        │   │   ├── bootstrap-reboot.scss
        │   │   └── bootstrap.scss # Основной файл
        │   ├── bxslider
        │   │   └── bxslider.scss # Основной файл
        │   ├── footer
        │   │   └── footer.scss
        │   └── header
        │       └── header.scss
        └── common # Общие стили для всего проекта
            ├── common.scss # Основной файл
            ├── fonts.scss # Подключается в основном через @import 'fonts';
            ├── global.scss
            └── normalize.scss
```

Блоком является любая дирректория в дирректории blocks содержащая scss файл одноименный с родительской директории.
Все дополнительные файлы блока должны подключаться в основном файле спомощью `@import '';`


### JS

```bash
    ├── js
    │   ├── blocks # JS для отдельных блоков
    │   │   └── slider # Пример js блока
    │   │       ├── dep.json # Список зависимостей блока
    │   │       └── slider.js
    │   ├── common # Общий js
    │   │   ├── common.js # Основной файл.
    │   │   ├── css-mod # Загрузчик css на фронтенде
    │   │   │   └── css-mod.js
    │   │   └── js-mod # Загрузчик js на фронтенде
    │   │       └── js-mod.js
    │   └── lib - библиотеки
    │       ├── bxslider
    │       │   └── bxslider.js
    │       └── jquery
    │           └── jquery.js
```

Блоком является любая дирректория в дирректории blocks содержащая js файл одноименный с родительской директории.
В файле dep.js можно задать объект зависимостей блока
```javaScript
{
    "libs":"jquery, bxslider"
}
```
которые будут подключены в начало блока из директории lib.

## Основные CSS & JS

### CSS 

Основные стили будут добавлены в самое начало для всех страниц проекта.

Основные стили должны быть расположены в директории common

```bash
 └── scss
        └── common # Общие стили для всего проекта
            ├── common.scss # Основной файл
            ├── fonts.scss # Подключается в основном через @import 'fonts';
            ├── global.scss
            └── normalize.scss
```

### JS

Основной JS. Включает в себя саму библиотеку.

Сборка `common.js` Настраивается в gulpfile.js. Возможно подключение дополнительного js кода, который должен быть доступен на всем проекте.

```bash
└── src # Исходники
    └── js
        └── common # Общий js
            ├── common.js # Основной файл.
            ├── css-mod # Загрузчик css на фронтенде
            │   └── css-mod.js
            └── js-mod # Загрузчик js на фронтенде
                └── js-mod.js
```












