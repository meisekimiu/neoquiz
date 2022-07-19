const path = require('path');
const UglifyJsPlugin = require('terser-webpack-plugin');
const version = require('./package.json').version;

module.exports = {
  entry: {
    neoquiz: './src/index.ts',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        terserOptions: {
          mangle: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    symlinks: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', `v${version}`),
  },
};
