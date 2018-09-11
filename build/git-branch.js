// jci 打包时自动创建分支脚本
const childProcess = require('child_process');
const moment = require('moment');
const chalk = require('chalk');

const { exec } = childProcess;

// 可以额外输入分支别名，用来简单的标示分支名称
const branchAlias = process.argv[2];
const branchName = `dev-${moment().format('YYYYMMDDHHmmss')}${
  branchAlias ? `-${branchAlias}` : ''
}`;

console.log(chalk.green('正在创建上线分支，请稍等'));
console.log(chalk.green('.......'));

/* eslint-disable max-len */
exec(
  `git checkout -b ${branchName} && git push --set-upstream origin ${branchName} && git checkout dev`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      console.log(chalk.red(`创建失败：${error}`));
      return;
    }
    console.log(chalk.green(`stdout: ${stdout}`));
    console.log(
      chalk.green('创建上线分支成功，请用新的分支上线，祝您上线成功！')
    );
    console.log(chalk.green('新的上线分支为：'), chalk.cyan(branchName));
    console.log(chalk.magenta('简单生活！快乐工作！'));
  }
);
