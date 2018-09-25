const util = require('util');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);

const { CLIEngine } = require('eslint');
const eslintOption = { fix: true, ignore: true };
// https://eslint.org/docs/developer-guide/nodejs-api#cliengine
const cli = new CLIEngine(eslintOption);
const stylelint = require('stylelint');

function getStderrLevel(number) {
  if (typeof number === 'string') {
    return number;
  }
  switch (number) {
    case 2:
      return 'error';
    case 1:
      return 'warn';
    default:
  }
  return 'undefined';
}

async function runEsLint() {
  // 标记是否通过检测
  let pass = 0;
  // --cached 表示暂存区，即执行 git add 后的文件
  const result = await exec('git diff --cached --name-only| grep .js$').catch(
    error => console.log(chalk.green('\ngit 暂存区没有要提交的 js 文件'))
  );

  if (!result) {
    return Promise.resolve(0);
  }

  const { stdout, stderr } = result;

  if (stderr) {
    console.log(chalk.red(`exec stderr: ${stderr}`));
  }

  if (stdout.length) {
    const array = stdout.split('\n');
    array.pop();
    const results = cli.executeOnFiles(array).results;
    let errorCount = 0;
    let warningCount = 0;
    results.forEach(item => {
      errorCount += item.errorCount;
      warningCount += item.warningCount;
      const messages = item.messages.filter(it => {
        if (eslintOption.ignore) {
          return it.line !== undefined;
        }
        return true;
      });

      if (messages.length > 0) {
        console.log('\n');
        console.log(
          chalk.cyan('不符合 eslint 规则文件：'),
          chalk.cyan(item.filePath)
        );
        item.messages.forEach(obj => {
          const level = getStderrLevel(obj.severity);
          console.log(
            chalk.red(
              `错误或警告信息:  行${obj.line || 0}, 列${obj.column ||
                0}, 错误信息:  ${level} ${obj.message}`
            ),
            chalk.redBright(` 错误规则：${obj.ruleId || '未知'}`)
          );
          pass = 1;
        });
      }
    });

    if (warningCount > 0 || errorCount > 0) {
      console.log(
        chalk.red(
          `\n   ${errorCount +
            warningCount} problems (${errorCount} ${'errors'} ${warningCount} warnings)`
        )
      );
    }
  }

  return Promise.resolve(pass);
}

async function runStyleLint() {
  // 标记是否通过检测
  let pass = 0;

  const result = await exec('git diff --cached --name-only| grep .scss$').catch(
    error => console.log(chalk.green('\ngit 暂存区没有要提交的 scss 文件'))
  );

  if (!result) {
    return Promise.resolve(0);
  }

  const { stdout, stderr } = result;

  if (stderr) {
    console.log(chalk.red(`exec stderr: ${stderr}`));
  }

  if (stdout.length) {
    const files = stdout.split('\n');
    files.pop();

    // https://stylelint.io/user-guide/node-api/
    return stylelint
      .lint({
        configFile: '.stylelintrc.yaml',
        files,
        fix: true,
      })
      .then(results => {
        let errorCount = 0;
        let warningCount = 0;
        JSON.parse(results.output).forEach(item => {
          if (item.warnings.length > 0) {
            console.log('\n');
            console.log(
              chalk.cyan(`不符合 stylelint 规则文件：${item.source}`)
            );
            item.warnings.forEach(obj => {
              const level = getStderrLevel(obj.severity);

              warningCount += obj.severity === 'error' ? 0 : 1;
              errorCount += obj.severity === 'error' ? 1 : 0;

              console.log(
                chalk.red(
                  `错误或警告信息:  行${obj.line || 0}, 列${obj.column ||
                    0}, 错误信息:  ${level}  ${obj.text}`
                ),
                chalk.redBright(` 错误规则：${obj.rule || '未知'}`)
              );
              pass = 1;
            });
          }
        });
        if (warningCount > 0 || errorCount > 0) {
          console.log(
            chalk.red(
              `\n   ${errorCount +
                warningCount} problems (${errorCount} ${'errors'} ${warningCount} warnings)`
            )
          );
        }

        return Promise.resolve(pass);
      });
  }
}

async function runLint() {
  const pass1 = await runEsLint();
  const pass2 = await runStyleLint();
  return Promise.resolve(Number(pass1 || pass2));
}

runLint().then(pass => {
  if (pass) {
    process.exit(pass);
  }
});
