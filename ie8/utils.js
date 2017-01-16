const fs = require('fs');
const path = require('path');
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

module.exports.read = read;
module.exports.write = write;
module.exports.copy = copy;
