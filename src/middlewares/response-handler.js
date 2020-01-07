/* eslint-disable no-unused-vars */

function responseHandler(req, res, next) {
    const { data } = res.locals;
    if (data === undefined || data === null) {
        throw Error(404);
    }
    res.status(200).json({ data });
}

export default responseHandler;
