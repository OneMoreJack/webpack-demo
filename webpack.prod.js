const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common')

let prodConfig = {
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
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({      //  抽离css
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        })
    ],
    optimization:{
        minimizer:[
            new OptimizeCssAssetsPlugin({}),    // 压缩css
            new UglifyJsPlugin({                // 压缩js
                cache: true,
                parallel:true,
                sourceMap:true
            }),
        ]
    }
}

module.exports = merge(common,prodConfig)