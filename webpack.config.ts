import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
    clean: true
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
    // watch for changes to source files
    watchFiles: ['client/**/*'],
    // proxy for express server
    proxy: {
      '/api': 'http://localhost:3000'
    },
    historyApiFallback: true,
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
      // css and tailwind loaders
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      // typescript loader
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      }
    ]
  }
};