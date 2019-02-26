module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['babel-plugin-transform-export-extensions', '@babel/plugin-proposal-class-properties'],
    },
  },
};
