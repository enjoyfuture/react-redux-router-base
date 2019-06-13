## eslint 规则

0 表示不开启，1 和 2 表示开启，其中 1 表示警告，2 表示错误

### 可能引起代码错误的规则

1. "for-direction": 2, // 检测 for loop 循环语句书写是否正确
2. "getter-return": 2, // 检测 get 方法中是否有 return
3. "no-async-promise-executor": 0, // 不允许在 Promise 中使用 async 函数
4. "no-await-in-loop": 2, // 在循环语句中不要使用 await
5. "no-compare-neg-zero": 2, // 不要出现负零，即 -0
6. "no-cond-assign": 2, // 条件语句中，不应该出现赋值语句 = ，比如 if (x = 2) { } 是会报错的
7. "no-console": 0, // 是否允许 console
8. "no-constant-condition": 2, // 条件、循环语句中的条件是否允许使用常量或常量表达式 if (false) { }
9. "no-control-regex": 2, // 是否允许在正则表达式中使用控制字符(ASCII 码中范围为 0-31，比如 /\x1f/ )
10. "no-debugger": 2, // 是否允许使用 debugger 语句
11. "no-dupe-args": 2, // 函数参数是否允许有重复的，如果设置了严格模式，可以不用设置该选项
12. "no-dupe-keys": 2, // 是否允许对象中有相同的 key
13. "no-duplicate-case": 2, // 检测 case 语句中，是否有重复的 case 变量值
14. "no-empty": 2, // 是否允许空的表达式，if (foo) {}
15. "no-empty-character-class": 2, // 是否允许正则表达式中包含空的字符，比如 var foo = /^abc[]/;
16. "no-ex-assign": 2, // 异常 catch 语句中给 e 赋值是不允许的
17. "no-extra-boolean-cast": 2, // 在条件语句中不允许使用!! 比如 if (!!foo) { }
18. "no-extra-parens": 2, // 不要使用冗余的括号，比如 a = (b \* c);
19. "no-extra-semi": 2, // 不要使用多余的分号; 比如 var x = 5;;
20. "no-func-assign": 2, // 不允许给函数重新赋值 function foo() {} foo = bar;
21. "no-inner-declarations": 2, // 不要在函数体或程序块（if 或循环）中声明函数
22. "no-invalid-regexp": 2, // 不允许定义无效的正则表达式
23. "no-irregular-whitespace": 2, // 不允许使用除空格和制表位意外的空白字符，比如 \u222B
24. "no-misleading-character-class": 2, // 正则表达式中不建议使用特殊表情符号，比如 /^[Á]$/u /^[❇️]$/u 等
25. "no-obj-calls": 2, // 不允许调用全局的函数对象，比如 Math， var x = Math();
26. "no-prototype-builtins": 2, // 不建议直接使用 Object.prototypes 中的一些方法，而使用 call 来调用，比如 hasOwnProperty，Object.prototype.hasOwnProperty.call(foo, "bar"); 是推荐使用的，而 foo.hasOwnProperty("bar"); 是不推荐使用的
27. "no-regex-spaces": 2, // 正则表达式中不允许有空格
28. "no-sparse-arrays": 2, // 是否可以用稀疏数组
29. "no-template-curly-in-string": 2, // 不允许字符串的模板，比如 "Hello \${name}!" 会报错
30. "no-unexpected-multiline": 2, // 避免书写多行表达式，每行表达式不加分号或逗号
31. "no-unreachable": 2, // 避免书写不可达的代码，比如在 return 后添加新的代码，或抛出异常，中断语句等
32. "no-unsafe-finally": 2, // 不要在 finally 语句中使用 return 或抛出异常（throw）
33. "no-unsafe-negation": 2, // 在 in 或 instanceof 表达式中不要否定变量 if(!a in b) {} 是错误的，应该写成 if(!(a in b)){}
34. "no-negated-in-lhs": 0, // 是否允许操作符的左边直接使用否定操作符 ! ，比如 if(!key in object) 是错误的，而应该写成 if(!(key in object))
35. "require-atomic-updates": 2, // 在 += 中不要使用 await 或 yield ，比如 result += await somethingElse;
36. "use-isnan": 2, // 不要用 NaN 跟变量作比较，而是应该调用 isNaN()
37. "valid-typeof": 2, // 验证 typeof 与比较的值，是否为以下几种情况，"undefined", "object", "boolean", "number", "string", and "function" { "requireStringLiterals": true } 表示值必须是字符串

