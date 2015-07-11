var webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: './browser.js',
    output: {
        path: './public/generated/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, exclude: /node_modules/, loader: require.resolve('babel-loader') }
        ]
    },
    plugins: [
        // Protects against multiple React installs when npm linking
        new webpack.NormalModuleReplacementPlugin(/^react?$/, require.resolve('react')),
        new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons'))
    ]
};