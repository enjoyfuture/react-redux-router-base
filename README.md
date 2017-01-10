# node-react-redux-base-demo

## Server 

### generate dll file

At first, generate dll file. You need to exec the following command.

```
npm run dll
```

### start server

```
npm start
```

## Build

```
npm build
```

## support IE8

We need to add the following files in html page.

* 

## Issue

http://gitlab.cbpmgt.com/fe-team/node-react-redux-base-demo/issues

## Change Log

Please view [here](./CHANGELOG.md)
    


/**
 * CANNOT use `import` to import `es5-shim`,
 * because `import` will be transformed to `Object.defineProperty` by babel,
 * `Object.defineProperty` doesn't exists in IE8,
 * (but will be polyfilled after `require('es5-shim')` executed).
 * 关于 ie8 支持可以查看 https://github.com/xcatliu/react-ie8
 */
