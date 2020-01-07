import useAuth from './use-auth';

function requireAuth(req, res, next) {
    try {
        if (res.locals.account === undefined) {
            throw Error(401);
        }
        next();
    } catch (err) {
        next(err);
    }
}

export default [
    useAuth,
    requireAuth,
];
