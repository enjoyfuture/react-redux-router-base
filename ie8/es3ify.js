const fs = require('fs');
const path = require('path');
const transform = require('es3ify').transform;
const glob = require('glob');
const utils = require('./utils');
const read = utils.read;
const write = utils.write;
const copy = utils.copy;

//All files in dist
const directoryPath = path.join(__dirname, '..', 'public', 'dist');
const files = glob.sync('*.js', {dot: true, nodir: true, cwd: directoryPath});

for (let i = 0, len = files.length; i < len; i++) {
  const content = read(path.join(directoryPath, files[i]));
  const newContent = transform(content);
  write(path.join(directoryPath, files[i]), newContent);
}

//copy files
const rootPath = path.join(__dirname, '..');
const nodeModules = path.join(rootPath, 'node_modules');
const dest = path.join(rootPath, 'public', 'dist');

copy(path.join(nodeModules, 'es5-shim', 'es5-shim.min.js'), path.join(dest, 'es5-shim.min.js'));
copy(path.join(nodeModules, 'es5-shim', 'es5-sham.min.js'), path.join(dest, 'es5-sham.min.js'));
copy(path.join(nodeModules, 'respond.js', 'dest', 'respond.min.js'), path.join(dest, 'respond.min.js'));
copy(path.join(nodeModules, 'html5shiv', 'dist', 'html5shiv.min.js'), path.join(dest, 'html5shiv.min.js'));
copy(path.join(nodeModules, 'fetch-ie8', 'fetch.js'), path.join(dest, 'fetch-ie8.js'));
copy(path.join(__dirname, 'console.js'), path.join(dest, 'console.js'));
copy(path.join(__dirname, 'es5-sham-ie8.js'), path.join(dest, 'es5-sham-ie8.js'));
copy(path.join(__dirname, 'ie8-eventlistener.js'), path.join(dest, 'ie8-eventlistener.js'));

