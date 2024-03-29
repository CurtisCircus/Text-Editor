const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Path to your HTML template
        filename: 'index.html', // Output HTML file name
        chunks: ['main'], // Specify the chunk (entry) to include in this HTML file
      }),
      new HtmlWebpackPlugin({
        template: './src/install.html', // Path to your HTML template for the install page
        filename: 'install.html', // Output HTML file name
        chunks: ['install'], // Specify the chunk (entry) to include in this HTML file
      }),
      new WebpackPwaManifest({
        name: 'YourAppName',
        short_name: 'App',
        description: 'Your application description',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/icon.png'), // Path to your app icon
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src/service-worker.js', // Path to your service worker file
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        // Add CSS loader and Babel configuration here if needed
        // Example:
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
