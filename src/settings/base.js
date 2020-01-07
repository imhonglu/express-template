export const DEBUG = process.env.NODE_ENV !== 'production';
export const COMPANY = 'company';
export const API_NAME = 'api';
export const API_VERSION = `v${process.env.npm_package_version.slice(0, 1)}`;
export const COMMON_JWT_OPTION = {
    issuer: `${COMPANY}_${API_NAME}_${API_VERSION}`,
};

export default {
    path: `/${API_NAME}/${API_VERSION}`,
    port: DEBUG ? 3000 : 8081,
    jsonOption: {
        limit: '50mb',
    },
};
