const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
let devConfig = {
    mode:'development', // 模式
    output:{                // 出口
        filename:'main.js',
        path:path.resolve(__dirname,'dist')
    },
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
        ]
    }
}

module.exports = merge(common,devConfig)