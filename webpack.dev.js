const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
     static: './dist',
     hot: false,
     liveReload: false,
     client: {
      overlay: true
    }
   },
     module: {
         rules: [
             {
                 test: /\.css$/i,
                 use: ['style-loader', 'css-loader'],
             },
             {
                 test: /\.html$/i,
                 loader: "html-loader",
             }
         ]
     }
 });