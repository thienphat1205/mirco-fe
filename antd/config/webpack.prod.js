const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/ktc-lc/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "ktc_lc",
      filename: "remoteEntry.js",
      exposes: {
        "./Ktc-Lc-App": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
