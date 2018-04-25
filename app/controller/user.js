import User from '../model/user';
import helper from '../helper';
import config from '../../config'

export default {
    register: async (ctx, next) => {
        console.log('ctx.request', ctx.request.body);

        const user = new User(ctx.request.body);
        await user.save();
        ctx.body = 'user created!'
    },
    login: async (ctx, next) => {
        console.log('ctx.request', ctx.request.body);
        const person = await User.findOne({ username: ctx.request.body.username });
        person.comparePassword(ctx.request.body.password, (err, isMatch) => {
            if (err) throw err;
        });
        const token = helper.generateToken({
            id: person.id,
            truename: person.truename
        }, config.jwt);
        console.log('token:', token);
        ctx.body = {
            userid: person.id,
            token: token
        };
        next();
    },
    profile: async (ctx, next) => {
        ctx.body = ctx.user;
    }
}