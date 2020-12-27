const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const env = process.env.NODE_ENV;

module.exports = {
    entry: {
        main: "./src/assets/js/main.js",
    },
    output: {
        filename: "[name].bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }]
    },
    optimization: {
        minimize: env === "dev" ? false : true,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    },
    devtool: env === "dev" ? "#eval-source-map" : ""
};