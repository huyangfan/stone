import jwt from 'jsonwebtoken';
import config from '../../config';
import errCodes from '../error_codes';
import helper from '../helper';

const auth = {
    // jwt token 
    requiresToken: (ctx, next) => {
        const token = ctx.get('Authorization');
        if (!token) console.log('missing token header');
        var decoded;
        try {
            decoded = jwt.verify(token, config.jwt.secret);
        } catch (err) {
            // expired or invalid, redirect to login
            return ctx.body = errCodes.authFail;
        }
        console.log('token decoded:', decoded);
        // when the token is about to expire, generate new token and 
        // set into custom response header 'X-New-Token'
        if (Date.now() / 1000 > (decoded.iat + config.jwt.refreshIn)) {
            const newtoken = helper.generateToken(decoded.user, config.jwt);
            ctx.set('X-New-Token', newtoken);
        }
        ctx.user = decoded.user;
        next();
    }
}

export default auth;