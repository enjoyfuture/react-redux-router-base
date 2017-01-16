/**
 * Created by tanxiangyuan on 2016/10/24.
 */

const path = require('path');
const fs = require('fs');

console.log(`in setup Env , process.env.NODE_ENV is [${process.env.NODE_ENV}]`);

//根据当前编译环境的配置拼接对应的配置文件地址
const envFilePath = path.join(__dirname, 'server/config', process.env.NODE_ENV, 'index.js');

if (!fs.existsSync(envFilePath)) {
  console.error(`error : 根据当前NODE_ENV[${process.env.NODE_ENV}]定义，没有找到对应的环境配置文件:${envFilePath}`);
  process.exit(1);
}

const validEnvPath = path.join(__dirname, 'server/config/index.js');

//检查bin目录是否已经存在对应的配置文件，有就删除
if (fs.existsSync(validEnvPath)) {
  fs.unlinkSync(validEnvPath);
}

//将编译环境对应的配置文件拷贝到bin目录
fs.createReadStream(envFilePath).pipe(fs.createWriteStream(validEnvPath));