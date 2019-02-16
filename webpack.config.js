var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var browserConfig = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '^/api/*': {
        target: 'http://localhost:4000/api/',
        secure: false
      }
    }
  }
}

// var serverConfig = {
//   entry: './src/server/index.js',
//   target: 'node',
//   mode: 'development',
//   externals: [nodeExternals()],
//   output: {
//     path: __dirname,
//     filename: 'server.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       }
//     ]
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       __isBrowser__: "false"
//     })
//   ]
// }

module.exports = browserConfig;
// module.exports = [browserConfig, serverConfig]