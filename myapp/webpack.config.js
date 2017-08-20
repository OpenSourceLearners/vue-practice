var path = require('path'); //路径插件
var webpack = require('webpack');   //webapck
var htmlWebpack = require('html-webpack-plugin');   //自动生成index.html模板
module.exports = {
    entry: './src/main.js', //入口文件
    output: {   //输出文件
        path: path.resolve(__dirname, '../public/static/js/'),
        // publicPath: process.env.NODE_ENV === 'production' ? './static/js/' : 'http://127.0.0.1:9999/dist/',
        // publicPath: './static/js/',
        filename: 'build.js',   //生成的文件
        chunkFilename: '[name].js'
    },
    resolve: {  //省略后缀名，webpack2开始不能有空字符串
        extensions: ['.js', '.json', '.vue', '.scss', '.css']
    },
    module: {   //模块加载
        rules: [
            //加载vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            //babel将es6或es7语法转换成es5{ test: /\.js$/, loader: 'babel', query: {compact: false} }
            {
                test: /\.js|jsx$/,  //这个是正则，用来匹配要使用的文件
                exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/,   //排除的文件
                loader: 'babel-loader',     //加载器模块
            },
            //解析css
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'   //添加对样式表的处理
            },
            //加载图片文件
            {
                test:/\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
        ],
    },
    plugins: [
        new htmlWebpack({
            title: 'My App',
            filename: './index.html',
            template: './src/assets/template.html',
            inject: true
        }),
    ],
};
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}