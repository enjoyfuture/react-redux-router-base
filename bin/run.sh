#!/bin/sh
baseDir="$(cd "$(dirname "$0")"; pwd)"
appName="node-demo"

if [ ! $1 ]; then
    echo "ERROR! Please enter param: start or stop"
    echo "demo: sh ./bin/run.sh start"
else
    if [ $1 = "start" ]; then
        #echo "start"
        pm2 stop $appName
        pm2 delete $appName
        pm2 start ${baseDir}/www --name $appName
    elif [ $1 = "stop" ]; then
        #echo "stop"
        pm2 stop $appName
        pm2 delete $appName
    else
        echo "ERROR! Please enter param: start or stop"
        echo "demo: sh ./bin/run.sh start"
    fi
fi