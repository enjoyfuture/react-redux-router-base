import chalk from 'chalk';
import autoprefixer from 'autoprefixer';
import { browsers } from './webpack.config.dev.babel';

// 检测样式前缀
const info = autoprefixer({
  browsers,
}).info();

console.log(chalk.magenta(info));
