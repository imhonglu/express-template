/* eslint-disable no-param-reassign */
import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
    class Profile extends Model {}
    Profile.init({
        photo: DataTypes.STRING,
        fullname: DataTypes.STRING,
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /(^[0-9]{3})-([0-9]{3,4})-([0-9]{4}$)/,
                len: [12, 13],
            },
        },
        postcode: DataTypes.STRING,
        address: DataTypes.STRING,
        detailAddress: DataTypes.STRING,
        isReceiveMarketing: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isPhoneVerify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, { sequelize });

    Profile.associate = function (models) {
        models.Profile.belongsTo(models.Account, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'accountId',
                allowNull: false,
                unique: true,
            },
        });
    };

    return Profile;
}
