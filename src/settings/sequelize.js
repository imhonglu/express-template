const commonOption = {
    logging: false,
    define: {
        charset: 'utf8',
    },
};

module.exports = {
    development: {
        ...commonOption,
        dialect: 'sqlite',
        storage: './dev.sqlite',
        sync: { force: true },
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        ...commonOption,
        username: 'root',
        password: null,
        database: 'database_prod',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
