const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  devtool: "inline-source-map",
  entry: "./index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "client.js",
    path: path.resolve(__dirname, "static/js"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
