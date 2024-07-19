const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
  },
   plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
   module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
	   {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
};