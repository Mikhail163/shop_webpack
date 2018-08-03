const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        main: path.resolve(__dirname, 'src/index.jsx')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            actions: path.resolve(__dirname, 'src/js')
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'i/[name].[ext]'
                },
             },
             {
                test: /\.(ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                },
             },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/main.[chunkhash].css',
            disable: false,
            allChunks: true

        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        historyApiFallback: true
    }
}
