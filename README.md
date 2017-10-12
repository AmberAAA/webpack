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

