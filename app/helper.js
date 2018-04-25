import jwt from 'jsonwebtoken';

const helper = {
    generateToken: (user, jwt_config) => {
        var payload = {
            user: {
                id: user.id,
                name: user.truename
            },
            iss: jwt_config.iss,
            exp: Math.floor(Date.now() / 1000) + jwt_config.exp // seconds
        };
        var token = jwt.sign(payload, jwt_config.secret);
        return token;
    }
}

export default helper;