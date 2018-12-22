const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HotModuleReplacementPlugin = require("webpack-hot-middleware");

module.exports = {
  mode: 'development',
  entry: { 
    index: [
      "webpack-hot-middleware/client", 
      './src/index'
]},
  target: 'node',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: '.hot/[hash].hot-update.json'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env']
      }
    }, 
    {
      test: /\.scss$/,
      use: [
          MiniCssExtractPlugin.loader, // iso-morphic-style-loader or Use: MiniCssExtractPlugin.loader prod
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ],
      include: [
        path.resolve(__dirname, 'src','static')
      ]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  // devServer: {
  //   publicPath: path.join('/dist/')
  // },
  // devServer: {
  //   contentBase: "./dist",
  //   hot: true,
  //   compress: true,
  //   port: 9000
  // }
};
