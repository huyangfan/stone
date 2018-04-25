import Koa from 'koa';
import koalogger from 'koa-logger';
import koaBody from 'koa-body';
import serve from 'koa-static';
import path from 'path';
import Boom from 'boom';
import helmet from 'helmet';
import config from './config';
import compress from 'koa-compress';
import router from './app/router';
import logger from './app/logger';
import stripAnsi from 'strip-ansi';
import session from 'koa-session';

const app = new Koa();

app.keys = config.appkeys;

// 在最外层中间件处理错误
const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.error('中间件错误:', err);
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
    }
};

app.use(handler);

// app的error事件监听
app.on('error', (err, ctx) => {
    console.error('server error:', err);
});

app.use(koalogger((str, args) => {
    console.info(stripAnsi(str), new Date().toISOString());
}));

app.use(koaBody());
app.use(serve(config.publicDir));
app.use(compress());

// session for flash messages (uses signed session cookies, with no server storage)
app.use(session(config.session, app));

// return response time in X-Response-Time header
app.use(async function responseTime(ctx, next) {
    const t1 = Date.now();
    await next();
    const t2 = Date.now();
    ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms');
});

console.info('loading routes');
app.use(router.routes()).use(router.allowedMethods());
// app.use(helmet()); //目前helmet存在问题：TypeError: res.setHeader is not a function

export default app;