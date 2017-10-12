let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry:'./src/main.js',
  plugins:[
    new HtmlWebpackPlugin({
      title:'demo6'
    })
  ],
  output:{
    filename:'index.js',
    path:path.resolve(__dirname,'dist')
  },
  module:{
    loaders:[{
      test:/\.css$/,
      use:['style-loader','css-loader']
    }]
  }
}