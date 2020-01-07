/* eslint-disable no-unused-vars */
import commonHandler from './common';
import sequelizeHandler, { isSequelizeError } from './sequelize';
import jwtHandler, { isJWTError } from './jwt';
import multerHandler, { isMulterError } from './multer';

const errorTypes = {
    sequelize: 'sequelize',
    jwt: 'jwt',
    multer: 'multer',
    common: 'common',
};

const errorHandlers = {
    [errorTypes.sequelize]: sequelizeHandler,
    [errorTypes.jwt]: jwtHandler,
    [errorTypes.multer]: multerHandler,
    [errorTypes.common]: commonHandler,
};

function getErrorType(err) {
    if (isSequelizeError(err)) {
        return errorTypes.sequelize;
    }
    if (isJWTError(err)) {
        return errorTypes.jwt;
    }
    if (isMulterError(err)) {
        return errorTypes.multer;
    }
    return errorTypes.common;
}

function errorHandler(err, req, res, next) {
    const errorType = getErrorType(err);
    const [status, message] = errorHandlers[errorType](err);
    const result = {
        error: {
            status,
            message,
        },
    };
    res.status(status).json(result);
}

export default errorHandler;
