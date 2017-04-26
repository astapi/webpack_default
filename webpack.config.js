const path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'assets/js/'),
  entry: {
    home: './home.js',
    second: './second.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader'],
          publicPath: '../'
        })
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: {
          loader: 'file-loader?name=images/[hash].[ext]'
        }
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([{
      from: '../static_images',
      to: 'images'
    }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'js/commons-[hash].js',
    })
  ]
};
