const path = require('path');

module.exports = {

  // entry: './client/index.js',
  entry: {
    app: './client/app/AppIndex.js',
    login: './client/authenticate/AuthIndex.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    // index: '/client/app/index.html',
    // openPage: 'user/login',
    publicPath: '/build/',
    proxy: {
      '/user': 'http://localhost:3000/',
      '/api': 'http://localhost:3000/',
    },
  },
};