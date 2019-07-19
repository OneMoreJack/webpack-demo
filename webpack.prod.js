const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
                test:/\.(sa|sc|c)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            sourceMap:true,
                            plugins: (loader) => [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{
                            sourceMap:true
                        }
                    }]
            },
            {
                test:/\.js$/,
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
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            outputPath: path.resolve(__dirname,'dist/images'),
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({      //  抽离css
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({  // css, js 自动注入html
            title:'webpack-demo',
            filename: 'index.html',
            template: path.resolve(__dirname,'src/index.html'),
            minify:{
                collapseWhitespace:true,
                removeComments:true,
                removeAttributeQuotes:true 
            }
        }),
        new CleanWebpackPlugin()        // 清除构建目录
    ],
    optimization:{
        minimizer:[
            new OptimizeCssAssetsPlugin({}),    // 压缩css
            new UglifyJsPlugin({                // 压缩js
                cache: true,
                parallel:true,
                sourceMap:false
            }),
        ]
    }
}