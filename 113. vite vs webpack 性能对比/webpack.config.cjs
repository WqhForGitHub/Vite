// 用于对比的 webpack 配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist-webpack'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  devServer: {
    port: 8080,
    open: true,
  },
}
