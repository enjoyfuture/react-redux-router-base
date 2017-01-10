const fs = require('fs');
const path = require('path');
const transform = require('es3ify').transform;
const glob = require('glob');

/**
 * read file content
 * @param source
 * @returns {string}
 */
function read(source) {
  let contents = '';
  try {
    contents = fs.readFileSync(source, 'utf8');
  } catch (e) {
    console.log(e);
    throw new Error('read file failed!');
  }
  return contents;
}

/**
 * write file
 * @param dest
 * @param contents
 */
function write(dest, contents) {
  try {
    fs.writeFileSync(dest, contents);
  } catch (e) {
    console.log(e);
    console.log('write content to file failed!');
  }
}

/**
 * copy
 * @param source
 * @param dest
 */
function copy(source, dest) {
  let contents = '';
  try {
    contents = fs.readFileSync(source, 'utf8');
    fs.writeFileSync(dest, contents);
  } catch (e) {
    console.log(e);
    console.log('copy file failed!');
  }
}

//All files in dist
const directoryPath = path.join(__dirname, 'public', 'dist');
const files = glob.sync('*.js', {dot: true, nodir: true, cwd: directoryPath});

for (let i = 0, len = files.length; i < len; i++) {
  const content = read(path.join(directoryPath, files[i]));
  const newContent = transform(content);
  write(path.join(directoryPath, files[i]), newContent);
}

//copy files
const nodeModules = path.join(__dirname, 'node_modules');
const dest = path.join(__dirname, 'public', 'dist');

copy(path.join(nodeModules, 'es5-shim', 'es5-shim.js'), path.join(dest, 'es5-shim.js'));
copy(path.join(nodeModules, 'es5-shim', 'es5-sham.js'), path.join(dest, 'es5-sham.js'));
copy(path.join(__dirname, 'public', 'es5-sham-ie8.js'), path.join(dest, 'es5-sham-ie8.js'));

