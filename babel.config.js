module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: true,
            },
        }],
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '~': './src',
            },
        }],
        ['@babel/plugin-transform-runtime'],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
};