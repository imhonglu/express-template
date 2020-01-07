/* eslint-disable no-console */
const errors = {
    400: '잘못된 요청입니다.',
    401: '인증되지 않았습니다.',
    403: '허용되지 않았습니다.',
    404: '데이터를 찾지 못했습니다.',
    409: '데이터가 충돌 됐습니다.',
    419: '인증이 만료됐습니다.',
    500: '서버 오류가 발생했습니다.',
};

const commonHandler = err => {
    if (err instanceof SyntaxError) {
        return [400, '잘못된 JSON 형식입니다.'];
    }
    const [status, message = errors[status]] = err.message ? err.message.split(',') : String(err).split(',');
    if (errors[status]) {
        return [status, message];
    }
    console.error(err);
    return [500, '서버 에러입니다. 관리자에게 문의하세요'];
};

export default commonHandler;
