import {
    Account,
    Profile,
} from '~/models';

export const method = 'POST';

export default async function (req, res, next) {
    try {
        const {
            username,
            password,
            password2,
            nickname,
        } = req.body;

        if (password !== password2) {
            throw Error([400, '비밀번호 확인과 일치하지 않습니다']);
        }
        if (!nickname) {
            throw Error([400, '닉네임이 필요합니다.']);
        }
        const account = await Account.create({
            username,
            password,
        });
        const profile = await Profile.create({
            nickname,
            accountId: account.id,
        });
        res.locals.data = await account.signIn(profile);
        next();
    } catch (err) {
        next(err);
    }
}
