export default {
    appkeys: ['my-secret-key'],
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'dev',
    host: '127.0.0.1',
    logDir: 'logs',
    uploadDir: 'uploads',
    publicDir:'public',
    mongodb: {
        url: 'mongodb://locahost:27017/stone',
        options: {
            keepAlive: 1
        }
    },
    jwt: {
        secret: 'mySecret',
        iss: 'www.mycompany.com',
        exp: 24 * 3600, // token 有效期1天
        refreshIn: 12 * 3600 // 12小时之后的前端接口调用将重新颁发token 
    },
    session: {
        key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
        rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. 
        The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    },
    // mysql:{
    //     url: 'mysql://locahost:3306/stone'
    // },
}

