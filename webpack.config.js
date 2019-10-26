const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = env => {
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin("styles.css");
  return {
    //tell the webpack where shoud they start
    entry: "./src/app.js",

    // tell the webpack where should make the output  , we need to go to public and build file by bundle,js
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.js"
    },

    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },

    plugins: [CSSExtract],

    // devtool make easy your bug and in the console show you where is it the bug
    devtool: isProduction ? "source-map" : "inline-source-map",

    // setUp the devServer
    //it is like Live Sever
    // and because of it no more we dont need live-server and Bundle.js
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true
    }
  };
};
