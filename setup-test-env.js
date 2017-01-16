const mockCssModules = require('mock-css-modules');

// By default, mock-css-modules will handle require()d .css files.
// If your project has some other extensions (such as .sass, .scss, etc),
// you'll need to register handlers for those, too:
mockCssModules.register(['.css', '.less']);

// Ignore assets
require.extensions['.jpg'] = noop => noop;
require.extensions['.jpeg'] = noop => noop;
require.extensions['.png'] = noop => noop;
require.extensions['.gif'] = noop => noop;
require.extensions['.svg'] = noop => noop;

require('babel-register');

//window 和 document 对象
global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.location = document.location;
global.navigator = window.navigator;
