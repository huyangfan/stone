import app from './app.js';
import config from './config';
import mongoose from 'mongoose';
import cluster from 'cluster';
import cp from 'child_process';


if (config.env == 'prod') {
    if (cluster.isMaster) {
        console.log(`主进程 ${process.pid} 正在运行`);

        global.schedule = cp.fork('./app/schedule');

        for (let i = 0; i < 4; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`工作进程 ${worker.process.pid} 已退出 code:${code} ${signal}`);
        });

    } else {
        (async function () {
            try {
                await mongoose.connect(config.mongodb.url, config.mongodb.options);
            } catch (error) {
                console.error('连接MongoDB失败：', error);
            }
        })();

        app.listen(config.port);
        console.info(`app listening on ${config.port} in ${config.env}`);

        console.info(`工作进程 ${process.pid} 已启动`);

        process.on('exit', () => {
            console.log('进程退出');
        });

        process.on('uncaughtException', () => {
            console.log('捕获到异常');
        });
    }
} else {
    (async function () {
        try {
            await mongoose.connect(config.mongodb.url, config.mongodb.options);
        } catch (error) {
            console.error('连接MongoDB失败：', error);
        }
    })();

    global.schedule = cp.fork('./app/schedule');

    app.listen(config.port);
    console.info(`app listening on ${config.port} in ${config.env}`);

    process.on('exit', () => {
        console.log('进程退出');
    });

    process.on('uncaughtException', () => {
        console.log('捕获到异常');
    });
}

