module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
    },
    extends: [
        'airbnb-base',
    ],
    env: {
        'node': true,
    },
    rules: {
        'indent': ['error', 4],
        'arrow-parens': ['error', 'as-needed'],
        'object-curly-newline': ['error', {
            ImportDeclaration: {
                multiline: true,
                minProperties: 2
            },
        }],
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'no-restricted-syntax': ['error', 'WithStatement'],
        'no-underscore-dangle': 0,
        'func-names': 0,
    },
};