## webpack 学习指南

### 参考资料
1. [官方指南](https://doc.webpack-china.org/guides/)

1. [webpack入门教程](http://www.runoob.com/w3cnote/webpack-tutorial.html)

2. [webpack-demos](https://github.com/ruanyf/webpack-demos)

### 安装依赖
```shell
$ npm init #初始化包
$ npm install webpack -g #全局安装webpack
```

### demo1 webpack 打包js
1. 在main.js写入
```js
document.write('<h1>Hello World</h1>');
```
2. 配置 webpack.config.js
```js
module.exports = {
  entry:'./main.js',
  output:{
    filename:'bundle.js'
  }
}
// 声明入口文件 以及打包目录
```
3. 在index.js中引用 bundle.js
4. shell中运行`webpack-dev-server`在本地8080端口查看结果


### demo2 多个入口文件打包
```js
module.exports = {
  entry:{
    bundle1:'/main1.js',
    bundle2:'/main2.js'
  },
  outpath:{
    filename:'[name].js'
  }
}
```

## demo3 使用babel进行js版本转义
1. 依赖到的包
```shell
npm i --save-dev babel-core babel-preset-es2015 babel-loader
```
2. 编辑webpack.config.js
```js
module.exports = {
  entry:'./main.js',
  output:{
    filename:'bundle.js'
  }
  module:{
    loaders:[{
      test:/\.js$/,
      exclude:/node_modules/,
      loader:'babel-loader',
      query:{
        presets:['es2015']
      }
    }]
  }
}
```

### demo4 引入新的依赖+打包路径管理
1. 项目目录如下
  
  - src
    * main.js
  - index.html
  - webpack.config.js

2. 为项目安装新的依赖
```shell
# 添加一个新的依赖 lodash 看webpack如何打包
$ npm i --save loadsh
```

3. 编辑webpack.config.js
```js
let path = require('path');
module.exports = {
  entry:'./src/main.js',
  output:{
    filename:'index.js',
    path:path.resolve(__dirname,'dist')
  }
}
// path.resolve(__dirname,'dist')
// 定义路径为webpack.config.js当前路径下的 dist 文件
```

4. 编辑src/main.js
```js
let _ = require('lodash'); //引入依赖

function component() {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello webpack'], ' ');
  return element;
}

document.body.appendChild(component());
```

5. 编辑index.html
```html
<srript src='./dist/index.js'>
```

6. 开始打包
``` shell
$ webpack
```
### Demo5 加载CSS文件
1. 安装插件
```shell
$ npm i --save-dev style-loader css-loader
```
2. 适配webpack配置文件
```js
let path = require('path');
module.exports = {
  entry:'./src/main.js',
  output:{
    filename:'index.js',
    path:path.resolve(__dirname,'dist')
  }
  //新增部分
  module:{
    loader:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  }
}
```
>webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。

3. 创建一个样式文件
```css
//  src/index.css
.hello {
  background: #333333;
}
```

4. 在入口文件中引用css文件
```js
import './index.css'
```

5. webpack打包
```shell
$ webpack
```

### Demo6 第一个插件HtmlWebpackPlugin
好像还有点不方便，dist下的所有的文件并不是自动生成的，我们需要手动在/dist/下创建一个index.html目录，并且还要手动加载打包好的js，确实不够优雅。而HtmlWebpackPlugin可以帮助我们在生产新的index.html文件，并帮我我们完成替换。

1. 安装插件
```shell
$ npm install --save-dev html-webpack-plugin
```

2. 适配插件
```js
let path = require('path');
module.exports = {
  entry:'./src/main.js',
  //开始适配插件
  plugins:[
    new HtmlWebpackPlugin({
      title:'demo6'
    })
  ],
  //结束适配插件
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
```

3. 打包
```shell
$ webpack
```