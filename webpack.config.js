const path = require('path');
const UglifyJsPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    neoquiz: './src/index.ts',
  },
  optimization: {
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
    // alias: {
    //     '@assets': path.resolve(__dirname, 'src/assets/'),
    //     '@util': path.resolve(__dirname, 'src/util/'),
    //     '@localtypes': path.resolve(__dirname, 'src/types/'),
    //     '@src': path.resolve(__dirname, 'src/'),
    // },
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
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};
