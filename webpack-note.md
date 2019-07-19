# webpack-demo
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
+ **压缩css**  
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
+ **压缩 JS**  
`uglifyjs-webpack-plugin` 必须在 node 为 *'production'* 的情况下使用
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
