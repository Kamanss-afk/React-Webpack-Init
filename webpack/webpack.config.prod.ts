import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import { cssModuleRules, cssRules, sassRules } from './webpack.config.styles';

interface Configuration extends webpack.Configuration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'production',
  cache: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js$/,
        extractComments: false,
        exclude: /gzip/,
      }),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: any) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.module\.css$$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, ...cssRules],
      },
      {
        test: /\.module\.css$$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, ...cssModuleRules],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, ...cssRules, ...sassRules],
      },
      {
        test: /\.module\.scss$$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, ...cssModuleRules, ...sassRules],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      filename: '../gzip/[base].gz',
    })
  ],
  output: {
    publicPath: '/',
  },
};

export default config;
