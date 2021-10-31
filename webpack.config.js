// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction
   ? MiniCssExtractPlugin.loader
   : 'style-loader';

const config = {
   entry: './src/index.ts',
   output: {
      path: path.resolve(__dirname, 'dist'),
   },
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
   ],
   module: {
      rules: [
         {
            test: /\.(ts|tsx)$/i,
            loader: 'ts-loader',
            exclude: ['/node_modules/'],
         },
         {
            test: /\.s[ac]ss$/i,
            use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
         },
         {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: 'asset',
         },

         // Add your rules for custom modules here
         // Learn more about loaders from https://webpack.js.org/loaders/
      ],
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js'],
   },
};

module.exports = () => {
   if (isProduction) {
      config.mode = 'production';

      config.plugins.push(new MiniCssExtractPlugin());

      config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
   } else {
      config.mode = 'development';
   }
   return config;
};
