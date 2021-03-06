const webpack = require("webpack")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const devPath = path.resolve(__dirname, "dev")
const merge = require("webpack-merge")
const baseConfig = require("./webpack.config.base")


const devConfig = {
    mode: "development",
    output: {
        path: devPath,
        filename: "[name].min.js"
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: "src/assets", to: path.resolve(devPath, "assets"), force: true }
        ]),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ].concat(baseConfig.htmlArray),
    devServer: {
        contentBase: devPath,
        hot: true,
        port: 3000,
        disableHostCheck: true,
        //跨域设置
        // proxy: {
        //     '/video': {
        //         target: 'http://www.baidu.com',
        //         changeOrigin: true,
        //         secure: false
        //     }
        // }
    },
}

module.exports = merge(baseConfig.baseConfig, devConfig)

