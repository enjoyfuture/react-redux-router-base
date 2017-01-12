const path = require('path');
const utils = require('./utils');
const read = utils.read;
const write = utils.write;

console.info('替换 SimpleEventPlugin.js');
const nodeModules = path.join(__dirname, '..', 'node_modules');
const simpleEventPluginPath = path.join(nodeModules, 'react-dom', 'lib', 'SimpleEventPlugin.js');
const content = read(simpleEventPluginPath);
/*eslint-disable no-useless-escape*/
const newContent = content.replace(/event\[0\]/g, 'event.substring(0, 1)');
write(simpleEventPluginPath, newContent);