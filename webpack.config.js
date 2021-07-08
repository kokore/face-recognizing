const path = require('path')

const htmlWebPackPlugin = require('html-webpack-plugin')
const uglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'src', 'index.js')],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.bundle.js'
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devServer: {
    contentBase: path.join(__dirname),
    historyApiFallback: true
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebPackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),

    new uglifyPlugin({
      uglifyOptions: {
        compress: {
          unused: false
        }
      }
    })
  ]
}
