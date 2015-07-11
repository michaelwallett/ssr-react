var webpack = require('webpack'),
    commonConfig = require('./webpack.config.common');

var releaseConfig = Object.create(commonConfig);
releaseConfig.plugins = releaseConfig.plugins.concat(
    new webpack.DefinePlugin({
        "process.env": {
            // React built for prod is significantly faster and smaller
            "NODE_ENV": JSON.stringify("production")
        }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
);

module.exports = releaseConfig;