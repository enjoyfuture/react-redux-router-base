const util = require('util');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);

const CLIEngine = require('eslint').CLIEngine;
// https://eslint.org/docs/developer-guide/nodejs-api#cliengine
const cli = new CLIEngine({ fix: true });
const stylelint = require('stylelint');

function getstderrLevel(number) {
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
  const { stdout, stderr } = await exec(
    'git diff --cached --name-only| grep .js$'
  );

  if (stderr) {
    console.log(chalk.red(`exec stderr: ${stderr}`));
  }

  if (stdout.length) {
    const array = stdout.split('\n');
    array.pop();
    const results = cli.executeOnFiles(array).results;
    let errorCount = 0;
    let warningCount = 0;
    results.forEach(result => {
      errorCount += result.stderrCount;
      warningCount += result.warningCount;
      if (result.messages.length > 0) {
        console.log('\n');
        console.log(
          chalk.red('不符合 eslint 规则文件：'),
          chalk.red(result.filePath)
        );
        result.messages.forEach(obj => {
          const level = getstderrLevel(obj.severity);
          console.log(
            chalk.red(
              `错误或警告信息：  ${obj.line}:${obj.column}  ${level} ${
                obj.message
              }  ${obj.ruleId}`
            )
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

  const { stdout, stderr } = await exec(
    'git diff --cached --name-only| grep .scss$'
  );
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
        JSON.parse(results.output).forEach(result => {
          warningCount += result.warnings.length;
          // FIXME
          errorCount += result.warnings.length;

          if (result.warnings.length > 0) {
            console.log('\n');
            console.log(chalk.red(`不符合 stylelint 文件：${result.source}`));
            result.warnings.forEach(obj => {
              const level = getstderrLevel(obj.severity);
              console.log(
                chalk.red(
                  `   ${obj.line}:${obj.column}  ${level}  ${obj.text}  ${
                    obj.rule
                  }`
                )
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
