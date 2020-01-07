import Sequelize from 'sequelize';

import { SEQUELIZE } from '~/settings';
import { DEBUG } from '~/settings/base';
import { requireDirectory } from '~/utils';

const sequelize = new Sequelize(SEQUELIZE[DEBUG ? 'development' : 'production']);

const models = requireDirectory({
    caseName: 'pascal',
    callback(filePath) {
        const model = sequelize.import(filePath);
        return model;
    },
});

const associations = () => {
    for (const model of Object.values(sequelize.models)) {
        if (model.associate) {
            model.associate(models);
        }
    }
};

const applyScopes = () => {
    for (const model of Object.values(sequelize.models)) {
        if (model.applyScope) {
            model.applyScope(models);
        }
    }
};

module.exports = models;
module.exports.sequelize = sequelize;
module.exports.associations = associations;
module.exports.applyScopes = applyScopes;
