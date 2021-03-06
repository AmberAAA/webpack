let path = require('path');
module.exports = {
  entry:'./src/main.js',
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