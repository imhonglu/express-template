import jwt from 'jsonwebtoken';

import { AUTH } from '~/settings';

function useAuth(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            next();
            return;
        }
        const [type, token] = authorization.split(' ');
        if (type !== 'Bearer' || !token) {
            next();
            return;
        }
        res.locals.account = jwt.verify(token, AUTH.secretKey.accessToken);
        next();
    } catch (err) {
        next(err);
    }
}

export default useAuth;
