# webpack-note
<!-- TOC -->

- [webpack-note](#webpack-note)
    - [搭建步骤](#搭建步骤)
        - [1. 本地安装webpack](#1-本地安装webpack)
        - [2. 安装lodash](#2-安装lodash)
    - [样式处理](#样式处理)
        - [CSS处理](#css处理)
        - [SCSS/SASS 处理](#scsssass-处理)
    - [压缩](#压缩)
        - [压缩css](#压缩css)
        - [压缩 JS](#压缩-js)
    - [CSS,JS 自动注入html](#cssjs-自动注入html)
    - [清除dist](#清除dist)
    - [图片/字体](#图片字体)
        - [图片处理及压缩优化](#图片处理及压缩优化)
        - [图片 base64 优化](#图片-base64-优化)
        - [字体处理](#字体处理)
    - [webpack合并](#webpack合并)
    - [启用 JS Source Map](#启用-js-source-map)
    - [自动编译，热更新](#自动编译热更新)
        - [监控文件变化并自动编译](#监控文件变化并自动编译)
        - [webpack-dev-server和“热更新”](#webpack-dev-server和热更新)
    - [JS 启用 babel](#js-启用-babel)
        - [编译ES6](#编译es6)
        - [避免重复引入（babel 优化）](#避免重复引入babel-优化)
    - [Eslint 校验配置](#eslint-校验配置)

<!-- /TOC -->
## 搭建步骤
### 1. 本地安装webpack  
>`npm install --save-dev webpack`  
`npm install --save-dev webpack-cli` (4.x版本)  

初始化package.json
>`npm init -y`

### 2. 安装lodash
> `npm install --save lodash`

#
## 样式处理
### CSS处理
+ &nbsp;&nbsp;两个loader: `css-loader` , `style-loader`    

```javascript
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }
```  
&nbsp;&nbsp;*use里的loader处理顺序为从右向左*  

### SCSS/SASS 处理
+ &nbsp;&nbsp; `sass-loader` , `node-sass` 
```javascript
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:['style-loader','css-loader','sass-loader']
            },
        ]
    }
```
+ **启用Source Map,便于定位源文件**
```javascript
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{
                            sourceMap:true
                        }
                    }
                ]
            },
        ]
    }
```
+ **PostCss 处理loader**  
`postcss-loader`
```
    npm i -D postcss-loader
    npm i -D autoprefixer 

    // 支持css4
    npm i postcss-cssnext
```

+ **样式表抽离并设置版本号**  
`mini-css-extract-plugin`  
> 抽取样式之后，不可用 style-loader 注入到html中
```javascript
    // 不再使用style-loader，改用 MiniCssExtractPlugin.loader

    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    const devMode = process.env.NODE_ENV !== 'production'   // 区分开发环境和生产环境

    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    // ...
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ],
``` 
#
## 压缩
### 压缩css  
`optimize-css-assets-webpack-plugin`
```javascript
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

    module.exports = {
        entry:'./src/index.js', // 入口
        mode:'production', // 模式
        output:{                // 出口
        // ...
        },
        module:{
            // ...
        },
        plugins: [
            // ...
        ],
        optimization:{
            minimizer:[
                new OptimizeCssAssetsPlugin({})
            ]
        }
    }
```  
### 压缩 JS 
`uglifyjs-webpack-plugin` 必须在 mode 为 *'production'* 的情况下使用
```javascript
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

    module.exports = {
    entry:'./src/index.js', // 入口
    mode:'production', 
    output:{                
        filename:'main.[hash].js',  // 添加hash
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',      // 兼容ES6
                        options:{
                            "presets": [
                                [
                                    "@babel/preset-env",     
                                    {
                                        "useBuiltIns": "entry",
                                        "corejs": "3.1.4"   // 需指定corejs版本(与package.json文件中的版本一致)，不然默认2.x
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // ...
    ],
    optimization:{
        minimizer:[
            new UglifyJsPlugin({
                cache: true,
                parallel:true,
                sourceMap:false
            }),
        ]
    }
}
```
#
## CSS,JS 自动注入html
+ `html-webpack-plugin`   
```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.export = {
        // ...
        plugins: [
            new HtmlWebpackPlugin({  // Also generate a test.html
                title:'webpack-demo',
                filename: 'index.html',
                template: path.resolve(__dirname,'src/index.html'),
                minify:{
                    collapseWhitespace:true,
                    removeComments:true,
                    removeAttributeQuotes:true 
                }
            })
        ]
    }
```
#
## 清除dist 
+ `clean-webpack-plugin`  
```javascript
    const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

    module.exports = {
        // ...
        plugins: [
            new CleanWebpackPlugin(),
        ]
    }
```  
#
## 图片/字体
### 图片处理及压缩优化
+ `file-loader`, `image-webpack-loader`
先用`image-webpack-loader`将图片压缩优化，再用file-loader处理图片
```javascript
    module.export = {
        // ...
        module:{
            rules:[
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader:'file-loader',
                        },
                        {
                            loader:'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }

``` 

### 图片 base64 优化
+ `url-loader`
url-loader 可以把url地址对应的文件夹打包成 base64 的 DataURL ，提高访问效率
```javascript
    module.export = {
        // ...
        module:{
            rules:[
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,   // 小于10k 的处理成base64
                            }
                        },
                        {
                            loader:'image-webpack-loader',
                            // ...
                        }
                    ]
                }
            ]
        }
    }

``` 
### 字体处理
字体处理与图片处理大致相同
```javascript
    {
        test:/\.(woff|woff2|eot|ttf|otf)$/,
        use:['file-loader']
    }
```

#
## webpack合并
将webpack配置分离成三个文件： *webpack.common.js , webpack.dev.js , webpack.prod.js* 。需要使用 `webpack-merge` 将配置合并

```javascript
    // webpack.common.js
    module.exports = {
        ...
    }

    // webpack.dev.js, webpack.prod.js
    const common = require('./webpack.common.js')
    const merge = require('webpack-merge')
    
    module.exports = merge(common,{
        // ...
    })
```
#
## 启用 JS Source Map
开发阶段启用source Map 便于开发调试
```javascript
    // webpack.dev.js
    module.exports = {
        // ...
        devtool:'inline-source-map'
    }
```

#
## 自动编译，热更新
### 监控文件变化并自动编译
`npx webpack --watch`
```json
    // package.json
    {
        "scripts": {
            "build": "npx webpack --config webpack.prod.js",
            "start":"npx webpack --open --watch --config webpack.dev.js"
        }
    }
```

### webpack-dev-server和“热更新”
>`webpack-dev-server`提供一个简单的web服务器，并且可以实时重新加载（*live reloading*）
```javascript
    // webpack.dev.js
    module.exports = {
        // ...
        devServer:{
            clientLogLevel:'warning',
            hot:true,
            contentBase:path.resolve(__dirname,'dist'),
            compress:true,
            host:'localhost',
            port:'8094',
            open:true,
            overlay:{
                warning:true,
                errors:true
            },
            publicPath:'/',
            proxy:{ // 服务器代理
                "/api":{
                    target:"http://192.168.3.172",
                    pathRewrite:{
                        "^/api" :"/hello/api"
                    }
                    // /api/getUser => http://192.168.3.172/hello/api/getUser
                }
            },
            quiet:true,
            watchOptions:{
                poll:true,      // 轮询
                aggregateTimeout: 600,      // 延迟
                ignored:/node_modules/
            }
        },
        plugins:[
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()   
        ]
    }
```

#
## JS 启用 babel
### 编译ES6 
+ `babel-loader  @babel/core  @babel/preset-env`  
两种方式：  
1. *babel-loader* 配置 options.presets
```javascript
module.exports = {
    // ...
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            "presets": [
                                [
                                    "@babel/preset-env",
                                    {
                                        "useBuiltIns": "entry",
                                        "corejs": "3.1.4"   // 需指定corejs版本，不然默认2.x
                                    }
                                ]
                            ],
                            cacheDirectory:true
                        }
                    }
                ]
            }
        ]
    }
}
```
2. 配置*.babelrc* 文件
```javascript
    {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "targets": "> 0.25%, not dead"
                }
            ]
        ]
    }
```
### 避免重复引入（babel 优化）
` @babel/plugin-transform-runtime @babel/runtime`    
[参考transform-runtime](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)

>       npm install --save-dev @babel/plugin-transform-runtime 
>       npm install --save @babel/runtime

```javascript
    // .babelrc
    {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "targets": "> 0.25%, not dead"
                }
            ]
        ],
        "plugins": [
            [
                "@babel/plugin-transform-runtime",
                {
                    "absoluteRuntime": false,
                    "corejs": false,
                    "helpers": true,
                    "regenerator": true,
                    "useESModules": false
                }
            ]
        ]
    }
```

#
## Eslint 校验配置
+ **安装**
    npm i eslint -D
    npm i eslint-loader -D

+ **使用**
```javascript
    // .eslintrc.js 
    module.exports = {
        root:true,
        parserOptions:{
            parser:'babel-eslint',
            sourceType:'module'     // 设置souceType为 module,否则无法正常使用import 语句
        },
        env:{
            browser:true,
            es6:true
        },
        globals:{
            NODE_ENV:false
        },
        rules:{
            'genetator-star-spacing':'off',
        }
    }
```
