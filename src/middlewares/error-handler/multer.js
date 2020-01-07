export const isMulterError = err => [
    'MulterError',
].includes(err.name);

const multerHandler = ({ message }) => {
    if (message === 'Unexpected field') {
        return [400, '잘못된 키값입니다.'];
    }
    return [400, '잘못된 파일입니다.'];
};

export default multerHandler;
