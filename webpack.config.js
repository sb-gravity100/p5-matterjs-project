// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ProvidePlugin } = require('webpack');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction
   ? MiniCssExtractPlugin.loader
   : 'style-loader';

const config = {
   entry: {
      main: ['./src/index.ts'],
   },
   output: {
      path: path.resolve(__dirname, 'build'),
   },
   stats: 'errors-warnings',
   devServer: {
      host: '0.0.0.0',
      port: 3000,
      public: require('child_process')
         .execSync('gp url 3000')
         .toString()
         .trim(),
      allowedHosts: ['localhost', '*.gitpod.io'],
      disableHostCheck: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: 'index.html',
      }),
      new ProvidePlugin({
         perlin: ['@chriscourses/perlin-noise'],
      }),
   ],
   module: {
      rules: [
         {
            test: /\.(ts|tsx)$/i,
            loader: 'ts-loader',
            // exclude: ['/node_modules/'],
         },
         {
            test: /\.s[ac]ss$/i,
            use: [stylesHandler, 'css-loader', 'sass-loader'],
         },
         {
            test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.(svg)$/i,
            type: 'asset/source',
         },
         // Add your rules for custom modules here
         // Learn more about loaders from https://webpack.js.org/loaders/
      ],
   },
   resolve: {
      extensions: ['.ts', '.js'],
   },
   optimization: {
      runtimeChunk: true,
      splitChunks: {
         chunks: 'all',
      },
   },
};

module.exports = () => {
   if (isProduction) {
      config.mode = 'production';
      config.plugins.push(new MiniCssExtractPlugin());
   } else {
      config.mode = 'development';
   }
   return config;
};
