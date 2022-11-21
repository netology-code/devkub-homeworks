const isDevMode = process.env.NODE_ENV === 'development';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
    entry:  path.join(__dirname, 'js/index.js'),
    output: {
        path: __dirname + '/build',
        filename: 'main.js',
    },
    devtool: isDevMode ? 'eval-cheap-module-source-map' : 'none',
    module: {
        rules: isDevMode ? developmentModuleRules : productionModuleRules
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new WebpackBar({
            name: `${isDevMode ? 'development' : 'production'} build progress`
        }),
        new Dotenv()
    ],
    optimization: {
        minimizer: isDevMode ? [] : minimiztionPlugins
    }
});

const productionModuleRules = [
    {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    },
    {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    },
    {
        test: /.less$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: __dirname + "/build",
                    filename: 'main.css'
                }
            },
            'css-loader',
            {
                loader: `postcss-loader`,
                options: {
                    options: {
                        plugins: () => [autoprefixer()]
                    },
                }
            },
            'group-css-media-queries-loader',
            'less-loader'
        ]
    }
];

const developmentModuleRules = [
    {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    },
    {
        test: /.less$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: __dirname + "/build",
                    filename: 'main.css'
                }
            },
            'css-loader',
            'less-loader'
        ]
    }
];

const minimiztionPlugins = [
    new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
            output: {
                comments: false,
            }
        }
    }),
    new OptimizeCSSAssetsPlugin(),
    new JavaScriptObfuscator({
        rotateStringArray: true,
        rotateUnicodeArray: true
    }, ['main.js'])
];
