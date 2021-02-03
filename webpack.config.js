"use strict";
const resolve = require("resolve");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HOST = process.env.HOST || '0.0.0.0'


module.exports = {
  entry: {
    main: "./src/index.js"
  },

  // mode: "development",
  // mode: "production",

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  devServer: {
    port: 3000,
    // open: true,
    historyApiFallback: true,
    hot: true,
    clientLogLevel: 'silent',
    // host: HOST,

  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
          ]
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV !== 'production',
              // if hmr not work, it force reload
              // reloadAll: true
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff2|woff|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "fonts"
            }
          }
        ]
      },

      {
        test: /\.(svg|jpg|png|gif|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "imgs"
            }
          }
        ]
      }
    ]
  }
};
