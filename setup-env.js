const path = require('path');
const fs = require('fs');

console.log(`in setup Env , process.env.NODE_ENV is [${process.env.NODE_ENV}]`);

// 根据当前编译环境修改 dist/bin/www 环境变量
const wwwPath = path.join(__dirname, 'dist/bin', 'www');

if (!fs.existsSync(wwwPath)) {
  console.error('error : 没有找到 dist/bin/www');
  process.exit(1);
}

// 修改环境变量
fs.readFile(wwwPath, 'utf8', (err, content) => {
  if (!err) {
    const _content = content.replace('process.env.NODE_ENV = \'development\';', `process.env.NODE_ENV = '${process.env.NODE_ENV}';`);
    fs.writeFileSync(wwwPath, _content);
  }
});
