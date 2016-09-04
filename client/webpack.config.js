var debug= process.env.NODE_ENV !== "production";
var webpack= require('webpack');
var path = require('path');
var SRC_PATH = path.resolve(__dirname,"src");
module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/App.js",
  module:{
    loaders:[
      {
        test: /\.js?$/,
        include: SRC_PATH,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel-loader'],
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      {
        test:/\.html$/, 
        loader:'raw'
      }
    ]
  },
  output: {
    path: __dirname + "/public",
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  postLoaders: [
    {
        include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'transform?brfs'
    }
    ]
};