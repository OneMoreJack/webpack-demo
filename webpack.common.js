const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry:{         // 入口
        app:'./src/index.js'
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            'api': resolve('src/api'),
            'components':resolve('src/components')
        },
        extensions:['.js','.vue','.json'],  // 可省略
        modules:[resolve('node_modules')]
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            // "presets": [
                            //     [
                            //         "@babel/preset-env",
                            //         {
                            //             "useBuiltIns": "entry",
                            //             "corejs": "3.1.4"   // 需指定corejs版本，不然默认2.x
                            //         }
                            //     ]
                            // ],
                            cacheDirectory:true
                        }
                    },
                    {
                        loader:'eslint-loader',
                        options:{
                            fix:true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        }
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
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/, // 字体
                use:['file-loader']
            }
        ]
    },
    plugins: [
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
}