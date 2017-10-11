# webpack 学习指南

## 参考资料
1. [webpack入门教程](http://www.runoob.com/w3cnote/webpack-tutorial.html)

2. [webpack-demos](https://github.com/ruanyf/webpack-demos)

## 安装依赖
```shell
$ npm init #初始化包
$ npm install webpack -g #全局安装webpack
```

## demo1 webpack 打包js
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


## demo2 多个入口文件打包
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





