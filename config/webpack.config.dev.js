var webpack = require('webpack'),
    commonConfig = require('./webpack.config.common');

var devConfig = Object.create(commonConfig);
devConfig.devtool = 'sourcemap';
devConfig.debug = true;

module.exports = devConfig;