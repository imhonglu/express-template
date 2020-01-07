import { COMMON_JWT_OPTION } from './base';

export default {
    saltRounds: 12,
    secretKey: {
        accessToken: 'accessTokenSecretKey',
        refreshToken: 'refreshTokenSecretKey',
    },
    jwtOption: {
        accessToken: {
            ...COMMON_JWT_OPTION,
            expiresIn: '1h',
        },
        refreshToken: {
            ...COMMON_JWT_OPTION,
            expiresIn: '14d',
        },
    },
};
