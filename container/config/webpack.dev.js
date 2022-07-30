const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:3000/",
  },
  devServer: {
    port: 3000,
    // historyApiFallback: {
    //   index: "index.html",
    // },
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        ktc_lc: "ktc_lc@http://localhost:3003/remoteEntry.js",
        qlcl: "qlcl@http://localhost:3002/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
