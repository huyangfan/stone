import Boom from 'boom';
import koaRouter from 'koa-router';
import koaBody from 'koa-body';
import usercontroller from './controller/user';
import helper from './helper';
import err from './error_codes';
import auth from './middleware/auth';
import config from '../config';

const router = new koaRouter({
    // prefix: '/api'
});

router.allowedMethods();

// basic test
router.get('/hello', (ctx, next) => {
    ctx.body = { hello: 'world' };
    next();
});

// user login with username and password
router.post('/login', usercontroller.login);

// user register
router.post('/register', usercontroller.register);

// user profile
router.get('/profile', auth.requiresToken, usercontroller.profile);

// file upload demo
router.post('/upload', koaBody({
    multipart: true,
    formidable: {
        uploadDir: config.uploadDir
    }
}), (ctx, next)=>{
    console.log(ctx.request.body);
})

export default router;