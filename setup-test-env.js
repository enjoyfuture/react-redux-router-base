const mockCssModules = require('mock-css-modules');

// By default, mock-css-modules will handle require()d .css files.
// If your project has some other extensions (such as .sass, .scss, etc),
// you'll need to register handlers for those, too:
mockCssModules.register(['.css', '.scss']);

// Ignore assets
require.extensions['.jpg'] = noop => noop;
require.extensions['.jpeg'] = noop => noop;
require.extensions['.png'] = noop => noop;
require.extensions['.gif'] = noop => noop;
require.extensions['.svg'] = noop => noop;

require('babel-register');

//window 和 document 对象
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const {window} = new JSDOM('<!DOCTYPE html><body></body>');
global.window = window;
global.document = window.document;
global.location = window.document.location;
global.navigator = window.navigator;
