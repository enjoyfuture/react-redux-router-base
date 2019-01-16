const restrictedGlobals = require("eslint-restricted-globals");
/**
 * eslint rules 整理，基于 eslint v5.11.0，eslint-plugin-react v7.11.1，后续会持续升级的
 "off" or 0 - turn the rule off
 "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
 2 or 2 - turn the rule on as an error (exit code is 1 when triggered)
 **/
/* eslint-disable max-len */
module.exports = {
  "rules": {
    // Possible Errors

    // 检测 for loop 书写是否正确，以下写法都是错误的
    // for (var i = 0; i < 10; i--) {}
    // for (var i = 10; i >= 0; i++) {}
    "for-direction": 2,
    "getter-return": [2, { allowImplicit: true }], // get 方法中是否有 return ，allowImplicit: true 允许返回 undefined
    "no-async-promise-executor": 2, // 不允许在 Promise 中使用 async 函数
    "no-await-in-loop": 2, // Disallow await inside of loops
    "no-compare-neg-zero": 2, // 不要出现负零，即 -0
    "no-cond-assign": 2, // 条件语句中，不应该出现 = ，比如 if (x = 2) {  } 是会报错的
    "no-console": 0, // 是否允许 console
    "no-constant-condition": 1, // 是否允许使用常量式表达式 if (false) { }
    "no-control-regex": 2, // 是否允许在正则表达式中使用控制字符
    "no-debugger": 2, // 是否允许使用 debugger
    "no-dupe-args": 2, // 函数参数是否允许有重复的，如果设置了严格模式，可以不用设置该选项
    "no-dupe-keys": 2, // 是否允许对象中有相同的key
    "no-duplicate-case": 2, // 检测case语句中，是否有重复的case变量值
    "no-empty": 2, // 是否允许空的表达式，if (foo) {}
    "no-empty-character-class": 2, // 是否允许空的正则表达式，比如 var foo = /^abc[]/;
    /**
     异常时给ex赋值是不允许的
     try {
     // code
    } catch (e) {
        e = 12; //error Do not assign to the exception parameter.
    }
     **/
    "no-ex-assign": 2,
    "no-extra-boolean-cast": 2, // 在条件语句中不允许使用!!  比如 if (!!foo) {   }   /*error Redundant double negation in an if statement condition.*/
    "no-extra-parens": 0, // 不要使用冗余的括号，比如 a = (b * c);
    "no-extra-semi": 2, // 不要使用多余的分号;  比如 var x = 5;;
    "no-func-assign": 2, // 不允许给函数重新赋值  function foo() {} foo = bar; /*error "foo" is a function.*/
    "no-inner-declarations": 2, // 不要在函数体或程序块（if或循环）中声明函数
    "no-invalid-regexp": 2, // 不允许定义无效的正则表达式
    "no-irregular-whitespace": 2, // 不允许使用除空格和制表位意外的空白字符，比如 \u222B
    "no-misleading-character-class": 2, // 正则表达式中不建议使用特殊表情符号，比如 /^[Á]$/u /^[❇️]$/u 等
    "no-obj-calls": 2, // 不允许调用全局的函数对象，比如 Math 和 JSON var x = Math(); /*error "Math" is not a function.*/ var y = JSON(); /*error "JSON" is not a function.*/
    "no-prototype-builtins": 2, // 不建议直接使用 Object.prototypes ，而使用 call 来调用，比如 var hasBarProperty = {}.hasOwnProperty.call(foo, "bar");
    "no-regex-spaces": 2, // 正则表达式中不允许有空格
    "no-sparse-arrays": 2, // 此开关控制是否可以用稀疏数组
    "no-template-curly-in-string": 2, // 不允许字符串的模板，比如 "Hello ${name}!" 会报错
    "no-unexpected-multiline": 2, // 避免多行的表达式
    "no-unreachable": 2, // 避免书写不可达的代码，比如在return后添加新的代码，或抛出异常，中断语句后
    "no-unsafe-finally": 2, // 不用在 finally 语句中使用 return 或抛出异常（throw）
    "no-unsafe-negation": 2, // 在in 或 instanceof 表达式中不要否定变量 if(!a in b) {} 是错误的，应该写成 if(!(a in b)){}
    "require-atomic-updates": 2, // 在 += 中不要使用 await 或 yield ，比如 result += await somethingElse;
    "use-isnan": 2, // 不要用 NaN 跟变量作比较，而是应该调用 isNaN()
    "valid-typeof": [2, { "requireStringLiterals": true }], // 验证 typeof 与比较的值，是否为以下几种情况，"undefined", "object", "boolean", "number", "string", and "function" { "requireStringLiterals": true } 表示值必须是字符串

    // Best Practices
    "accessor-pairs": 0, // 定义对象属性时，setter 和 getter应该成对出现，如果不是成对的，会出现警告信息的
    "array-callback-return": [2, { "allowImplicit": true }], // 在数组方法中,回调函数需要返回的值应该加上 return,比如在 array.reduce中，加上 { "allowImplicit": true } 表示可以直接 return 返回一个 undefined
    "block-scoped-var": 2, // 在快作用于中不允许使用var来定义变量
    "class-methods-use-this": [2, {
      exceptMethods: [
        "render",
        "getInitialState",
        "getDefaultProps",
        "getChildContext",
        "componentWillMount",
        "UNSAFE_componentWillMount",
        "componentDidMount",
        "componentWillReceiveProps",
        "UNSAFE_componentWillReceiveProps",
        "shouldComponentUpdate",
        "componentWillUpdate",
        "UNSAFE_componentWillUpdate",
        "componentDidUpdate",
        "componentWillUnmount",
        "componentDidCatch",
        "getSnapshotBeforeUpdate"
      ],
    }], // 在 class 定义的方法中，没有使用 this，会认为是有问题的
    "complexity": 0, // 判断语句复杂度，关闭该规则
    "consistent-return": 0, // 不同的分支返回的类型应该一样
    "curly": [2, "multi-line"], // 在循环或判断语句中是否需要加花括号
    "default-case": 2, // 在 switch语句中，检测是否有默认分支，如没有需要加上注释 no default
    "dot-location": [2, "property"], // 在换行时，用来检测对象的点是换行之前还是之后，这里设为放在下一行
    "dot-notation": 2, // 对于对象属性应该用点表达式，不应该用[] var x = foo["bar"]; 是错误的，应该 var x = foo.bar;  但 var x = foo[bar]; 是正确的，因为bar是变量
    "eqeqeq": [2, "always", {"null": "ignore"}], // 使用恒等来比较两个变量，允许 null
    "guard-for-in": 2, // 在 for in 表达式中需要调用 hasOwnProperty 来判断是否为自有的属性
    "max-classes-per-file": [2, 1], // 开启后，每个文件只能定义第二个参数设置的个数 class 类
    "no-alert": 2, // 不允许用alert语句
    "no-caller": 2, // 不允许用 arguments.caller 和 arguments.callee
    "no-case-declarations": 2, // 在 case 语句中使用声明式语句时，需要用 {} 括起来
    "no-div-regex": 0, // 消除除法运算符迷惑用户使用 例如 return /=foo/; 应该写成 return /\=foo/;
    "no-else-return": [2, { "allowElseIf": false }], // 如果在if语句中有return，则在else中可以不用return，可以放到最外面返回，默认 else if 可以使用 return，这里设置不可以
    "no-empty-function": [2, {
      allow: [
        "arrowFunctions",
        "functions",
        "methods",
      ]
    }], // 不要定义空函数
    "no-empty-pattern": 2, // 不允许空的解构赋值，例如 var {a: {}} = foo;
    "no-eq-null": 0, // 对于null比较也应该使用 === 来比较
    "no-eval": 2, // 不允许使用 eval()
    "no-extend-native": 2, // 不允许修改扩展内置对象的属性，比如 Object.prototype.a = "a";
    "no-extra-bind": 2, // 可以规范代码，防止滥用 bind 方法
    "no-extra-label": 2, // 当使用 label 表达式时，检测不必要的 label 表达式
    "no-fallthrough": 2, // 是否检测switch语句中 case 后没有break，return或throw
    "no-floating-decimal": 2, // 对于浮点数，不能省略.前或.后的数字2
    "no-global-assign": [2, {"exceptions": ["Object"]}], // 不要给全局变量赋值，需要先定义在赋值
    "no-implicit-coercion": [0, {"string": false}], // 不要使用隐身转换，应该使用直接转换，如果针对 boolean number string ，比如 var n = +foo; 应该为 var n = Number(foo); 代替
    "no-implicit-globals": 0, // 是否允许定义全局的 function
    "no-implied-eval": 2, // 不要使用隐式调用eval的语句，比如 setInterval("alert("Hi!");", 122);
    "no-invalid-this": 0, // 用来检测 this 关键字使用的地方是否正确，我们可以设置关闭该规则
    "no-iterator": 2, // 在ES6中有__iterator__属性，建议不要修改该属性值
    "no-labels": [2, { "allowLoop": false, "allowSwitch": false }], // 不建议使用 label 表达式
    "no-lone-blocks": 2, // 禁止内部不必要的嵌套块
    "no-loop-func": 2, // 不要在循环中定义函数，并且该函数中调用了循环变量
    "no-magic-numbers": [0, { // 一些系数最好定义为常量
      "ignore": [],
      "ignoreArrayIndexes": true,
      "enforceConst": true,
      "detectObjects": false,
    }
    ],
    "no-multi-spaces": [2, { // 表达式中是否允许有多余的空格
      "ignoreEOLComments": false
    }],
    "no-multi-str": 2, // 是否允许多行字符串
    "no-new": 2, // 不允许实例化类，而没有赋给任何变量
    "no-new-func": 2, // 不建议使用 new Function 来声明函数
    "no-new-wrappers": 2, // 对于String, Number, 和 Boolean，不建议使用 new，即 new String 等
    "no-octal": 2, // 不允许使用八进制数字
    "no-octal-escape": 2, // 不允许使用八进制转义字符串
    "no-param-reassign": [2, {
      "ignorePropertyModificationsFor": [
        "acc", // for reduce accumulators
        "accumulator", // for reduce accumulators
        "e", // for e.returnvalue
        "ctx", // for Koa routing
        "req", // for Express requests
        "request", // for Express requests
        "res", // for Express responses
        "response", // for Express responses
        "$scope", // for Angular 1 scopes
      ]
    }], // 如果开启，则不允许重新修改函数参数值，或者参数属性值
    "no-proto": 2, // 不建议使用该属性 __proto__
    "no-redeclare": 2, // 不允许重复声明同一个变量
    "no-restricted-properties": [2, { // 不允许使用的对象属性或方法，这些不建议使用或将会废弃
      "object": "arguments",
      "property": "callee",
      "message": "arguments.callee is deprecated"
    }, {
      "object": "global",
      "property": "isFinite",
      "message": "Please use Number.isFinite instead",
    }, {
      "object": "self",
      "property": "isFinite",
      "message": "Please use Number.isFinite instead",
    }, {
      "object": "window",
      "property": "isFinite",
      "message": "Please use Number.isFinite instead",
    }, {
      "object": "global",
      "property": "isNaN",
      "message": "Please use Number.isNaN instead",
    }, {
      "object": "self",
      "property": "isNaN",
      "message": "Please use Number.isNaN instead",
    }, {
      "object": "window",
      "property": "isNaN",
      "message": "Please use Number.isNaN instead",
    }, {
      "object": "__defineGetter__",
      "message": "Please use Object.defineProperty instead.",
    }, {
      "property": "__defineSetter__",
      "message": "Please use Object.defineProperty instead.",
    }, {
      "object": "Math",
      "property": "pow",
      "message": "Use the exponentiation operator (**) instead.",
    }],
    "no-return-assign": 2, // 不允许在return语句中有赋值语句
    "no-return-await": 2, // disallow unnecessary return await
    "no-script-url": 2, // 不要使用javascript:url，比如 location.href = "scripts:void(2)";是错误的
    "no-self-assign": [2, {"props": false}],// 不建议自己给自己赋值，比如 foo = foo
    "no-self-compare": 2, // 不允许变量自己跟自己做比较
    "no-sequences": 2, // 需要正确的使用逗号操作符
    "no-throw-literal": 2, // 抛出异常时，请使用 new Error()
    "no-unmodified-loop-condition": 2, // 用来检测循环中的条件值始终没有改变
    "no-unused-expressions": 2, // 不允许出现未使用的表达式
    "no-unused-labels": 2, // 定义了 label 而没有被调用
    "no-useless-call": 2, // 对于不必要使用 call 或 apply，建议不要使用，直接调用即可
    "no-useless-catch": 2, // 不要在 catch 中只写了抛出错误，而没有处理错误
    "no-useless-concat": 2, // 不必要的字符串连接最好去掉，写在一起
    "no-useless-escape": 2, // 不必要的转义就不要转义了
    "no-useless-return": 2, // 不允许出现不必要的 return 语句
    "no-void": 2, // 不建议使用void操作符
    "no-warning-comments": 0, // 对于注释中的 TODO FIXME XXX 等，是否给出提示，建议开发中设置为1，部署的时候设置为 2
    "no-with": 2, // 不允许使用with表达式语句
    "prefer-promise-reject-errors": 2, // 对于Promise.reject，参数必须是一个 Error 对象，比如 Promise.reject(5); 是不允许的，应该写成 Promise.reject(new Error("something bad happened"));
    "radix": 2, // 在调用 parseInt 应该指定基数
    "require-await": 0, // 对于 async 表达式，必须有对应的 await 表达式
    "require-unicode-regexp": 0, // 对于两个字符或多字符的匹配，需要加上修饰符 u，比如 /aaa/u  /^[👍]$/u
    "vars-on-top": 0, // 所有变量声明是否都放在函数最上面或过程快最上面
    "wrap-iife": [2, "inside"], // 立即执行函数是里面包裹还是外面包裹，默认是外面包裹，即 outside
    "yoda": 2, // 不允许使用 yoda 条件表达式，常量值在前的比较表达式，比如： if(1 === a){ }

    // Variables
    "init-declarations": 0, // 声明变量的时候赋值，还是在其他地方赋值，我们可以关闭该规则
    "no-delete-var": 2, // 不能删除变量，而只能删除属性
    "no-label-var": 2, // 使用标签label语句时，不要跟变量同名，建议不要使用标签
    "no-restricted-globals": [2, "isFinite", "isNaN"].concat(restrictedGlobals), // 不要使用全局变量，后面指定那些是全局变量，当使用这些时会报错
    "no-shadow": [2, { "hoist": "never", "allow": ["Map", "location", "history", "caches", "status", "origin", "window", "name", "performance", "id", "path", "err"], "builtinGlobals": false }], // 全局和局部变量名不要用相同的名称
    "no-shadow-restricted-names": 2, // 不要使用 NaN, Infinity, undefined 等内部定义的变量来声明变量
    "no-undef": 2, // 不要使用还没有定义的变量或函数，如果引用第三方定义的变量，可以用 /*global */ 来标注，例如 /*global require define:true*/
    "no-undef-init": 2, // 定义变量的时候，如果没有合适的赋值，不用显式设置 undefined ，因为默认声明而未赋值的变量，其默认值为 undefined
    "no-undefined": 0, // 代码中不建议使用 undefined ，包括命令和赋值等
    /**
     定义了，但没有使用该变量，vars 有两种选择 all 和 local；args 有三种选择，all after-used 和 none
     我们可以只检测变量而不检测函数参数，可以把 args 设为 none
     **/
    "no-unused-vars": [2, {"vars": "all", "args": "none", ignoreRestSiblings: true}],
    "no-use-before-define": [2, "nofunc"], // 变量和函数的声明需要在使用之前，可以设置 [2, "nofunc"]，只检测变量，而不检测函数和 class，"nofunc" 相当于 { "functions": false, "classes": true }.

    // Node.js and CommonJS
    "callback-return": 0, // 调用callback时需要加上return语句
    "global-require": 0, // require加载依赖应该放在代码最上边显示，比如 var fs = require("fs");
    "handle-callback-err": 0, // 如果回调函数中有错误变量（比如err），我们需要判断处理错误的情况
    "no-buffer-constructor": 2, // 不建议使用 Buffer 构造函数，比如： new Buffer(5) 是错误的
    "no-mixed-requires": 2, // require与其他变量声明应该不要放在一起
    "no-new-require": 2, // 不用对表达式 require 直接使用 new,例如 var appHeader = new require("app-header");
    "no-path-concat": 2, // 不要使用 __dirname 或 __filename 与字符串连接生成路径，应该使用 path.join(__dirname, "foo.scripts"); 或 path.resolve(__dirname, "foo.scripts");
    "no-process-env": 0, // 在node环境中，不建议使用 process.env ，而使用 config 来配置
    "no-process-exit": 0, // 不要直接调用 process.exit();
    "no-restricted-modules": 0, // 限制使用某些模块，比如 no-restricted-modules: [2, "fs"] ，不能使用fs模块
    "no-sync": 0, // 我们尽量使用异步方法来代替同步方法，比如操作文件等，

    // Stylistic Issues
    "array-bracket-newline": 0, // 数组最后一个 ] 是否换行，默认规则为，写在一行不需要，多行需要
    "array-bracket-spacing": 2, // 数组元素前后是否要加一空格，默认为不必要加，如 var arr = [ "foo", "bar" ];  是不正确的写法
    "array-element-newline": 0, // 数组元素是写在一行，还是多行，该规则不用开启
    "block-spacing": 2, // 花括号与语句间应该有空格
    "brace-style": 2, // 条件或循环语句中，花括号是另起一行，还是与当前语句在同一行，默认跟当前语句在同一行
    "camelcase": [2, {
      "allow": ["UNSAFE_componentWillReceiveProps"]
    }], // 驼峰式命名变量或属性
    "capitalized-comments": 0, // 注释的大小写格式限制
    "comma-dangle": [2, {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline"
    }], // 对象最后一个属性，是否需要逗号
    "comma-spacing": 2, // 逗号表达式前后空格情况，默认前面没有，后边应该添加
    "comma-style": 2, // 当换行时，逗号是在当前行还是下一行，默认是当前行
    "computed-property-spacing": 2, // 用[]取属性值时，是否应该有空格
    "consistent-this": [0, "self"], // 闭包的时候，this 用变量声明上下文应该统一，该变量就不要用在其他定义变量上
    "eol-last": 2, // 在行的末尾至少空上一行
    "func-call-spacing": 2, // 函数名与括号之间是否需要一个空格
    "func-name-matching": 0, // 定义函数变量时，匿名名称是否应该跟变量名称一致，默认一致
    "func-names": 0, // 函数表达式需要一个名称，包括匿名函数，该规则可以关闭
    "func-style": [0, "declaration", {  // 是声明式的函数，还是定义变量式的函数，我们采用声明式，但箭头函数允许变量式
      "allowArrowFunctions": true
    }],
    "function-paren-newline": [0, "multiline"], // 函数参数书写格式，是否要换行
    "id-blacklist": 0, // 指定一些黑名单变量，这些变量不能出现在代码中，比如 "id-blacklist": [2, "data", "err", "e", "cb", "callback"],
    "id-length": 0, // 定义变量名或属性名的最小最大长度
    "id-match": 0, // 规范变量名或属性名的命名规范
    "implicit-arrow-linebreak": 0, // 箭头函数如果有 return 时，但没有写，表达式应该在一行显示
    // 先关掉该规则，在最新版本中会报错 TypeError: Cannot read property "range" of null
    "indent": [0, 2, {
      "SwitchCase": 1,
      "VariableDeclarator": {"var": 1, "let": 1, "const": 2},
      "outerIIFEBody": 1,
      "FunctionDeclaration": {
        "parameters": 1,
        "body": 1
      },
      "FunctionExpression": {
        "parameters": 1,
        "body": 1
      },
      "CallExpression": {
        "arguments": 1
      },
      "ArrayExpression": 1,
      "ObjectExpression": 1,
      "ImportDeclaration": 1,
      "flatTernaryExpressions": false,
      "ignoredNodes": ["JSXElement", "JSXElement > *", "JSXAttribute", "JSXIdentifier", "JSXNamespacedName", "JSXMemberExpression", "JSXSpreadAttribute", "JSXExpressionContainer", "JSXOpeningElement", "JSXClosingElement", "JSXText", "JSXEmptyExpression", "JSXSpreadChild"],
      "ignoreComments": true,
    }], // 缩进，我们采用2个空格来缩进
    "jsx-quotes": [2, "prefer-double"], // jsx属性值应该用双引号
    "key-spacing": 2, // 键值之间的空格
    "keyword-spacing": 2, // 关键字 if, else, for, while, do, switch, try, catch, finally, and with 要求有空格
    "line-comment-position": 0, // 注释是放在上面还是旁边，不需要开启该规则
    "linebreak-style": 0, // 验证 unix (LF) or windows (CRLF)
    "lines-around-comment": 0, // 注释的规范写法，在旁边或上方
    "lines-between-class-members": 2, // 在 class 中每个成员之前是否加一空行，开启则加
    "max-depth": [0, 12], // 限制语句块最大嵌套深度
    "max-len": [ // 限定每行最大长度
      2, 200, 2, {
        "ignoreUrls": true,
        "ignoreComments": false,
        "ignoreRegExpLiterals": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
      }
    ],
    "max-lines": [0, {"max": 800, "skipBlankLines": true, "skipComments": true}], // 指定每个文件最大行
    "max-lines-per-function": [0, {"max": 300, "skipBlankLines": true, "skipComments": true}], // 每个函数体允许的最大行数
    "max-nested-callbacks": [0, 3], // 限定回调函数最大深度
    "max-params": [0, 8], // 限定函数参数最大个数
    "max-statements": [0, 80, {"ignoreTopLevelFunctions": true}], // 在一个函数中限定声明表达式最多个数,内部函数会或略
    "max-statements-per-line": [0, {"max": 2}], // 每行最大表达式
    "multiline-comment-style": 0, // 代码注释规范
    "multiline-ternary": 0, // 三元表达式，是否需要多行书写
    "new-cap": [2, {
      "newIsCap": true,
      "newIsCapExceptions": [],
      "capIsNew": false,
      "capIsNewExceptions": ["Immutable.Map", "Immutable.Set", "Immutable.List"],
    }], // 构造函数首字母应该大写
    "new-parens": 2, // 实例化构造函数时，需要加入()，即使没有参数值，所以比如 new Person 是不允许的
    "newline-per-chained-call": [2, { "ignoreChainWithDepth": 4 }],
    "no-array-constructor": 2, // 不允许使用 new Array(2, 1, 2) 来创建数组，而改用 []
    "no-bitwise": 2, // 禁止使用位运算符,包括以下情况 var x = y | z; var x = y & z; var x = y ^ z; var x = ~ z; var x = y << z; var x = y >> z; var x = y >>> z; x |= y; x &= y; x ^= y; x <<= y; x >>= y; x >>>= y;
    "no-continue": 2, // 是否允许使用 continue语句
    "no-inline-comments": 0, // 注释是否允许在代码的后面，开启则不允许
    "no-lonely-if": 2, // 应该使用 else if ，而不要使用 else { if(){} }
    "no-mixed-operators": [2, {
      "groups": [
        ["%", "**"],
        ["%", "+"],
        ["%", "-"],
        ["%", "*"],
        ["%", "/"],
        ["**", "+"],
        ["**", "-"],
        ["**", "*"],
        ["**", "/"],
        ["&", "|", "^", "~", "<<", ">>", ">>>"],
        ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
        ["&&", "||"],
        ["in", "instanceof"]
      ],
      allowSamePrecedence: false
    }], // 不要把多个操作符写在一起使用，最好用括号括起来
    "no-mixed-spaces-and-tabs": 2, // 不允许空格和制表位混合使用
    "no-multi-assign": 0, // 不要连续赋值，比如 var a = b = c = 5;
    "no-multiple-empty-lines": 2, // 代码中不要出现太多空行，默认最多为2行
    "no-negated-condition": 0, // 是否允许使用否定表达式 if (!a)
    "no-nested-ternary": 0, // 是否允许使用嵌套的三元表达式
    "no-new-object": 2, // 实例化对象时，不要用 new Object(); 而用 {}
    "no-plusplus": [0, {"allowForLoopAfterthoughts": true}], // 是否允许使用 ++ 或 --
    "no-restricted-syntax": [2, { // 可以指定不允许的语法
      "selector": "ForInStatement",
      "message": "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
    },
      {
        "selector": "ForOfStatement",
        "message": "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.",
      },
      {
        "selector": "LabeledStatement",
        "message": "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        "selector": "WithStatement",
        "message": "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      }],
    "no-tabs": 2, // 是否允许使用制表符
    "no-ternary": 0, // 是否允许三元操作符
    "no-trailing-spaces": [2, {
      "skipBlankLines": false,
      "ignoreComments": false,
    }], // 不允许行尾有空白字符
    "no-underscore-dangle": 0, // 是否允许变量名前后有 _
    "no-unneeded-ternary": 2, // 请不要使用不必要的三元表达式，比如 var isYes = answer === 1 ? true : false;
    "no-whitespace-before-property": 2,
    "nonblock-statement-body-position": 2, // 如果在条件或循环表达式中，只有一行的表达式，并且没有使用 {} ，最好跟条件写在一行
    "object-curly-newline": 2,
    "object-curly-spacing": [2, "always"], // 验证花括号内的空格
    "object-property-newline": [2, {
      "allowAllPropertiesOnSameLine": true,
    }], // 对象属性在新行显示
    "one-var": [2, "never"], // 多个变量声明是否用一个var语句
    "one-var-declaration-per-line": [2, "always"], // 定义多个变量时,是否需要每个变量在一行显示
    "operator-assignment": 2, // 对于赋值表达式，应该使用其简略式写法，比如  x = x + y 应该用 x += y
    "operator-linebreak": [0, "before", { "overrides": { "=": "after" } }], // 有操作符时，是否检测打断的行
    "padded-blocks": [2, { "blocks": "never", "classes": "never", "switches": "never" }], // 是否验证空白块
    "padding-line-between-statements": [0, {blankLine: "always", prev: "*", next: "return"}], // 不同的语句中间是否加一空行
    "prefer-object-spread": 0, // 使用 Object.assign 时，第一个参数应该是已有的对象变量，而非静态常量
    "quote-props": [2, "as-needed"], // 属性加单引号或双引号，个人建议不用加的最好不加
    "quotes": [2, "single"], // 字符串引号，建议使用单引号
    "semi": [2, "always"], // 总是要求加上分号
    "semi-spacing": 2, // 分号与代码之间的间隔
    "semi-style": [2, "last"], // 分号是放到行尾还是下一行行首，默认为行尾
    "sort-keys": 0, // 属性是否需要排序
    "sort-vars": 0, // 定义多个变量时，是否按字符顺序来排序，不建议开启该规则
    "space-before-blocks": 2, // 在每一块后面需要添加一空格
    "space-before-function-paren": [2, {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }], // 在函数名和() 之间有一空格
    "space-in-parens": 2, // 括号和参数之间应该没有空格
    "space-infix-ops": 2, // 表达式中间应该添加空白
    "space-unary-ops": 2, // 在一元操作符前或后不应该有空白
    "spaced-comment": [2, "always", {
      "line": {
        "markers": ["/", "=", "!"],
        "exceptions": ["-", "+"]
      },
      "block": {
        "markers": ["=", "!"],
        "exceptions": ["-", "+"],
        "balanced": true
      }
    }], // 如果开启，则会检测注释符后是否有空白，always必须有，而never则没有
    "switch-colon-spacing": [2, {"after": true, "before": false}], // switch 语句条件冒号前后是否加空格
    "template-tag-spacing": 2, // 标记模板内容，中间是否需要加空格，默认不需要加
    "unicode-bom": 2, //
    "wrap-regex": 0, // 字面正则表达式需要用括号括起来

    // es6
    "arrow-body-style": [2, "as-needed"], // 箭头函数是否需要加上{}
    "arrow-parens": [2, "as-needed"], // 对于箭头函数，需要添加括号，比如(a) => {}; 而不应该简写为 a => {};
    "arrow-spacing": 2, // 箭头函数中，箭头运算符前后需要添加空白
    "constructor-super": 2, // 父类构造函数不应该调用 super() ，但派生类必须要调用 super()
    "generator-star-spacing": 2, // generator functions 中 * 前应该添加空白，后面不应该有空白
    "no-class-assign": 2, // 不能再修改已经声明的类，即不能重现给已经声明的类赋其他值
    "no-confusing-arrow": 2, // 箭头函数中不建议使用引起疑惑的表达式，比如 var x = a => 1 ? 2 : 3，如果使用需要用{} 括起来
    "no-const-assign": 2, // 不能修改常量值
    "no-dupe-class-members": 2, // 类成员不能重复定义
    "no-duplicate-imports": 2,
    "no-new-symbol": 2, // 对于 Symbol,不要使用 new,例如 var foo = new Symbol("foo");
    "no-restricted-imports": 0, // 禁止特定的导入
    "no-this-before-super": 2, // 不允许在 super() 之前使用 this/super 语句
    "no-useless-computed-key": 2, // 禁止不必要的属性计算表达式
    "no-useless-constructor": 2, // 禁止不必要的构造方法,比如空的构造器
    "no-useless-rename": 2, // 禁止不必要的别名表达式，比如 export { foo as bar } from "foo";
    "no-var": 2, // 在需要使用const 或 let 声明时不要使用var
    "object-shorthand": 2, // 利用简写法来定义对象属性，如 var foo = {x, y, z}; 表示 var foo = {x:x, y:y, z:z};
    "prefer-arrow-callback": 2, // 建议使用箭头函数作为回调函数
    "prefer-const": 2, // 能使用常量的地方尽量使用const
    "prefer-destructuring": [0, {
      "VariableDeclarator": {
        "array": false,
        "object": false,
      },
      "AssignmentExpression": {
        "array": true,
        "object": true,
      },
    }, {
      "enforceForRenamedProperties": false
    }], // 尽量使用解构表达式，比如 const [foo] = array; 或 const {bar: foo} = object;
    "prefer-numeric-literals": 2, // 不允许直接使用 parseInt 解析字面量变量，比如 parseInt("111110111", 2)，而 parseInt(foo); 是允许的
    "prefer-rest-params": 2, // 建议使用 rest (...args) 参数来代替 arguments
    "prefer-spread": 2, // 不要使用 apply，应该使用扩展操作符来调用 Math.max(...args);
    "prefer-template": 2, // 建议使用模板符来替代引号，比如 var str = `Hello, ${name}!`;
    "require-yield": 2, // generator functions 应该有 yield
    "rest-spread-spacing": 2, // rest 表达式中间是否加空格，默认不加
    "sort-imports": 0, // improt 的变量名称导入应该按顺序排位
    "symbol-description": 2, // 使用 Symbol 定义变量时，需要传入 Symbol description
    // "template-curly-spacing": [2, "never"], // 模板表达式中 {} 前后是否需要空格
    "yield-star-spacing": [2, "after"], // yield * 号前后是否需要空格

    // import rules
    // Static analysis
    "import/no-unresolved": [2, { "commonjs": true, "caseSensitive": true }], // 确保导入的模块存在，允许 require 导入，区分大小写
    "import/named": 2, // 验证导入的名字是否存在
    "import/default": 2, // 在导入的时候发现原模块没有 default 则报错
    "import/namespace": 0, // 是否允许带 * 号的导入 import * as foo from "foo";
    "import/no-restricted-paths": 2, // 路径的正确性，比如本来在 server 文件夹下，直接 "./xx" 即可，不用在 "../server/xx"
    "import/no-absolute-path": 2, // 不允许绝对路径导入
    "import/no-dynamic-require": 0, // require 导入时，不能是以变量的方式导入，例如 require(`../${name}`); 是错误的
    "import/no-internal-modules": [0, {
      allow: [],
    }],
    "import/no-webpack-loader-syntax": 2, // 不要使用类似这种写法 import myModule from "my-loader!my-module";
    "import/no-self-import": 2, // 不能自己导入自己
    "import/no-cycle": [2, { maxDepth: Infinity }], // 不要循环导入，即 a 导入 b，b 又导入 c，或者是多个文件涉及到有环的导入
    "import/no-useless-path-segments": 2, // 路径有多余的
    "import/no-relative-parent-imports": 0,

    // Helpful warnings
    "import/export": 2, // 确保 export 书写的正确
    /**
     * 导入的 default 变量名应该不是导出的非默认导出名，比如
     * // foo.js
     export default "foo";
     export const bar = "baz";
     // 会给出报错
     import bar from "./foo.js";
     */
    "import/no-named-as-default": 2,
    "import/no-named-as-default-member": 2, // 遇上一个规则正好相反
    "import/no-deprecated": 0,
    "import/no-extraneous-dependencies": [2, { // 不要导入其他开发时候的包
      "devDependencies": [
        "server/index.js",
        "client/Root.js",
        "build/**", // build
        "test/**", // tape, common npm pattern
        "tests/**", // also common npm pattern
        "spec/**", // mocha, rspec-like pattern
        "**/__tests__/**", // jest pattern
        "**/__mocks__/**", // jest pattern
        "test.{js,jsx}", // repos with a single test file
        "test-*.{js,jsx}", // repos with multiple top-level test files
        "**/*{.,_}{test,spec}.{js,jsx}", // tests where the extension or filename suffix denotes that it is a test
        "**/jest.config.js", // jest config
        "**/vue.config.js", // vue-cli config
        "**/webpack.config.js", // webpack config
        "**/webpack.config.*.js", // webpack config
        "**/rollup.config.js", // rollup config
        "**/rollup.config.*.js", // rollup config
        "**/gulpfile.js", // gulp config
        "**/gulpfile.*.js", // gulp config
        "**/Gruntfile{,.js}", // grunt config
        "**/protractor.conf.js", // protractor config
        "**/protractor.conf.*.js", // protractor config
      ],
      "optionalDependencies": false,
      "peerDependencies": false,
    }],
    "import/no-mutable-exports": 2, // 导出时，不要使用 var 或 let ，而应该使用 const 或函数

    // Module systems
    "import/unambiguous": 0,
    "import/no-commonjs": 0, // 是否允许 commonjs 的写法
    "import/no-amd": 2, // 是否允许 amd 的写法 define(["a", "b"], function (a, b) { /* ... */ }) require(["b", "c"], function (b, c) { /* ... */ })
    "import/no-nodejs-modules": 0, // 是否不使用 node 原生的模块

    // Style guide
    "import/first": 2, // 导入语句应该放在最前面
    "import/exports-last": 0, // 导出语句放在最下面
    "import/no-duplicates": 2, // 一个导入不要有重复的书写，应该合并
    "import/no-namespace": 0, // 导入时是否支持带 * 的写法
    "import/extensions": [2, "ignorePackages", { // 导入时是否需要加文件名后缀
      "js": "never",
      "mjs": "never",
      "jsx": "never",
    }],
    "import/order": [2, { groups: [["builtin", "external", "internal"]] }], // 导入顺序：原生的，扩展的，本地的
    "import/newline-after-import": 2, // 导入语句写完是否空一行
    "import/prefer-default-export": 0, // 只有一个到处时，优先用 default 写法
    "import/max-dependencies": [0, { "max": 10 }], // 限制最大依赖数
    "import/no-unassigned-import": 0, // 是否禁止没有赋值的导入，比如 import "should";
    "import/no-named-default": 2,
    "import/no-anonymous-default-export": [0, { // 是否允许匿名导出
      "allowArray": false,
      "allowArrowFunction": false,
      "allowAnonymousClass": false,
      "allowAnonymousFunction": false,
      "allowLiteral": false,
      "allowObject": false,
    }],
    "import/group-exports": 0,
    "import/no-default-export": 0,
    "import/dynamic-import-chunkname": [0, { // 是否支持按需动态导入
      "importFunctions": [],
      "webpackChunknameFormat": "[0-9a-zA-Z-_/.]+",
    }],

    // react rules，默认设置为报错 https://github.com/yannickcr/eslint-plugin-react
    "react/boolean-prop-naming": [0, { "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+" }], // 对于布尔 props，命名规范
    "react/button-has-type": 2, // 对于 button，必须显式设置 type
    "react/default-props-match-prop-types": [2, { "allowRequiredDefaults": false }], // 每一个 prop 是否必须要有一个默认值
    "react/destructuring-assignment": [0, "always", { "ignoreClassFields": true }], // 使用 es6 新语法，析构方式
    "react/display-name": 0, // 是否检测需要为React Component 设置一个 displayName
    "react/forbid-component-props": 0, // 禁止某些在组件上的属性，比如 className 等
    "react/forbid-dom-props": 0, // 禁止某些 DOM 属性值，比如 id 等
    "react/forbid-elements": [0, {"forbid": [""]}], // 禁止使用某些标签
    "react/forbid-prop-types": [2, {
      "forbid": ["any"],
      "checkContextTypes": true,
      "checkChildContextTypes": true,
    }], // 是否检测使用了React.PropTypes.any React.PropTypes.array 或 React.PropTypes.object，如果开启该规则，则不允许使用React.PropTypes 指定的类型，而用具体的类型来说明，默认该规则是关闭的
    "react/forbid-foreign-prop-types": 2, // 不要使用不相关的 PropTypes
    "react/no-access-state-in-setstate": 2, // 不应该在 setState 中直接使用 this.state 的值
    "react/no-array-index-key": 2, // 最好不用使用数组的 index 作为 key
    "react/no-children-prop": 2, // 不需要把 children 作为 prop 传递
    "react/no-danger": 2, // 不要使用不安全的名称来定义属性，比如 dangerouslySetInnerHTML  __html，看 https://facebook.github.io/react/tips/dangerously-set-inner-html.html
    "react/no-danger-with-children": 2, // 对于属性dangerouslySetInnerHTML存在的话，不需要再书写 children
    "react/no-deprecated": 2, // 建议不要使用不赞成的方法,比如 React.render(<MyComponent />, root); React.unmountComponentAtNode(root);
    "react/no-did-mount-set-state": 0, // 在componentDidMount 中不要使用 setState 方法
    "react/no-did-update-set-state": 2, // componentDidUpdate 中不要使用 setState 方法
    "react/no-direct-mutation-state": 2, // 不要直接使用 this.state 来改变值，而应该用 this.setState
    "react/no-find-dom-node": 2, // 不建议使用 findDOMNode，因为最终该方法会被废弃
    "react/no-is-mounted": 2, // 不建议使用方法 this.isMounted()
    "react/no-multi-comp": [2, {"ignoreStateless": true}], // 不建议在一个文件中定义多个组件,但无状态的组件被或略
    "react/no-redundant-should-component-update": 2, // 如果组件是继承 React.PureComponent，不应该再使用 shouldComponentUpdate
    "react/no-render-return-value": 2, // 使用ReactDOM.render()不应该有返回值
    "react/no-set-state": 0, // 在 Flux 或 redux 中是使用 store 维持 state 的,在这些框架中可以不使用 state
    "react/no-typos": 2, // 检测 React Component 原生的方法和属性，拼写是否正确，比如 componentWillMount componentDidMount 等
    "react/no-string-refs": 2, // 不建议使用字符串的 ref 而应该使用变量
    "react/no-this-in-sfc": 2, // 无状态组件中，不要使用 this.props 等
    "react/no-unescaped-entities": 2, // 不要出现没有转义的字符直接量
    "react/no-unknown-property": 2, // 不要使用扁平或不接受的属性名称，比如class，而用className，属性名应该是驼峰式命名
    "react/no-unsafe": 0, // 在 react 组件中不要使用 UNSAFE 开头的方法，比如 UNSAFE_componentWillMount、 UNSAFE_componentWillReceiveProps、UNSAFE_componentWillUpdate()，https://reactjs.org/docs/react-component.html#unsafe_componentwillmount
    "react/no-unused-prop-types": 2, // 声明了 props 而没有被使用
    "react/no-unused-state": 2, // 定义了 state 属性，而未使用将会给出警告
    "react/no-will-update-set-state": 2, // 不要在componentWillUpdate中调用 this.setState()，默认可以在回调函数中调用
    "react/prefer-es6-class": 2, // 应该使用 es6 来创建 class
    "react/prefer-stateless-function": 2, // 对于无状态的组件尽量使用函数来声明组件,比如 const Foo = function(props) {return <div>{props.foo}</div>;};
    "react/prop-types": 2, // 对于没有设置 propType 的 prop 给出警告
    "react/react-in-jsx-scope": 2, // 对于使用了 JSX,要使用 React 组件
    "react/require-default-props": [0, {
      "forbidDefaultForRequired": true,
    }],  // 对于每个 prop ，是否需要设置一下其 defaultProps 值
    "react/require-optimization": 0, // 检测每个组件是否有 shouldComponentUpdate 方法
    "react/require-render-return": 2, // render 方法中需要 return
    "react/self-closing-comp": 0, // 对于没有子元素的组件应该是这样的 <Hello name="John" /> 而不应该 <Hello name="John"></Hello>
    "react/sort-comp": [2, {
      "order": [
        "static-methods",
        "instance-variables",
        "lifecycle",
        "/^on.+$/",
        "getters",
        "setters",
        "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
        "instance-methods",
        "everything-else",
        "rendering",
      ],
      "groups": {
        "lifecycle": [
          "displayName",
          "propTypes",
          "contextTypes",
          "childContextTypes",
          "mixins",
          "statics",
          "defaultProps",
          "constructor",
          "getDefaultProps",
          "getInitialState",
          "state",
          "getChildContext",
          "componentWillMount",
          "componentDidMount",
          "componentWillReceiveProps",
          "UNSAFE_componentWillReceiveProps",
          "shouldComponentUpdate",
          "componentWillUpdate",
          "componentDidUpdate",
          "componentWillUnmount",
        ],
        "rendering": [
          "/^render.+$/",
          "render"
        ],
      },
    }], // 组件方法是否按一定的顺序书写,默认为: 1  static methods and properties 2 lifecycle methods: displayName, propTypes, contextTypes, childContextTypes, mixins, statics,defaultProps, constructor, getDefaultProps, getInitialState, state, getChildContext, componentWillMount, componentDidMount, componentWillReceiveProps, shouldComponentUpdate, componentWillUpdate, componentDidUpdate, componentWillUnmount (in this order).  3 custom methods 4 render method
    "react/sort-prop-types": 0, // propType 是否按字母顺序来排列
    "react/style-prop-object": 2, // style 必须是对象
    "react/void-dom-elements-no-children": 2, // 不要给没有子节点的 dom 标签设置 childern 内容，比如 <br>Children</br>  <br children="Children" />, 这些都是错误的写法

    // JSX-specific rules 以下为 jsx 规则
    "react/jsx-boolean-value": 2, // 该规则可以设置为两种情况，always 和 never ，设置为 always 如果 attribute 没有设置值，会警告；设为 never，如果 attribute 有一个 true 值，会警告 https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
    "react/jsx-child-element-spacing": 0, // 元素之间如果需要空格时，需要显示设置，因为 jsx 编译后会删除掉 dom 之间的空格的
    "react/jsx-closing-bracket-location": [2, {
      "nonEmpty": "after-props",
      "selfClosing": "line-aligned"
    }], // 检测jsx tag 闭合书写规范
    "react/jsx-closing-tag-location": 2, // 检测关闭的标签位置是否正确
    "react/jsx-curly-spacing": 2, // 检测赋值是否有空格，默认是不应该有空格的，但换行不检测，比如 <Hello name={firstname } />;
    "react/jsx-equals-spacing": [2, "never"], // 再给属性赋值时,是否在 = 前后加上空格
    "react/jsx-filename-extension": 0, // 后缀名，是否必须是 jsx
    "react/jsx-first-prop-new-line": [2, "multiline-multiprop"], // 第一个属性名是否在新的一行书写
    "react/jsx-handler-names": 0, // 按照惯例,事件方法名前是否加上 handle
    "react/jsx-indent": [2, 2], // jsx 嵌套包裹缩进,默认用2个
    "react/jsx-indent-props": [2, 2], // jsx语法换行缩进几个空格（或制表符）
    "react/jsx-key": 2, // 在循环中,组件应该设置不同的 key
    "react/jsx-max-depth": [0, {"max": 8}], // 嵌套最大深度
    "react/jsx-max-props-per-line": [2, { "maximum": 1, "when": "multiline" }], // jsx 每个属性应该写在单独一行（默认），也可以设置每行的个数
    "react/jsx-no-bind": [2, {
      "ignoreRefs": true,
      "allowArrowFunctions": true,
      "allowFunctions": false,
      "allowBind": false,
      "ignoreDOMComponents": true,
    }], // 不必要的地方不使用bind
    "react/jsx-no-comment-textnodes": 2, // 检测注释的正确性
    "react/jsx-no-duplicate-props": 2, // 给jsx设置同名的属性会警告
    "react/jsx-no-literals": 0, // 不要设置字面的值，比如 var Hello = <div>test</div>; 而用 var Hello = <div>{"test"}</div>;
    "react/jsx-no-target-blank": 0,
    "react/jsx-no-undef": 2, // 检测定义了jsx component 而没有被调用
    "react/jsx-one-expression-per-line": [0, { "allow": "single-child" }], // 每个表达式应该写在一行
    "react/jsx-curly-brace-presence": [2, { "props": "never", "children": "never" }], // 是否使用 {} 来给属性或 children 来赋值
    // "react/jsx-fragments": 2, // 默认下，使用 React.Fragment 应该设置一 key
    "react/jsx-pascal-case": 2, // 应该使用 pascal 来命名组件名
    "react/jsx-props-no-multi-spaces": 2, // 属性之间不要有多余的空格
    "react/jsx-sort-default-props": 0, // 默认 props 是否需要排序
    "react/jsx-sort-props": 0, // 属性名是否按字母排序
    "react/jsx-space-before-closing": 0, // 在关闭标签前是否加一空格
    "react/jsx-tag-spacing": 0, // 检测标签空格
    "react/jsx-uses-react": 2,// React声明了而没有被调用
    "react/jsx-uses-vars": 2, // jsx组件被定义而没有被调用
    "react/jsx-wrap-multilines": [2, {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "parens-new-line",
    }], // 多行 jsx 表达式应该用 () 包裹起来


    // plugin jsx-a11y
    "jsx-a11y/accessible-emoji": 2, // 表情符号需要明确意思，使用 span 设置 role="img" aria-label="xxx"
    "jsx-a11y/alt-text": [2, { // 图片元素必须加上 alt
      "elements": ["img", "object", "area", "input[type='image']"],
      "img": [],
      "object": [],
      "area": [],
      "input[type='image']": [],
    }],
    "jsx-a11y/anchor-has-content": [2, { components: [] }], // a 标签不需要没有内容，或者子元素设置 aria-hidden
    "jsx-a11y/anchor-is-valid": [0, { // 规范 a 标签的写法
      "components": ["Link"],
      "specialLink": ["to"],
      "aspects": ["noHref", "invalidHref", "preferButton"],
    }],
    "jsx-a11y/aria-activedescendant-has-tabindex": 2, // aria-activedescendant 需要设置一个 tabindex
    "jsx-a11y/aria-props": 2, // 不允许使用无效的 aria
    "jsx-a11y/aria-proptypes": 2, // aria 应该设置有效的值
    "jsx-a11y/aria-role": [2, { "ignoreNonDom": false }], // 检测 role 的值是否正确
    "jsx-a11y/aria-unsupported-elements": 2, // 不能在不支持的元素上设置 aria，比如 meta
    "jsx-a11y/click-events-have-key-events": 2,
    "jsx-a11y/heading-has-content": [2, { "components": [""] }], // 不能是空 heading，如 h1~h6
    "jsx-a11y/html-has-lang": 2,
    "jsx-a11y/iframe-has-title": 2,
    "jsx-a11y/img-redundant-alt": 2,
    "jsx-a11y/interactive-supports-focus": 2, // 可交互的元素必须支持能获取焦点
    "jsx-a11y/lang": 2, // lang 设置应该是一个有效的值
    "jsx-a11y/media-has-caption": [2, { // media elements must have captions
      "audio": [],
      "video": [],
      "track": [],
    }],
    "jsx-a11y/mouse-events-have-key-events": 2, // 鼠标事件需要依赖 onFocus 或 onBlur
    "jsx-a11y/no-access-key": 2, // 元素不建议使用属性 accessKey
    "jsx-a11y/no-autofocus": [2, { "ignoreNonDOM": true }], // 不要使用 autoFocus
    "jsx-a11y/no-distracting-elements": [2, { // 不要使用元素 <marquee> and <blink>
      "elements": ["marquee", "blink"],
    }],
    "jsx-a11y/no-interactive-element-to-noninteractive-role": [2, { // WAI-ARIA roles should not be used to convert an interactive element to non-interactive
      "tr": ["none", "presentation"],
    }],
    "jsx-a11y/no-noninteractive-element-interactions": [2, { // 无交互的元素不要设置交互事件
      "handlers": [
        "onClick",
        "onMouseDown",
        "onMouseUp",
        "onKeyPress",
        "onKeyDown",
        "onKeyUp",
      ]
    }],
    "jsx-a11y/no-noninteractive-element-to-interactive-role": [2, { // 无交互的元素不要设置指定的 role
      "ul": ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
      "ol": ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
      "li": ["menuitem", "option", "row", "tab", "treeitem"],
      "table": ["grid"],
      "td": ["gridcell"],
    }],
    "jsx-a11y/no-noninteractive-tabindex": [2, { // 无交互的元素不要设置 tabindex
      "tags": [],
      "roles": ["tabpanel"],
    }],
    "jsx-a11y/no-onchange": 0,
    "jsx-a11y/no-redundant-roles": 2, // 不必要的 role 就不要设置了，比如 <button role="button" />
    "jsx-a11y/no-static-element-interactions": [2, { // 对于没有行为的元素不要设置以下指定的事件
      "handlers": [
        "onClick",
        "onMouseDown",
        "onMouseUp",
        "onKeyPress",
        "onKeyDown",
        "onKeyUp",
      ]
    }],
    "jsx-a11y/role-has-required-aria-props": 2, // 有些 role 设置，还需要其关联的设置也加上，比如 <span role="checkbox" aria-checked="false" aria-labelledby="foo" tabIndex="0"></span>
    "jsx-a11y/role-supports-aria-props": 2,
    "jsx-a11y/scope": 2, // scope 只允许设置在 th 上
    "jsx-a11y/tabindex-no-positive": 2, // tabIndex 的值不应该大于 0

    // prettier plugin
    // options  https://prettier.io/docs/en/options.html
    "prettier/prettier": [2, {
      "singleQuote": true,
      "trailingComma": "es5",
      "bracketSpacing": true,
      "jsxBracketSameLine": true,
      "arrowParens": "avoid"
    }]
  },
  "parser": "babel-eslint", // 指定默认解析器
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
    "jest": true,
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "generators": false,
      "objectLiteralDuplicateProperties": false,
      "jsx": true // enable JSX
    }
  },
  "globals": { // 定义全局的变量
    "MTK": true
  },
  "extends": [], // 推荐使用默认配置好的
  "plugins": [ // 定义第三方插件
    "import",
    "react",
    'jsx-a11y',
    "prettier"
  ],
  "settings": { // 设置
    "import/resolver": {
      "node": {
        "extensions": [".mjs", ".js", ".json"]
      }
    },
    "import/extensions": [
      ".js",
      ".mjs",
      ".jsx",
    ],
    "import/core-modules": [
    ],
    "import/ignore": [
      "node_modules",
      "\\.(coffee|scss|css|less|hbs|svg|json)$",
    ],
    "react": {
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "16.6.0" // React version, default to the latest React stable release
    },
    "propWrapperFunctions": [
      "forbidExtraProps", // https://www.npmjs.com/package/airbnb-prop-types
      "exact", // https://www.npmjs.com/package/prop-types-exact
      "Object.freeze", // https://tc39.github.io/ecma262/#sec-object.freeze
    ],
    "sharedData": "sharedName"
  },
  "root": true // 设置他后，子的js文件找到该 eslint配置文件后，则不再向上查找其他eslint配置文件
};
