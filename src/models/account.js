/* eslint-disable no-param-reassign */
import { Model } from 'sequelize';
import {
    hashSync,
    compare,
} from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AUTH } from '~/settings';

const payloadAttributes = [
    'id',
    'username',
    'isEmailVerify',
    'isActive',
    'profile',
];

export default function (sequelize, DataTypes) {
    class Account extends Model {
        static associate(models) {
            models.Account.hasOne(models.Profile, {
                onDelete: 'CASCADE',
                foreignKey: {
                    name: 'accountId',
                    allowNull: false,
                    unique: true,
                },
                as: 'profile',
            });
        }

        verifyPassword(password) {
            return compare(password, this.password);
        }

        generateAccessToken() {
            const token = jwt.sign(
                this.payload,
                AUTH.secretKey.accessToken,
                AUTH.jwtOption.accessToken,
            );
            return `Bearer ${token}`;
        }

        async generateRefreshToken() {
            const refreshToken = jwt.sign(
                this.payload,
                AUTH.secretKey.refreshToken,
                AUTH.jwtOption.refreshToken,
            );
            await this.update({ refreshToken });
            return refreshToken;
        }

        async generateToken() {
            const token = this.generateAccessToken();
            const refreshToken = await this.generateRefreshToken();
            return {
                token,
                refreshToken,
            };
        }

        async signIn(profile = this.profile) {
            const { username } = this;
            const token = await this.generateToken();
            return {
                ...token,
                account: {
                    username,
                    profile,
                },
            };
        }

        get payload() {
            const payload = payloadAttributes.reduce((acc, key) => {
                acc[key] = this.dataValues[key];
                return acc;
            }, {});
            return payload;
        }
    }

    Account.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4,
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(password) {
                if (password.length < 8) {
                    throw Error([400, '비밀번호는 8자리 미만으로 입력할 수 없습니다']);
                }
                const hashedPassword = hashSync(password, AUTH.saltRounds);
                this.setDataValue('password', hashedPassword);
            },
        },
        refreshToken: DataTypes.TEXT,
        isEmailVerify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        defaultScope: {
            include: ['profile'],
        },
    });

    return Account;
}
