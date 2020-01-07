export const isJWTError = err => [
    'TokenExpiredError',
    'JsonWebTokenError',
    'NotBeforeError',
].includes(err.name);

const jwtHandler = ({ message }) => {
    if (message === 'jwt expired') {
        return [419, '인증이 만료됐습니다.'];
    }
    return [401, '잘못된 인증정보입니다.'];
};

export default jwtHandler;
