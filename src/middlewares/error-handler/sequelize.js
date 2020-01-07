export const isSequelizeError = err => !!err.errors;

const messages = {
    'notNull Violation': '값이 필요합니다.',
    'unique violation': '값이 중복됩니다.',
    'Validation error': '값이 형식에 알맞지 않습니다.',
};

const sequelizeHandler = err => {
    const moreInfo = err.errors.reduce((acc, { type, path, message: originMessage }) => {
        const message = messages[type] || originMessage;
        acc.push(`${path} ${message}`);
        return acc;
    }, []);
    return [400, moreInfo];
};

export default sequelizeHandler;
