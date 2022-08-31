const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = {
  entry: {
    bundle: "./src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        loader: "file-loader",
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/i,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html",
      filename: __dirname + "/build/index.html",
    }),
  ],
};

module.exports = config;
