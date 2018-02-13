const path = require('path');

module.exports = {
    entry: './app/app.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/assets/',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.*\.js$/,
                include: path.resolve(__dirname, 'app'),
                loader: "babel-loader",
                options: {
                    presets: ["env", "react", "stage-2"]
                }
            }
        ]
    },
    devServer: {
        contentBase: "./",
        proxy: {
            '/feed': {
                target: 'http://horriblesubs.info/rss.php?res=all',
                changeOrigin: true,
                pathRewrite: {'^/feed' : ''},
            }
        }
    }
};