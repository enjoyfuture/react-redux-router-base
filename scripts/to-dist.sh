#!/usr/bin/env bash
echo '开始整理需要打包的目录'
echo '清理 dist 目录, script: \\rm -rf ./dist/ && mkdir dist'
\rm -rf ./dist/
mkdir dist

echo 'script:\\cp -R ./node_modules/ ./dist/node_modules/ & \\cp -R ./bin/ ./dist/bin/ & \\cp -R ./public/ ./dist/public/ & \\cp -R ./server/ ./dist/server/ & \\cp -R ./common/ ./dist/common/'
\cp -R ./node_modules/ ./dist/node_modules/ & \cp -R -P ./bin/ ./dist/bin/ & \cp -R ./public/ ./dist/public/ & \cp -R ./server/ ./dist/server/ & \cp -R ./common/ ./dist/common/

echo '清理 dist/public/dll 目录, script: \\rm -rf ./dist/public/dll/'
\rm -rf ./dist/public/dll/

echo '目录授权, script:chmod -R +x ./dist/'
chmod -R +x ./dist/
echo '需要打包的目录整理完毕'
