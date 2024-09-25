const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
        styles: './src/css/styles.css',
        filters: './src/filters.js',
        data: './src/data.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[hash].[ext]',
                            outputPath: './dist', // pasta de saída para as imagens
                            publicPath: './src/img/', // caminho público para as imagens
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4,
                            },
                        },
                    }
                ]
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
};