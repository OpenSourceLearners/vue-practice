const webpack = require('webpack');
process.env.NODE_ENV = 'production';
const config = require('./webpack.config');
// config.output.publicPath = '/js/';
webpack(config, (err, stats) => {
    if (err) throw err;
});