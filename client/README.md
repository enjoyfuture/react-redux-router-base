# 目录结构
.
├── Root.js (入口，React + Router + Redux)
├── components (公用 react 组件，不涉及到 action 和 reducers，只需根据传入的数据来展示)
├── common (页面公共部分，比如头部和底部，以及相关通用的 action reducers 和 scss 等)
│   ├── App.js (页面父级组件)
│   ├── action (定义通用 action)
│   ├── components
│   ├── images
│   ├── scss
│   └── reducers (定义通用 reducers)
├── pages
│   ├── about
│   ├── home
│   │   ├── HomePage.js
│   │   ├── action.js
│   │   ├── home.scss
│   │   ├── index.js
│   │   └── reducer.js
│   ├── page-1
│   │   ├── Page.js (页面顶层组件)
│   │   ├── index.js (页面入口)
│   │   ├── module-1
│   │   │   ├── action.js
│   │   │   ├── components
│   │   │   │   ├── com-1
│   │   │   │   │   ├── README.md
│   │   │   │   │   └── index.js
│   │   │   │   └── com-2
│   │   │   │       ├── README.md
│   │   │   │       ├── demo.png
│   │   │   │       ├── index.js
│   │   │   │       └── style.scss
│   │   │   └── reducer.js
│   │   ├── module-2
│   │   │   ├── action.js
│   │   │   ├── components
│   │   │   │   └── com-1
│   │   │   │       ├── index.js
│   │   │   │       └── style.scss
│   │   │   └── reducer.js
│   │   ├── reducers.js
│   │   └── routes.js
│   └── page-2
│       ├── Page.js
│       ├── film
│       │   ├── FilmPage.js
│       │   ├── action.js
│       │   ├── components
│       │   │   ├── Film
│       │   │   │   ├── index.js
│       │   │   │   └── style.scss
│       │   │   └── FilmList
│       │   │       ├── index.js
│       │   │       └── style.scss
│       │   └── reducer.js
│       ├── index.js
│       ├── person
│       │   ├── action.js
│       │   ├── components
│       │   │   ├── Person
│       │   │   │   └── index.js
│       │   │   ├── PersonForm
│       │   │   │   ├── index.js
│       │   │   │   └── style.scss
│       │   │   ├── PersonItem
│       │   │   │   ├── index.js
│       │   │   │   └── style.scss
│       │   │   └── PersonList
│       │   │       ├── index.js
│       │   │       ├── no_items.png
│       │   │       └── style.scss
│       │   └── reducer.js
│       └── routes.js
└── utils (工具类)
    ├── error-handler.js
    ├── fetch.js
    └── perfect.js
