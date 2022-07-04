import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { resolve } from './webpack.config.resolve';

interface Configuration extends webpack.Configuration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: './app/src/index.tsx',
  target: 'browserslist',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: process.env.NODE_ENV === 'production' ? false : true,
      typescript: {
        configFile: 'tsconfig.json',
      },
      issue: {
        include: [{ file: '**/*.ts' }, { file: '**/*.tsx' }],
        exclude: [{ file: '**/*.spec.ts' }],
      },
    }),
    new HtmlWebPackPlugin({
      template: './app/public/index.html',
      favicon: './app/public/favicon.ico',
    }),
  ],
  resolve,
  output: {
    path: path.join(process.cwd(), 'build', 'dist'),
    filename: '[name].js',
  },
};

export default config;