### 最佳实践规则

1. "accessor-pairs": 0, // 定义对象属性时，setter 和 getter 是否应该成对出现
2. "array-callback-return": [2, { "allowImplicit": true }], // 在数组一些方法中，回调函数需要返回的值应该加上 return，比如在 array.reduce，加上 { "allowImplicit": true } 表示可以直接 return 返回一个 undefined
3. "block-scoped-var": 2, // 在块作用于中不允许使用 var 来定义变量
4. "class-methods-use-this": 2, // 在 class 定义的方法中，如果没有使用 this，应改成静态方法
5. "complexity": 0, // 判断语句复杂度，关闭该规则
6. "consistent-return": 0, // 不同的分支返回的类型是否应该一致
7. "curly": [2, "multi-line"], // 在循环或判断语句中是否需要加花括号
8. "default-case": 2, // 在 switch 语句中，检测是否有默认分支，如没有需要加上注释 no default
9. "dot-location": [2, "property"], // 在换行时，用来检测对象的点是换行之前还是之后，这里设为放在下一行
10. "dot-notation": 2, // 对于对象属性应该用点表达式，不应该用[] var x = foo["bar"]; 是错误的，应该 var x = foo.bar; 但 var x = foo[bar]; 是正确的，因为 bar 是变量
11. "eqeqeq": [2, "always", {"null": "ignore"}], // 比较两个变量时，必须使用恒等，但比较 null 时，可以使用 ==
12. "guard-for-in": 2, // 在 for in 表达式中需要调用 hasOwnProperty 来判断是否为自有的属性
13. "max-classes-per-file": [2, 1], // 开启后，每个文件只能定义第二个参数设置的 class 类个数
14. "no-alert": 2, // 不允许使用 alert 语句
15. "no-caller": 2, // 不允许使用 arguments.caller 和 arguments.callee
16. "no-case-declarations": 2, // 在 case 语句中使用声明式语句时，需要用 {} 括起来
17. "no-div-regex": 0, // 在正则表达式中是否转义除法表达式书写的正则 例如 return /=foo/; 应该写成 return /\=foo/;
18. "no-else-return": [2, { "allowElseIf": false }], // 如果在 if 语句中有 return，则在 else 中可以不用 return，直接放到外面返回，else if 时可以使用 return
19. "no-empty-function": [2, {
    allow: [
    "arrowFunctions",
    "functions",
    "methods",
    ]
    }], // 不要定义空函数
