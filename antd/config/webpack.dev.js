const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:3003/",
  },
  devServer: {
    port: 3003,
    // historyApiFallback: {
    //   index: "index.html",
    // },
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "antd",
      filename: "remoteEntry.js",
      exposes: {
        "./AntdApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
