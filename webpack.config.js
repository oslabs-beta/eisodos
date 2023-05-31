const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  // generate source map
  devtool: 'source-map',
  plugins: [
    // bundle html files
    new HTMLWebpackPlugin({
      template: './client/index.html'
    })
  ],
  devServer: {
    // serve static files
    static: {
      publicPath: '/dist',
      directory: path.join(__dirname, 'dist'),
    },
    // proxy for express server
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  resolve: {
    // add ts and tsx as resolvable extensions
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      // babel loaders
      {
        test: /\.jsx?/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { 
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // css loaders
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // typescript loader
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      }
    ]
  }
};