const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const dev = 'development';
const prod = 'production';

module.exports = env => (
  env === dev ? devConfig
  : env === prod ? prodConfig
  : null
);
