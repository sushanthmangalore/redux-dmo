const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: 'eval-source-map',
  entry: './src/index.js',
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
	libraryTarget: 'var',
	library: 'EntryPoint'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
	host: '0.0.0.0',
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader'},
      {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
	    {test: /\.(jpe?g|png|gif)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000'}
	]
  }
};

module.exports=config;
