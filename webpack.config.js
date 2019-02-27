module.exports = env => require(`./webpack.${env.NODE_ENV}`);
