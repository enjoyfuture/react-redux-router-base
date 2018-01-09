#!/bin/bash
##########################################
# 启动或关闭应用                           #
# ！！修改内容！！                         #
#      【第9行】appName的值改为自己的应用名  #
# tanxiangyuan@20170104                  #
##########################################

export appName="react-redux-router-base"
export PATH=/export/local/node-v6.9.1/bin:/export/local/pm2-2.9.1/bin:$PATH
#export PM2_HOME=/export/local/pm2-home

#根据输入参数设置不同的pm2_home,输入参数在service脚本中指定
if [ $2 -a $2 = "beta" ]; then
    export PM2_HOME=/export/local/pm2-home-demo #测试环境带上项目名称防止pm2_home冲突
else
    export PM2_HOME=/export/local/pm2-home-v1.0.0 #非测试环境一定要用pm2-home！！！！
fi

baseDir=`cd $(dirname $0);pwd`
logPath="/export/log/$appName"
logFile="$logPath/${appName}_detail.log"

if [ ! -d "$logPath" ]; then
    #创建日志目录并授权
    mkdir -p "$logPath" && chmod -R 777 $logPath
fi

if [ ! $1 ]; then
    echo "ERROR! Please enter param: start or stop"
    echo "demo: sh ./bin/run.sh start"
else
    if [ $1 = "start" ]; then
        #echo "start"
        pm2 stop $appName
        pm2 delete $appName

        #单个文件可拆分大小
        pm2 set pm2-logrotate:max_size 50M
        #最多保留10个文件
        pm2 set pm2-logrotate:retain 10
        pm2 set pm2-logrotate:rotateModule true
        #最多每30分钟重命名一个文件，所以到分钟就可以了
        pm2 set pm2-logrotate:dateFormat 'YYYYMMDDHHmm'
        #每天0点执行
        pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
        #30分钟检查一次文件大小，如果文件已经大于10M，就按dataFormat格式重命名当前输出文件，并新建一个输出文件
        pm2 set pm2-logrotate:workerInterval 1800

        pm2 start ${baseDir}/www --name "$appName" -l "$logFile" -o "/dev/null" -e "/dev/null" -i max --merge-logs
    elif [ $1 = "stop" ]; then
        #echo "stop"
        if [ $2 -a $2 = "beta" ]; then
            pm2 delete all
        else
            #注意：生产环境一个pm2不能部署多个应用。切记！切记！
            kill $(ps aux | grep -i 'pm2' | grep -v grep | awk '{print $2}')
        fi
    else
        echo "ERROR! Please enter param: start or stop"
        echo "demo: sh ./bin/run.sh start"
    fi
fi
