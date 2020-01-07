import { Account } from '~/models';

export const method = 'POST';

export default async function (req, res, next) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw Error([403, '사용자 이름과 비밀번호를 입력해주세요.']);
        }
        const where = {
            username,
        };
        const account = await Account.findOne({ where });
        if (!account) {
            throw Error([404, '사용자를 찾지 못하였습니다.']);
        }
        const isVerify = await account.verifyPassword(password);
        if (!isVerify) {
            throw Error([409, '비밀번호가 틀렸습니다.']);
        }
        res.locals.data = await account.signIn();
        next();
    } catch (err) {
        next(err);
    }
}