20. "no-empty-pattern": 2, // 不允许空的解构赋值，例如 var {a: {}} = foo;
21. "no-eq-null": 0, // 对于 null 比较也应该使用 === 来比较
22. "no-eval": 2, // 不允许使用 eval()
23. "no-extend-native": 2, // 不允许修改扩展内置对象的属性，比如 Object.prototype.a = "a";
24. "no-extra-bind": 2, // 可以规范代码，防止滥用 bind 方法
25. "no-extra-label": 2, // 当使用 label 表达式时，检测不必要的 label 表达式
26. "no-fallthrough": 2, // 是否检测 switch 语句中 case 后没有 break，return 或 throw
27. "no-floating-decimal": 2, // 对于浮点数，不能省略.前或.后的数字
28. "no-global-assign": [2, {"exceptions": ["Object"]}], // 不要给全局变量赋值，需要先定义再赋值
29. "no-implicit-coercion": [0, {"string": false}], // 不要使用隐身转换，应该使用直接转换，主要涉及到 boolean、 number 或 string 的转换，比如 var n = +foo; 应该写成 var n = Number(foo);
30. "no-implicit-globals": 0, // 是否允许定义全局的 function
31. "no-implied-eval": 2, // 不要使用隐式调用 eval 的语句，比如 setInterval("alert("Hi!");", 122);
32. "no-invalid-this": 0, // 用来检测 this 关键字使用的地方是否正确
33. "no-iterator": 2, // 在 ES6 中有 **iterator** 属性，建议不要修改该属性值
34. "no-labels": [2, { "allowLoop": false, "allowSwitch": false }], // 不建议使用 label 表达式
35. "no-lone-blocks": 2, // 禁止内部不必要的嵌套块
36. "no-loop-func": 2, // 不要在循环中定义函数，并且该函数中调用了循环变量
37. "no-magic-numbers": 0, // 一些系数最好定义为常量
38. "no-multi-spaces": 2, // 表达式中是否允许有多余的空格
39. "no-multi-str": 2, // 是否允许多行字符串
40. "no-new": 2, // 不允许实例化类，而没有赋给任何变量
41. "no-new-func": 2, // 不建议使用 new Function 来声明函数
42. "no-new-wrappers": 2, // 对于 String, Number, 和 Boolean，不建议使用 new，即 new String 等
43. "no-octal": 2, // 不允许使用八进制数字
44. "no-octal-escape": 2, // 不允许使用八进制转义字符串
45. "no-param-reassign": 2, // 如果开启，则不允许重新修改函数参数值，或者参数属性值
46. "no-proto": 2, // 不建议使用该属性 **proto**
47. "no-redeclare": 2, // 不允许重复声明同一个变量
48. "no-restricted-properties": [2, { // 设置不允许使用的对象属性或方法，这些属性或方法不建议使用或将会废弃
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
49. "no-return-assign": 2, // 不允许在 return 语句中有赋值语句
50. "no-return-await": 2, // return 语句中不要加 await，比如 return await bar();
51. "no-script-url": 2, // 不要使用 javascript:url，比如 location.href = "scripts:void(2)";是错误的
52. "no-self-assign": [2, {"props": false}], // 不允许变量自己给自己赋值，比如 foo = foo
53. "no-self-compare": 2, // 不允许变量自己跟自己做比较
54. "no-sequences": 2, // 需要正确的使用逗号操作符
55. "no-throw-literal": 2, // 抛出异常时，请使用 new Error()
56. "no-unmodified-loop-condition": 0, // 用来检测循环中的条件值是否始终没有改变
57. "no-unused-expressions": 2, // 不允许出现未使用的表达式
58. "no-unused-labels": 2, // 不允许定义了 label 而没有被调用
59. "no-useless-call": 0, // 对于不必要使用 call 或 apply，建议不要使用，直接调用即可
60. "no-useless-catch": 2, // 不要在 catch 中只写了抛出错误，而没有处理错误
61. "no-useless-concat": 2, // 不必要的字符串连接最好去掉，写在一起
62. "no-useless-escape": 2, // 不必要的转义就不要转义了
63. "no-useless-return": 2, // 不允许出现不必要的 return 语句
64. "no-void": 2, // 不建议使用 void 操作符
65. "no-warning-comments": 1, // 对于注释中的 TODO FIXME XXX 等，是否给出提示，建议开发中设置为 1，部署的时候设置为 2
66. "no-with": 2, // 不允许使用 with 表达式语句
67. "prefer-promise-reject-errors": 2, // 对于 Promise.reject，参数必须是一个 Error 对象，比如 Promise.reject(5); 是不允许的，应该写成 Promise.reject(new Error("something bad happened"));
68. "radix": 2, // 在调用 parseInt 应该指定基数
69. "require-await": 0, // 对于 async 表达式，必须有对应的 await 表达式
70. "require-unicode-regexp": 0, // 对于两个字符或多字符的匹配，需要加上修饰符 u，比如 /aaa/u /^[👍]\$/u
71. "vars-on-top": 0, // 所有变量声明是否都放在函数最上面或过程快最上面
72. "wrap-iife": [2, "inside"], // 立即执行函数是里面包裹还是外面包裹，默认是外面包裹，即 outside
73. "yoda": 2, // 不允许使用 yoda 条件表达式，常量值在前的比较表达式，比如： if(1 === a){ }

### 变量规则

1. "init-declarations": 0, // 声明变量的时候赋值，还是在其他地方赋值
2. "no-catch-shadow": 0, // 不允许 catch 参数名与外部定义的变量名相同
3. "no-delete-var": 2, // 不能删除变量，而只能删除属性
4. "no-label-var": 2, // 使用标签 label 语句时，不要跟变量同名，建议不要使用标签
5. "no-restricted-globals": [2, "isFinite", "isNaN"].concat(restrictedGlobals), // 不要使用全局变量，后面指定那些是全局变量，当使用这些时会报错
6. "no-shadow": [2, { "hoist": "never", "allow": ["Map", "location", "history", "caches", "status", "origin", "window", "name", "performance", "id", "path", "err"], "builtinGlobals": false }], // 全局和局部变量名不要用相同的名称
7. "no-shadow-restricted-names": 2, // 不要使用 NaN, Infinity, undefined 等内部定义的变量来声明变量
8. "no-undef": 2, // 不要使用还没有定义的变量或函数，如果引用第三方定义的变量，可以用 /_ global _/ 来标注，例如 /_global require define:true_/
9. "no-undef-init": 2, // 声明变量的时候，如果不需要赋值，不用显式设置 undefined ，因为默认声明而未赋值的变量，其默认值为 undefined
10. "no-undefined": 0, // 代码中不建议使用 undefined ，包括命令和赋值等
11. "no-unused-vars": [2, {"vars": "all", "args": "none", ignoreRestSiblings: true}], // 检测定义了却没有使用的变量，vars 有两种选择 all 和 local；args 有三种选择，all after-used 和 none 我们可以只检测变量而不检测函数参数，可以把 args 设为 none
12. "no-use-before-define": [2, "nofunc"], // 变量和函数的声明需要在使用之前，可以设置 [2, "nofunc"]，只检测变量，而不检测函数和 class，"nofunc" 相当于 { "functions": false, "classes": true }.

### Node.js 和 CommonJS 规则

1. "callback-return": 0, // 调用 callback 时需要加上 return 语句
2. "global-require": 0, // require 加载依赖应该放在代码最上边，比如 var fs = require("fs");
3. "handle-callback-err": 0, // 如果回调函数中有错误变量（比如 err），我们需要判断处理错误的情况
4. "no-buffer-constructor": 2, // 不建议使用 Buffer 构造函数，比如： new Buffer(5) 是错误的
5. "no-mixed-requires": 0, // require 与其他变量声明应该不要放在一起
6. "no-new-require": 2, // 不用对表达式 require 直接使用 new，例如 var appHeader = new require("app-header");
7. "no-path-concat": 2, // 不要使用 **dirname 或 **filename 与字符串连接生成路径，应该使用 path.join(**dirname, "foo.scripts"); 或 path.resolve(**dirname, "foo.scripts");
8. "no-process-env": 0, // 在 node 环境中，不建议使用 process.env ，而使用 config 来配置
9. "no-process-exit": 0, // 不要直接调用 process.exit();
10. "no-restricted-modules": 0, // 限制使用某些模块，比如 no-restricted-modules: [2, "fs"] ，不能使用 fs 模块
11. "no-sync": 0, // 我们尽量使用异步方法来代替同步方法，比如操作文件等

### 代码风格规则

1. "array-bracket-newline": 0, // 数组最后一个 ] 是否换行，默认规则为：写在一行不需要，多行需要
2. "array-bracket-spacing": 2, // 数组元素前后是否要加一空格，默认为不必要加，如 var arr = [ "foo", "bar" ]; 是不正确的写法
3. "array-element-newline": 0, // 数组元素是写在一行，还是多行，该规则不用开启
4. "block-spacing": 2, // 花括号与语句间应该有空格
5. "brace-style": 2, // 条件或循环语句中，花括号是另起一行，还是与当前语句在同一行，默认跟当前语句在同一行
6. "camelcase": [2 , { "properties": "never" }], // 驼峰式命名变量或属性，对象属性可以不使用驼峰命名
7. "capitalized-comments": 0, // 注释的大小写格式限制
8. "comma-dangle": [2, {
   "arrays": "always-multiline",
   "objects": "always-multiline",
   "imports": "always-multiline",
   "exports": "always-multiline"
   }], // 对象最后一个属性，是否需要逗号
9. "comma-spacing": 2, // 逗号表达式前后空格情况，默认前面没有，后边应该添加
10. "comma-style": [2, 'last', {
    exceptions: {
    ArrayExpression: false,
    ArrayPattern: false,
    ArrowFunctionExpression: false,
    CallExpression: false,
    FunctionDeclaration: false,
    FunctionExpression: false,
    ImportDeclaration: false,
    ObjectExpression: false,
    ObjectPattern: false,
    VariableDeclaration: false,
    NewExpression: false,
    }
    }], // 当换行时，逗号是在当前行还是下一行，默认是当前行
11. "computed-property-spacing": 2, // 用[]取属性值时，是否应该有空格
12. "consistent-this": [0, "self"], // 闭包的时候，this 用变量声明上下文应该统一，该变量就不要用在其他定义变量上
13. "eol-last": 2, // 在行的末尾应该空上一行
14. "func-call-spacing": 2, // 函数名与括号之间是否需要一个空格
15. "func-name-matching": 0, // 定义函数变量时，匿名名称是否应该跟变量名称一致，默认一致
16. "func-names": 0, // 函数表达式需要一个名称，包括匿名函数，该规则可以关闭
17. "func-style": [0, "declaration", {
    "allowArrowFunctions": true
    }], // 是声明式的函数，还是定义变量式的函数，我们采用声明式，但箭头函数允许变量式
18. "function-paren-newline": [2, "consistent"], // 函数参数书写格式，是否要换行
19. "id-blacklist": 0, // 指定一些黑名单变量，这些变量不能出现在代码中，比如 "id-blacklist": [2, "data", "err", "e", "cb", "callback"],
20. "id-length": 0, // 定义变量名或属性名的最小最大长度
21. "id-match": 0, // 规范变量名或属性名的命名规范
22. "implicit-arrow-linebreak": 0, // 箭头函数如果有 return 时，但没有写，表达式应该在一行显示
23. "indent": [2, 2, {
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
    "ignoreComments": false,
    }], // 缩进，我们采用 2 个空格来缩进
24. "jsx-quotes": [0, "prefer-double"], // jsx 属性值应该用双引号
25. "key-spacing": 2, // 键值之间的空格
26. "keyword-spacing": 2, // 关键字 if, else, for, while, do, switch, try, catch, finally, and with 要求有空格
27. "line-comment-position": 0, // 注释是放在上面还是旁边，不需要开启该规则
28. "linebreak-style": 2, // 验证 unix (LF) or windows (CRLF)
29. "lines-around-comment": 0, // 注释的规范写法，在旁边或上方
30. "lines-between-class-members": 2, // 在 class 中每个成员之前是否加一空行，开启则加
31. "max-depth": [0, 12], // 限制语句块最大嵌套深度
32. "max-len": [
    2, 200, 2, {
    "ignoreUrls": true,
    "ignoreComments": false,
    "ignoreRegExpLiterals": true,
    "ignoreStrings": true,
    "ignoreTemplateLiterals": true,
    }
    ], // 限定每行最大长度
33. "max-lines": [0, {"max": 800, "skipBlankLines": true, "skipComments": true}], // 指定每个文件最大行
34. "max-lines-per-function": [0, {"max": 300, "skipBlankLines": true, "skipComments": true}], // 每个函数体允许的最大行数
35. "max-nested-callbacks": [0, 3], // 限定回调函数最大深度
36. "max-params": [0, 8], // 限定函数参数最大个数
37. "max-statements": [0, 80, {"ignoreTopLevelFunctions": true}], // 在一个函数中限定声明表达式最多个数,内部函数会忽略
38. "max-statements-per-line": [0, {"max": 2}], // 每行最大表达式
39. "multiline-comment-style": 0, // 代码注释规范
40. "multiline-ternary": 0, // 三元表达式，是否需要多行书写
41. "new-cap": [2, {
    "newIsCap": true,
    "newIsCapExceptions": [],
    "capIsNew": false,
    "capIsNewExceptions": ["Immutable.Map", "Immutable.Set", "Immutable.List"],
    }], // 构造函数首字母应该大写
42. "new-parens": 2, // 实例化构造函数时，需要加入()，即使没有参数值，所以比如 new Person 是不允许的
43. "newline-per-chained-call": [2, { "ignoreChainWithDepth": 4 }], // 点操作符每行允许最大个数
44. "no-array-constructor": 2, // 不允许使用 new Array(2, 1, 2) 来创建数组，而改用 []
45. "no-bitwise": 2, // 禁止使用位运算符,包括以下情况 var x = y | z; var x = y & z; var x = y ^ z; var x = ~ z; var x = y << z; var x = y >> z; var x = y >>> z; x |= y; x &= y; x ^= y; x <<= y; x >>= y; x >>>= y;
46. "no-continue": 2, // 是否允许使用 continue 语句
47. "no-inline-comments": 0, // 注释是否允许在代码的后面，开启则不允许
48. "no-lonely-if": 2, // 应该使用 else if ，而不要使用 else { if(){} }
49. "no-mixed-operators": [2, {
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
50. "no-mixed-spaces-and-tabs": 2, // 不允许空格和制表位混合使用
51. "no-multi-assign": 0, // 不要连续赋值，比如 var a = b = c = 5;
52. "no-multiple-empty-lines": 2, // 代码中不要出现太多空行，默认最多为 2 行
53. "no-negated-condition": 0, // 是否允许使用否定表达式 if (!a)
54. "no-nested-ternary": 0, // 是否允许使用嵌套的三元表达式
55. "no-new-object": 2, // 实例化对象时，不要用 new Object(); 而用 {}
56. "no-plusplus": [0, {"allowForLoopAfterthoughts": true}], // 是否允许使用 ++ 或 --
57. "no-restricted-syntax": [2, {
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
    }], // 指定不允许的语法
58. "no-tabs": 2, // 是否允许使用制表符
59. "no-ternary": 0, // 是否允许三元操作符
60. "no-trailing-spaces": [2, {
    "skipBlankLines": false,
    "ignoreComments": false,
    }], // 不允许行尾有空白字符
61. "no-underscore-dangle": 0, // 是否允许变量名前后有 \_
62. "no-unneeded-ternary": 2, // 请不要使用不必要的三元表达式，比如 var isYes = answer === 1 ? true : false;
63. "no-whitespace-before-property": 2, // 在对象属性前面不应该加空格
64. "nonblock-statement-body-position": 2, // 如果在条件或循环表达式中，只有一行的表达式，并且没有使用 {} ，最好跟条件写在一行
65. "object-curly-newline": [2, "always", { "multiline": true }], // 定义对象属性应该在一行还是多行
66. "object-curly-spacing": [2, "always"], // 验证花括号内的空格
67. "object-property-newline": [2, {
    "allowAllPropertiesOnSameLine": true,
    }], // 对象属性在新行显示
68. "one-var": [2, "never"], // 多个变量声明是否用一个 var 语句
69. "one-var-declaration-per-line": [2, "always"], // 定义多个变量时，是否需要每个变量在一行显示
70. "operator-assignment": 2, // 对于赋值表达式，应该使用其简略式写法，比如 x = x + y 应该用 x += y
71. "operator-linebreak": [0, "before", { "overrides": { "=": "after" } }], // 有操作符时，是否检测打断的行
72. "padded-blocks": [2, { "blocks": "never", "classes": "never", "switches": "never" }], // 是否验证空白块
73. "padding-line-between-statements": [0, {blankLine: "always", prev: "*", next: "return"}], // 不同的语句中间是否加一空行
74. "prefer-object-spread": 0, // 使用 Object.assign 时，第一个参数应该是已有的对象变量，而非静态常量
75. "quote-props": [2, "as-needed"], // 属性加单引号或双引号，建议不用加的最好不加
76. "quotes": [2, "single"], // 字符串引号，建议使用单引号
77. "semi": [2, "always"], // 总是要求加上分号
78. "semi-spacing": 2, // 分号与代码之间的间隔
79. "semi-style": [2, "last"], // 分号是放到行尾还是下一行行首，默认为行尾
80. "sort-keys": 0, // 属性是否需要排序
81. "sort-vars": 0, // 定义多个变量时，是否按字符顺序来排序，不建议开启该规则
82. "space-before-blocks": 2, // 在每一块后面需要添加一空格
83. "space-before-function-paren": [2, {
    "anonymous": "never",
    "named": "never",
    "asyncArrow": "always"
    }], // 在函数名和() 之间有一空格
84. "space-in-parens": 2, // 括号和参数之间应该没有空格
85. "space-infix-ops": 2, // 表达式中间应该添加空白
86. "space-unary-ops": 2, // 在一元操作符前或后不应该有空白
87. "spaced-comment": [2, "always", {
    "line": {
    "markers": ["/", "=", "!"],
    "exceptions": ["-", "+"]
    },
    "block": {
    "markers": ["=", "!"],
    "exceptions": ["-", "+"],
    "balanced": true
    }
    }], // 如果开启，则会检测注释符后是否有空白，always 必须有，而 never 则没有
88. "switch-colon-spacing": [2, {"after": true, "before": false}], // switch 语句条件冒号前后是否加空格
89. "template-tag-spacing": 2, // 标记模板内容，中间是否需要加空格，默认不需要加
90. "unicode-bom": [2, "never"], // 不需要显示指定 Unicode
91. "wrap-regex": 0, // 字面正则表达式需要用括号括起来

### es6 书写规则

1. "arrow-body-style": [2, "as-needed"], // 箭头函数是否需要加上 {}
2. "arrow-parens": [2, "as-needed"], // 对于箭头函数，需要添加括号，比如(a) => {}; 而不应该简写为 a => {};
3. "arrow-spacing": 2, // 箭头函数中，箭头运算符前后需要添加空白
4. "constructor-super": 2, // 父类构造函数不应该调用 super() ，但派生类必须要调用 super()
5. "generator-star-spacing": 2, // generator functions 中 \* 前应该添加空白，后面不应该有空白
6. "no-class-assign": 2, // 不能再修改已经声明的类，即不能重新给已经声明的类赋其他值
7. "no-confusing-arrow": 2, // 箭头函数中不建议使用引起疑惑的表达式，比如 var x = a => 1 ? 2 : 3，如果使用需要用 {} 括起来
8. "no-const-assign": 2, // 不能修改常量值
9. "no-dupe-class-members": 2, // 类成员不能重复定义
10. "no-duplicate-imports": 2, // 不应该重复导入相同的模块
11. "no-new-symbol": 2, // 对于 Symbol,不要使用 new,例如 var foo = new Symbol("foo");
12. "no-restricted-imports": 0, // 禁止特定的导入
13. "no-this-before-super": 2, // 不允许在 super() 之前使用 this/super 语句
14. "no-useless-computed-key": 2, // 禁止不必要的属性计算表达式
15. "no-useless-constructor": 2, // 禁止不必要的构造方法，比如空的构造器
16. "no-useless-rename": 2, // 禁止不必要的别名表达式，比如 export { foo as bar } from "foo";
17. "no-var": 2, // 建议使用 const 或 let 来代替 var
18. "object-shorthand": 2, // 利用简写法来定义对象属性，如 var foo = {x, y, z}; 表示 var foo = {x:x, y:y, z:z};
19. "prefer-arrow-callback": 2, // 建议使用箭头函数作为回调函数
20. "prefer-const": 2, // 能使用常量的地方尽量使用 const
21. "prefer-destructuring": [2, {
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
    }], // 尽量使用解构表达式，比如 const [ foo ] = array; 或 const { bar: foo } = object;
22. "prefer-numeric-literals": 2, // 不允许直接使用 parseInt 解析字面量变量，比如 parseInt("111110111", 2)，而 parseInt(foo, 2); 是允许的
23. "prefer-rest-params": 2, // 建议使用 rest (...args) 参数来代替 arguments
24. "prefer-spread": 2, // 不要使用 apply，应该使用扩展操作符来调用 Math.max(...args);
25. "prefer-template": 2, // 建议使用模板字符串来代替字符串拼接，比如 var str = `Hello, ${name}!`;
26. "require-yield": 2, // generator functions 应该有 yield
27. "rest-spread-spacing": 2, // rest 表达式中间是否加空格，默认不加
28. "sort-imports": 0, // improt 的变量名称导入应该按顺序排位
29. "symbol-description": 2, // 使用 Symbol 定义变量时，需要传入 Symbol description
30. "template-curly-spacing": [2, "never"], // 模板表达式中 {} 前后是否需要空格
31. "yield-star-spacing": [2, "after"], // yield \* 号前后是否需要空格
